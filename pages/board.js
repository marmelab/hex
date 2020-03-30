import Layout from "../components/layouts/Layout";
import Playboard from "../components/boards/Playboard";

const Board = props => {
  
  const playboard = <Playboard size={15} />;

  return <Layout content={playboard} />;
};

export default Board;
