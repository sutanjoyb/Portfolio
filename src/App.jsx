import { HashRouter as Router, Routes, Route } from "react-router-dom";
import TopProgressBar from "./components/TopProgressBar";
import BackgroundFX from "./components/BackgroundFX";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import { ThemeProvider } from "./components/ThemeContext";

import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const profile = {
    roles: ["Student", "Aspiring Full Stack Developer"],
    email: "bsutanjoy@gmail.com",
  };

  return (
    <ThemeProvider>
      <Router>
        <PageTransition>
          <div className="relative min-h-screen bg-[#faf9f5] dark:bg-[#0a0d12] text-[#111] dark:text-[#f3f4f6] transition-colors duration-300 overflow-x-hidden selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black flex flex-col justify-between">
            <TopProgressBar />
            <BackgroundFX />
            <Navbar name="Sutanjoy Bhattacharjee" />

            <main className="relative z-10 flex flex-col items-center flex-grow pt-28 sm:pt-36 w-full">
              <div className="w-full flex flex-col">
                <Routes>
                  <Route path="/" element={<Home roles={profile.roles} />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route
                    path="/contact"
                    element={<ContactPage email={profile.email} />}
                  />
                </Routes>
              </div>
            </main>

            <ScrollToTop />
            <Footer />
          </div>
        </PageTransition>
      </Router>
    </ThemeProvider>
  );
}
