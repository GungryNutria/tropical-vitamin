import Contact from "./components/contact";
import Cta from "./components/cta";
import Hero from "./components/hero";
import History from "./components/history";
import Navbar from "../../components/navbar";
import WhatsappFloat from "../../components/whatsappFloat";
import Services from "./components/services";

export default function Home() {
  return <>
    <Navbar />
    <Hero />
    <History />
    <Services />
    {/* <Mice /> */}
    <Cta />
    <Contact />
    <WhatsappFloat />
  </>;

}