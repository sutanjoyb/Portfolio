import TopProgressBar from "./components/TopProgressBar";
import BackgroundFX from "./components/BackgroundFX";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import FooterOutro from "./components/FooterOutro";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

export default function App() {
  const profile = {
    title: "I'M SUTANJOY",
    roles: ["Student", "Aspiring Full Stack Developer"],
    email: "bsutanjoy@gmail.com",
    portraitUrl: "",
  };

  return (
    <div className="relative min-h-screen bg-[#e2e1dc] text-[#111] overflow-x-hidden selection:bg-black selection:text-white">
      <TopProgressBar />
      <BackgroundFX />

      <main className="relative z-10 p-3 sm:p-6 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-6xl flex flex-col">
          <Hero
            title={profile.title}
            roles={profile.roles}
            imageSrc={profile.portraitUrl}
          />
          <About />
          <Projects />
          <Contact email={profile.email} />
          <FooterOutro />
          <ScrollToTop />
          <Footer />
        </div>
      </main>
    </div>
  );
}
