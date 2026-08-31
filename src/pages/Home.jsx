import Hero from "../components/Hero";
import HeroDetails from "../components/HeroDetails";
import LatestProjects from "../components/LatestProjects";
import Workflow from "../components/Workflow";
import TerminalCommandBar from "../components/TerminalCommandBar";

export default function Home({ roles }) {
  return (
    <div className="w-full flex flex-col items-center">
      <Hero roles={roles} />
      <HeroDetails />
      <LatestProjects />
      <Workflow />
      <TerminalCommandBar />
    </div>
  );
}
