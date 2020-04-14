import fetch from "isomorphic-unfetch";
import Playboard from "../../components/boards/Playboard";
import Layout from "../../components/layouts/Layout";
import { GAME_URI } from "../api/games";

export default OnlineBoardPage = ({ game }) => {
  return (
    <Layout
      content={
        <Playboard game={game} w="100vw" marginTop="15vh" marginBottom="15vh" />
      }
    />
  );
};

export async function getServerSideProps(context) {
  const res = await fetch(`${GAME_URI}/${context.query.id}`);

  const game = await res.json();
  return { props: { game } };
}
