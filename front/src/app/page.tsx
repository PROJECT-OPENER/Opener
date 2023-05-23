// import { getServerSession } from 'next-auth';
import Main from './main/page';
const Home = async () => {
  // const session = await getServerSession();
  // const user = session?.user;
  // console.log(user);
  return <Main />;
};

export default Home;
