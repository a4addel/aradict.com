import { GetServerSidePropsContext } from 'next';
import {  signIn } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Router from 'next/router';
import React, { HTMLInputTypeAttribute } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import * as Chakra from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import Footer from '../components/Footer';
import Header from '../components/Header';
import useAxios from '../hooks/useAxios';

import isAuth from "../utils/isAuthrized";
import { Text, useToast } from '@chakra-ui/react';



export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let user = await isAuth(ctx);

  const transition = await serverSideTranslations(ctx.locale || "ar", ["common"]);

  if (user) {
    return {
      "redirect": {
        "permanent": false,
        "destination": "/",
      }
    }
  }

  return {
    props: {
      ...transition,
    },
  };
};

const Login = (props) => {
  const { t } = useTranslation("common");
  const { register, handleSubmit, formState: { errors } } = useForm({
    reValidateMode: "onChange",
    criteriaMode: "all",
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
    shouldFocusError: true,
    delayError: 150,
  });

  const log = useAxios();
  const toast = Chakra.useToast();

  React.useEffect(() => {
    if (Router.query.error) {
      toast({
        status: "error",
        title: Router.query.error,
        isClosable: true, position: "top-right"
      })
    }
  }, [])

  const onSubmit = async (data) => {
    toast({
      size: "lg",
      title: "Form is not working righ now, please use Discord to login",
      isClosable: true
    })
  };

  return (
    <>
      <Header />
      <Head>
        <title>Login to Aradict.com</title>
      </Head>


      <Chakra.Box
        borderRadius={10}
        bg="white"
        maxWidth="600px"
        display="block"
        width="100%"
        py="10px"
        px="20px"
        flex={1}
        m={15}
        marginRight="auto"


      >
        <Chakra.Tabs h="100%" display="flex" flexDir="column" justifyContent="stretch" flex={1}>
          <Chakra.TabList display="flex" flexDir="row" >
            <Chakra.Tab flex={1}>
              <Chakra.Center>
                <h1>SignIn</h1>
              </Chakra.Center>
            </Chakra.Tab>
            <Chakra.Tab flex={1}>
              <Chakra.Center>
                <h1>SignUp</h1>
              </Chakra.Center>
            </Chakra.Tab>
          </Chakra.TabList>
          <Text color="red"  textAlign="center" fontWeight="bold">Form is Disabled right now, Please use Discord to login</Text>
          <Chakra.TabPanels flex={1}>

            <Chakra.TabPanel>
              <LoginForm />
            </Chakra.TabPanel>

            <Chakra.TabPanel>
              <RegisterForm />
            </Chakra.TabPanel>
          </Chakra.TabPanels>

          <Chakra.Button w="100%" onClick={() => signIn("discord")}>
            Discord
          </Chakra.Button>
        </Chakra.Tabs>



      </Chakra.Box>

      <Footer />
    </>
  );
};

export default Login;



const RegisterFormScheme = yup.object().shape({
  // firstname: yup.string().required(),
  // lastname: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  verify_password: yup.string().oneOf([yup.ref("password"), null], "passwords don't match")
});
function RegisterForm() {
  const { t } = useTranslation("common");

  const form = useForm({
    reValidateMode: "onChange",
    criteriaMode: "all",
    mode: "onBlur",
    shouldFocusError: true,
    delayError: 150,
    resolver: yupResolver(RegisterFormScheme)
  });

  const log = useAxios();

  const onSubmit = async (data) => {
    log.call({
      data: {
        email: data.username,
        password: data.password,
        username: data.username,
      },
      method: "POST",
      url: "/api/auth/ss"
    }).then(() => {
      signIn("credentials", {
        email: data.username,
        password: data.password,
        callbackUrl: "/" + Router.locale
      })

    })

  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} >
      <Chakra.Container flexDir="column">
        <fieldset disabled>
          
          <CustomFormControle form={form} label="USERNAME" fieldname='username' isSecure={false} type="text" />
          <CustomFormControle form={form} label="EMAIL" fieldname='email' isSecure={false} type="email" />
          <CustomFormControle form={form} label="PASSWORD" fieldname='password' isSecure={true} type="password" />
        </fieldset>



        <Chakra.Button
          marginTop="auto"
          type="submit"
          size="lg"
          colorScheme="teal"
          disabled={true}
          m="15px 0"
        >
          {form.formState.isSubmitting ? <Chakra.Spinner /> : "Submit"}
        </Chakra.Button>




      </Chakra.Container>
    </form>

  );
}

const LoginFormScheme = yup.object().shape({

  email: yup.string().email().required(),
  password: yup.string().required()
})


function LoginForm() {
  const toast = useToast();
  const { t } = useTranslation("common");
  const form = useForm({
    reValidateMode: "onChange",
    criteriaMode: "all",
    mode: "onBlur",
    shouldFocusError: true,
    delayError: 150,
    resolver: yupResolver(LoginFormScheme)
  });


  const onSubmit = async (data) => {

    toast({
      size: "lg",
      title: "Form is not working righ now, please use Discord to login",
      isClosable: true
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <CustomFormControle form={form} label="EMAIL" fieldname='email' isSecure={false} type="email" />
      <CustomFormControle form={form} label="PASSWORD" fieldname='password' isSecure={true} type="password" />




      <Chakra.Button
        type="submit"
        size="lg"
        colorScheme="teal"
        disabled={true}
        m="10px"
        w="100%"
      >

        {form.formState.isSubmitting ? <Chakra.Spinner /> : t("LOGIN")}
      </Chakra.Button>


    </form>
  );
}


interface CustomFormControleProps {
  form: UseFormReturn,
  fieldname: string,
  label: string,
  isSecure: boolean,
  type: HTMLInputTypeAttribute
}

const CustomFormControle = ({ form, fieldname, label, isSecure, type, ...rest }: CustomFormControleProps & { isSecure }) => {
  const { t } = useTranslation();
  const [show, { toggle }] = Chakra.useBoolean(isSecure);


  const NormalFeild = <Chakra.FormControl isInvalid={!!form.formState.errors[fieldname]?.message}>
    <Chakra.FormLabel>{t(label)}</Chakra.FormLabel>
    <Chakra.Input
      aria-errormessage={`#${fieldname}-error-msg`}
      defaultValue=""
      type={type}
      {...form.register(fieldname)}
      {...rest}
    />
    <Chakra.FormErrorMessage id={`${fieldname}-error-msg`}>
      <>
        <Chakra.FormErrorIcon /> {form.formState.errors[fieldname]?.message}
      </>
    </Chakra.FormErrorMessage>
  </Chakra.FormControl>


  const password = <Chakra.FormControl isInvalid={!!form.formState.errors.password}>
    <Chakra.FormLabel>{t(label)}</Chakra.FormLabel>
    <Chakra.InputGroup>
      <Chakra.Input
        aria-errormessage="#"
        pr="4.5rem"
        defaultValue=""
        type={show ? type : "text"}

        {...form.register(fieldname)}
      />
      <Chakra.InputRightElement width="4.5rem">
        <Chakra.Center>
          <Chakra.Button onClick={toggle} colorScheme="teal" h="1.5rem" size="sm">
            show
          </Chakra.Button>
        </Chakra.Center>
      </Chakra.InputRightElement>
    </Chakra.InputGroup>
    <Chakra.FormErrorMessage id={`${fieldname}_error_msg`}>
      <>
        <Chakra.FormErrorIcon />
        {form.formState.errors.password?.message}
      </>
    </Chakra.FormErrorMessage>
  </Chakra.FormControl>

  return isSecure ? password : NormalFeild

}

