import fetch from "isomorphic-unfetch";
import Layout from "../components/layouts/Layout";
import MainMenu from "../components/menus/MainMenu";

export default function Home({ games, baseUrl }) {
  return (
    <Layout
      content={
        <MainMenu
          w="100vw"
          h="25vh"
          flexWrap="wrap"
          games={games}
          baseUrl={baseUrl}
        />
      }
    />
  );
}

export async function getServerSideProps({ req }) {
  const baseUrl = getBaseUrl(req);

  const res = await fetch(`${baseUrl}/api/games`);
  const games = await res.json();

  return { props: { games, baseUrl } };
}

/**
 * Get the base URL
 *
 * @param {Object} req
 */
export const getBaseUrl = (req) => {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${protocol}://${req.headers.host}`;
};
