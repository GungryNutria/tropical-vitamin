import Contact from "./components/contact";
import Cta from "./components/cta";
import Footer from "./components/footer";
import Hero from "./components/hero";
import History from "./components/history";
import Mice from "./components/mice";
import Navbar from "./components/navbar";
import Services from "./components/services";
import Tours from "./components/tours";
import WhatsappFloat from "./components/whatsappFloat";

function Home() {
  return <>
    <Navbar />
    <Hero />
    <Services />
    <History />
    <Tours />
    <Mice />
    <Cta />
    <Contact />
    <Footer />

    <WhatsappFloat />
  </>;

}

export default Home;