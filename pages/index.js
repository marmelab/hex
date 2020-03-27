import Head from "next/head";
import { ThemeProvider, CSSReset, Flex, Button } from "@chakra-ui/core";
import { LocalPlayModal } from "../components/modals/LocalPlayModal";

const Home = () => (
  <div>
    <Head>
      <title>Hex</title>
    </Head>

    <ThemeProvider>
      <CSSReset />
      <main className="centered">
          <LocalPlayModal />
      </main>

      <footer></footer>
    </ThemeProvider>

    <style jsx>{`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}</style>
  </div>
);

export default Home;
