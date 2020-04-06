import { useRouter } from "next/router";

import Layout from "../components/layouts/Layout";
import Playboard from "../components/boards/Playboard";

const Board = () => {
  const { query } = useRouter();

  if (!query.size) {
    return null;
  }

  return (
    <Layout
      content={
        <Playboard
          size={parseInt(query.size, 10)}
          w="60%"
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
