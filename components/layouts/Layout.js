import Head from "next/head";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Flex, Badge } from "@chakra-ui/core";

const Layout = props => (
  <div>
    <Head>
      <title>Hex</title>
      <style>{"body { background-color: #2f404d }"}</style>
    </Head>

    <ThemeProvider>
      <CSSReset />

      <div className="main">
        <div className="in-middle">{props.content}</div>
        <div className="aside">{props.aside}</div>
      </div>

      <footer></footer>
    </ThemeProvider>
    <style jsx>{`
      .main {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        height: 100vh;
      }

      .in-middle {
        justify-content: center;
        align-items: center;
        display: flex;
        height: 100vh;
        width: 80%;
      }

      .aside {
        justify-content: center;
        align-items: center;
        display: flex;
        width: 20%;
      }
    `}</style>
  </div>
);

export default Layout;
