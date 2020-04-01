import Head from "next/head";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

function Layout({ aside, content }) {
  return (
    <div>
      <Head>
        <title>Hex</title>
        <link rel="manifest" href="/manifest.webmanifest"></link>
        <style>{"body { background-color: #2f404d }"}</style>
      </Head>

      <ThemeProvider>
        <CSSReset />

        <div className="main">
          <div className="content">{content}</div>
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

        .content {
          justify-content: center;
          align-items: center;
          display: flex;
          height: 100vh;
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export default Layout;
