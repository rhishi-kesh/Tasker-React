import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TaskBoard from "./components/TaskBorard";

export default function App() {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <TaskBoard></TaskBoard>
      <Footer></Footer>
    </>
  );
}
