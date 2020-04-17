import fetch from "isomorphic-unfetch";
import Layout from "../components/layouts/Layout";
import MainMenu from "../components/menus/MainMenu";

/* export const GAME_URI = "https://hex.chroq.now.sh/api/games"; */
export const GAME_URI = "http://localhost:3000/api/games";

export default function Home({ games }) {
  return (
    <Layout
      content={<MainMenu w="100vw" h="25vh" flexWrap="wrap" games={games} />}
    />
  );
}

export async function getServerSideProps() {
  const res = await fetch(GAME_URI);
  const games = await res.json();
  return { props: { games } };
}
