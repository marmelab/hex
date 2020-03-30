import Layout from "../components/layouts/Layout";
import Playboard from "../components/boards/Playboard";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Board = props => {
  const { query } = useRouter();

  if (!query.size) {
    return null;
  }
  return <Layout content={<Playboard size={parseInt(query.size, 10)} />} />;
};

export default Board;
