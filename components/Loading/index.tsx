import { Box, Spinner, useBoolean } from "@chakra-ui/react";
import { css, CSSObject } from "@emotion/react";
import { Router, useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import useFirstMount from "../../hooks/isFirstMount";

const Loading = () => {
  const FirstMount = useFirstMount();
  const { isReady } = useRouter();
  let Styles = css`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: white;
    z-index: calc(var(--chakra-zIndices-overlay) * 2);
    left: 0;
    transition: all 1s;
  `;
  const fade = css`opacity: 0;`;
  const displayNone = css`display: none;`;

  const [StylesArr, setStylesArr] = useState([Styles]);

  const AddFaceClasses = useCallback(() => {
    setStylesArr([...StylesArr, fade]);
    setTimeout(() => {
      setStylesArr([...StylesArr, displayNone]);
    }, 1000);
  }, [StylesArr, displayNone, fade])
  

  React.useEffect(() => {
    if (isReady) {
        AddFaceClasses()
    }
  }, []);

  React.useEffect(() => {
    Router.events.on("routeChangeStart", () => setStylesArr([Styles]));
    Router.events.on("routeChangeComplete", AddFaceClasses);
    return () => {
      Router.events.on("routeChangeStart", () => setStylesArr([Styles]));
      Router.events.on("routeChangeComplete", () => AddFaceClasses());
    };
  }, [AddFaceClasses, Styles]);

  return (
    <Box css={StylesArr}>
      <Box
        display="flex"
        w="100%"
        h="100%"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
      >
        <img alt="s" src="/abadis.svg" width={400} height={150} />
        <Spinner size="lg" m={10}/>
      </Box>
      <Spinner/>
    </Box>
  );
};

export default Loading;
