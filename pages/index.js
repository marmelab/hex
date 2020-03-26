import Head from "next/head";
import { ThemeProvider, CSSReset, Button } from "@chakra-ui/core";

const Home = () => (
  <div className="container">
    <Head>
      <title>Hex</title>
    </Head>

    <ThemeProvider>
      <CSSReset />
      <main>
        <Button>Start</Button>
      </main>

      <footer></footer>
    </ThemeProvider>
  </div>
);

export default Home;
