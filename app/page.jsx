import Header from "../components/Header";
import Home from "../components/Home";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import About from "../components/About";
import Journey from "../components/Journey";
import Footer from "../components/Footer";
import Marquee from "../components/Marquee";
import ExternalScripts from "../components/ExternalScripts";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Home />
        <Services />
        <Marquee />
        <Portfolio />
        <Journey />
        <Skills />
        <Contact />
        <About />
      </main>
      <Footer />
      <ExternalScripts />
    </>
  );
}
