import { useRouter } from "next/router";

import Layout from "../components/layouts/Layout";
import Playboard from "../components/boards/Playboard";

const Board = props => {
  const { query } = useRouter();

  if (!query.size) {
    return null;
  }

  return (
    <>
      <Layout content={<Playboard size={parseInt(query.size, 10)} color />} />
    </>
  );
};

export default Board;
