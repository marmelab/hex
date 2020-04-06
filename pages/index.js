import Layout from "../components/layouts/Layout";
import MainMenu from "../components/Menus/MainMenu";
import { DARK_COLOR_100 } from "../theme/colors";

const Home = () => {
  return <Layout content={<MainMenu w="100vw" h="25vh" flexWrap="wrap" />} />;
};

export default Home;
