import { useRouter } from "next/router";
import Router from "next/router";

import Layout from "../components/layouts/Layout";
import Playboard from "../components/boards/Playboard";

const Board = () => {
  const { query } = useRouter();

  if (!query.size && !query.id) {
    return null;
  }

  const sizeParameter = query.size ? parseInt(query.size, 10) : undefined;

  return (
    <Layout
      content={
        <Playboard
          sizeParameter={sizeParameter}
          idParameter={query.id}
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
