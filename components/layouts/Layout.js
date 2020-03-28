import Head from "next/head";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

const Layout = props => (
  <div>
    <Head>
      <title>Hex</title>
      <style>{'body { background-color: #2f404d; }'}</style>
    </Head>

    <ThemeProvider>
      <CSSReset />
      <div className="in-middle">
        {props.content}
      </div>
      <footer></footer>
    </ThemeProvider>
    <style jsx>{`
      .in-middle {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        display: flex;
        height: 100vh;
      }
    `}</style>
  </div>
);

export default Layout