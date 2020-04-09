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
          onlineParameter={query.online}
          player1NicknameParameter={query.player1Nickname}
          w="100vw"
          marginTop="15vh"
          marginBottom="15vh"
          color
        />
      }
    />
  );
};

export default Board;
