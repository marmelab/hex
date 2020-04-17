import fetch from "isomorphic-unfetch";
import Layout from "../components/layouts/Layout";
import MainMenu from "../components/menus/MainMenu";
import { version, forwardRef } from "react";

export default function Home({ games }) {
  return (
    <Layout
      content={<MainMenu w="100vw" h="25vh" flexWrap="wrap" games={games} />}
    />
  );
}

export async function getServerSideProps({ req }) {
  const res = await fetch(`${getBaseUrl(req)}/api/games`);
  const games = await res.json();
  return { props: { games } };
}

export function getBaseUrl(req) {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return protocol + "://" + req.headers.host;
}
