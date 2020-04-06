import Head from "next/head";
import { ThemeProvider, CSSReset, Flex } from "@chakra-ui/core";

function Layout({ content }) {
  return (
    <div>
      <Head>
        <title>Hex</title>
        <link rel="manifest" href="/manifest.webmanifest"></link>
        <style>{"body { background-color: #2f404d }"}</style>
      </Head>

      <ThemeProvider>
        <CSSReset />

        <Flex
          name="main"
          alignItems="center"
          h="100vh"
          justifyItems="center"
          w="100vw"
        >
          {content}
        </Flex>

        <footer></footer>
      </ThemeProvider>
    </div>
  );
}

export default Layout;
