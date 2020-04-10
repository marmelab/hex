import fetch from "isomorphic-unfetch";
import Playboard from "../../components/boards/Playboard";
import Layout from "../../components/layouts/Layout";

export const GAME_URI = "http://localhost:3000/api/games";

const OnlineBoardPage = ({ game }) => {
  return (
    <Layout
      content={
        <Playboard game={game} w="100vw" marginTop="15vh" marginBottom="15vh" />
      }
    />
  );
};

export default OnlineBoardPage;

export async function getServerSideProps(context) {
  const res = await fetch(`${GAME_URI}/${context.query.id}`);

  const game = await res.json();
  return { props: { game } };
}
