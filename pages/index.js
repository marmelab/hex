import Layout from "../components/layouts/Layout";
import MainMenu from "../components/menus/MainMenu";

export default function Home({ games }) {
  return (
    <Layout
      content={<MainMenu w="100vw" h="25vh" flexWrap="wrap" games={games} />}
    />
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/games");
  const games = await res.json();
  return { props: { games } };
}
