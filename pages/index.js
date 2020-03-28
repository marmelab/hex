import Layout from "../components/layouts/Layout";
import LocalPlayModal from "../components/modals/LocalPlayModal";

const Home = () => {
  const localPlayModal = <LocalPlayModal />;
  return <Layout content={localPlayModal} />;
};

export default Home;
