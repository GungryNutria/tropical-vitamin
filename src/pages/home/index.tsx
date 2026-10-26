import Cta from "./components/cta";
import Hero from "./components/hero";
import History from "./components/history";
import Navbar from "../../components/navbar";
import WhatsappFloat from "../../components/whatsappFloat";
import Services from "./components/services";
import FAQ from "./components/faq";

export default function Home() {
  return <>

    <Navbar />
    <Hero />
    <History />
    <Services />
    <FAQ />
    {/* <Mice /> */}
    <Cta />
    <WhatsappFloat />
  </>;

}
