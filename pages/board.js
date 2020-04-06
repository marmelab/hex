import { useRouter } from "next/router";

import Layout from "../components/layouts/Layout";
import Playboard from "../components/boards/Playboard";

const Board = () => {
  const { query } = useRouter();

  if (!query.size && !query.id) {
    return null;
  }

  return (
    <Layout
      content={
        <Playboard
          size={parseInt(query.size, 10)}
          id={parseInt(query.id, 10)}
          w="56vw"
          h="62vh"
          marginTop="15vh"
          marginRight="15vw"
          marginBottom="15vh"
          marginLeft="15vw"
          color
        />
      }
    />
  );
};

export default Board;
