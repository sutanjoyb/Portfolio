import TopProgressBar from "./components/TopProgressBar";
import BackgroundFX from "./components/BackgroundFX";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import TerminalCommandBar from "./components/TerminalCommandBar";
import FooterOutro from "./components/FooterOutro";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeContext";

export default function App() {
  const profile = {
    title: "I'M SUTANJOY",
    roles: ["Student", "Aspiring Full Stack Developer"],
    email: "bsutanjoy@gmail.com",
    portraitUrl: "",
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#faf9f5] dark:bg-[#0a0d12] text-[#111] dark:text-[#f3f4f6] transition-colors duration-300 overflow-x-hidden selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black">
        <TopProgressBar />
        <BackgroundFX />
        {/* <ThemeToggleBtn /> removed from here */}

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
            <TerminalCommandBar />
            <FooterOutro />
            <ScrollToTop />
            <Footer />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
