import Layout from "../components/layouts/Layout";
import MainMenu from "../components/menus/MainMenu";

const Home = () => {
  return <Layout content={<MainMenu w="100vw" h="25vh" flexWrap="wrap" />} />;
};

export default Home;
