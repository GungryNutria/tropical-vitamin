import Cta from "./components/cta";
import Hero from "./components/hero";
import History from "./components/history";
import Navbar from "../../components/navbar";
import WhatsappFloat from "../../components/whatsappFloat";
import Services from "./components/services";
import Testimonials from "./components/testimonials";
import FAQ from "./components/faq";

export default function Home() {
  return <>

    <Navbar />
    <Hero />
    <History />
    <Services />
    <Testimonials />
    <FAQ />
    {/* <Mice /> */}
    <Cta />
    <WhatsappFloat />
  </>;

}
