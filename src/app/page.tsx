import { redirect } from "next/navigation"

const Home = () => {
  
  return redirect("/auth/sign-in");
};

export default Home;
