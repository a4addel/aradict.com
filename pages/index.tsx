import { verify } from "jsonwebtoken";
import Head from "next/head";
import Image from "next/image";
import React, {
  ForwardedRef,
  ForwardRefExoticComponent,
  KeyboardEventHandler,
  LegacyRef,
  RefAttributes,
  RefObject,
  useRef,
  useState,
} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logo from "../resources/abadis.svg";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

// import isArabic from "../utils/isArabic";
// import NextLink from "next/link";
import {
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  InputGroup,
  InputLeftAddon,
  Link,
  Button,
  Tag,
  Text,
  useToast,
  Box,
  Spinner,
  Input,
  useBoolean,
  Portal
} from "@chakra-ui/react";

import { css, keyframes } from "@emotion/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";

const BounseKeyFrames = keyframes`
  0% {
    transform: translatey(0);
  }

  50% {
    transform: translateY(-5px);
  }

  100% {
    transform: translateY(0);
  }
`;
const BounseCss = css`
  animation: ${BounseKeyFrames} 1s ease infinite;
`;

function Home({ userType }) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const ff = Array.from({ length: 15 }, (e, k) => {
    return {
      label: `Item-${k}`,
      value: `Value-${k}`,
    };
  });
  const gg = React.useRef();

  const [q, setQ] = React.useState("");
  const toast = useToast();
  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      console.log(selectedItems);
    }
  };

  const search = React.useRef();

  return (
    <>
      <Header userType={userType} />

      <Head>
        <title>Aradict.com | أرادكت</title>
      </Head>

      <Container maxW={1140} width="100%">
        <Container h="100vh" maxW={800}>
          <Center
            height="30%"
            maxW="800px"
            width="100%"
            textAlign="center"
            flexDirection="column"
          >
            <Image alt="s" src={Logo} width={400} height={150} />
          </Center>
          <AutoComplete />
        </Container>
        <Container width="100%" maxW="100%" bg="white" p="20px">
          <Tag variant="solid" colorScheme="teal" size="lg">
            {t("WHAT_IS_ARADICT")}
          </Tag>
          <Text>{t("TO_USE_ARADICT")}</Text>

          <br />
          <img
            alt="s"
            style={{
              margin: "0 auto",
              display: "block",
              padding: "15px",
              width: "100%",
              height: "auto",
              maxWidth: "500px",
            }}
            src="Dictionary.jpg"
          />
          <br />
          {t("LOREM_IPSUM")}
          <br />
          <img
            alt="s"
            style={{
              margin: "0 auto",
              display: "block",
              padding: "15px",
              width: "100%",
              height: "auto",
              maxWidth: "500px",
            }}
            src="Dictionary.jpg"
          />
          <br />
          {t("LOREM_IPSUM")}
          {t("LOREM_IPSUM")}
          <br />
          <img
            alt="ddddddd"
            style={{
              margin: "0 auto",
              display: "block",
              padding: "15px",
              width: "100%",
              maxWidth: "500px",
              height: "auto",
            }}
            src="Dictionary.jpg"
          />
          <br />
          {t("LOREM_IPSUM")}

          <Grid
            templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
            gap={10}
            maxWidth={1140}
            width="100%"
            margin="10px auto"
          >
            <GridItem>
              <img src="prodandroid.jpg" alt="dd" />
            </GridItem>
            <GridItem>
              <img src="prodchrome.jpg" alt="dd" />
            </GridItem>
            <GridItem>
              <img src="prodfirefox.jpg" alt="dd" />
            </GridItem>
            <GridItem>
              <img src="prodtelegram.jpg" alt="dd" />
            </GridItem>
          </Grid>

          <Heading as="h2">قاموس أرادكت</Heading>
          <Text>
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
            النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد
            من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا
            كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد
            الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص
            العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير
            من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على
            المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور
            مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة
            له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق. هذا النص يمكن
            أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ، غير
            منظم، غير منسق، أو حتى غير مفهوم. لأنه مازال نصاً بديلاً ومؤقتاً.
          </Text>
        </Container>
      </Container>
      <Footer />
    </>
  );

  function Submit() {}
}

export default Home;
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ req, locale }) {
  const TOKEN = req.cookies?.token || "";
  const JWT_SECRET = process.env.JWT_SECRET;
  let data = verify(TOKEN, JWT_SECRET, (err, data) => (!err ? data : false));
  const userType = data?.role || "";
  const translation = await serverSideTranslations(locale, ["common"]);
  return { props: { userType, ...translation } };
}



interface Word {
  id: string;
  ar: string;
}

const ListStyle = css`
  & > button {
    border: 1px solid #000;
    display: block;
    width: 100%;
    &:not(:last-child) {
      border-bottom: none;
    }
  }
`;

import { Circular } from 'doublie';


const AutoComplete = () => {
  const [show, {on, off}] = useBoolean()
  const [q, setQ] = React.useState("");
  const onChange = (e) => {
    console.log(e.key);
    
    
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      return e.preventDefault()
    }
    setQ(e.target.value);
    search(e.target.value);
  };
  const inputRefContainer = React.useRef<HTMLElement>();
  const inputRef = React.useRef<HTMLElement>();
  const [searching, setSearching] = useState<boolean>();
  const [items, setItems] = useState();
  const [activeItem, setActiveItem] = useState<Word>();

  const { t } = useTranslation("common");
  
  function search(e) {
    setItems(null);
    setActiveItem(null);
    setSearching(true);
    console.log(e);

    setTimeout(() => {
      const circular = new Circular();
      
      
      Array.from({ length: 10 }, () => ({ id: Math.random() * 10 })).map((e) =>
        circular.append(e)
      );

      setItems(circular)
    
      
      setSearching(false);
    }, 2000);
  }

  function SwitchNode(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (!items) return false;
      if (!activeItem) return setActiveItem(items.head);
      setActiveItem(activeItem.next);
      return false;
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (!items) return false;
      if (!activeItem) return setActiveItem(items.last);
      setActiveItem(activeItem.prev);
      return false;
    }
    return true;
  };

  return (
    <>
    <Portal>
    {
            show && <Box onClick={off} position="absolute" top={0} left={0} h="100%" width="100%" bg="blackAlpha.400" zIndex={1}/>
          }
    </Portal>
      <Box position="relative" height="auto" maxW={700} w="100%" margin="0 auto" zIndex={2}>
        <InputGroup
          ref={inputRefContainer}
          height={65}
          tabIndex={0}
          borderRadius={0}
          position=""
          maxW="700px"
          overflow="hidden"
          
        >
          <Input
             dir="rtl"
            bg="white"
            pr="4.5rem"
            textAlign="center"
            height="100%"
            w="100%"
            borderRadius={0}
            
            onChange={onChange}
            onKeyDown={SwitchNode}
            onFocus={on}
            
            value={q}
          />
          <InputLeftAddon borderRadius={0} height="100%">
            {t("SEARCH")}
          </InputLeftAddon>
          
        <Box
          bg="white"
          position="absolute"
          top="100%"
          
          width="100%"
          left={0}
          display="grid"
          gap={1}
        >
          {!!items && !searching && !!q && show && (
            <>
            <ListOfSuggestions items={items} activeItem={activeItem} />
            
            </>
          )}
          

          {searching && !!q && (
            <Center height={200}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          )}
          {!items && !searching && !!q && (
            <Center height={400}>Nothing Found</Center>
          )}
        </Box>
        </InputGroup>

      </Box>
    </>
  );
};

const ListOfSuggestions = ({ items, activeItem }) => {
  if (!items) return false;
  return (
    <Box css={ListStyle}>
      {items.toArray().map((e, i) => {
          const active =  activeItem?.value?.id === e.id;
          return <Button onClick={console.log} bg={active? "yellow": "ref"}>Item - {i}</Button>
      })}
    </Box>
  );
};
