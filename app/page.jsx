import Header from "../components/Header";
import Home from "../components/Home";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import About from "../components/About";
import Footer from "../components/Footer";
import ExternalScripts from "../components/ExternalScripts";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Home />
        <Services />
        <Portfolio />
        <Skills />
        <Contact />
        <About />
      </main>
      <Footer />
      <ExternalScripts />
    </>
  );
}
