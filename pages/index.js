import Layout from "../components/layouts/Layout";
import MainMenu from "../components/menus/MainMenu";
import { getGames } from "./api/gameCalls";
import { baseUrlSingleton } from "./api";

export default function Home({ games }) {
  return (
    <Layout
      content={<MainMenu w="100vw" h="25vh" flexWrap="wrap" games={games} />}
    />
  );
}

export async function getServerSideProps({ req }) {
  baseUrlSingleton(req.headers.host);
  return { props: { games: await getGames() } };
}
