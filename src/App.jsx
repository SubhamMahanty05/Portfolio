import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import NeuralNetworkCanvas from "./components/NeuralNetworkCanvas";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import AIAssistant from "./components/AIAssistant";

const SESSION_KEY = "ai-portfolio-loader-seen";

function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [reducedVisual, setReducedVisual] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const seenLoader = window.sessionStorage.getItem(SESSION_KEY) === "true";
    setShowLoader(!seenLoader);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const updateReduced = () => {
      setReducedVisual(motionQuery.matches || mobileQuery.matches);
    };

    updateReduced();
    motionQuery.addEventListener("change", updateReduced);
    mobileQuery.addEventListener("change", updateReduced);

    return () => {
      motionQuery.removeEventListener("change", updateReduced);
      mobileQuery.removeEventListener("change", updateReduced);
    };
  }, []);

  const handleLoaderComplete = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    }
    setShowLoader(false);
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#030711] text-slate-100">
      <NeuralNetworkCanvas
        reduced={reducedVisual}
        className="global-bg"
        pointer={{ x: 0, y: 0 }}
        scrollProgress={0}
        clickPulse={0}
      />
      <div className="absolute inset-0 bg-[#030711]/70 z-10 pointer-events-none" />
      <div className="relative z-20">
        <CustomCursor />
        <ScrollProgress />
        <Navbar isLoading={showLoader} />

        <AnimatePresence mode="wait">
        {showLoader ? (
          <Loader
            key="entry-loader"
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled((current) => !current)}
            onComplete={handleLoaderComplete}
          />
        ) : null}
      </AnimatePresence>

      <div
        className={`transition-all duration-700 ease-out ${
          showLoader ? "scale-[1.02] opacity-0 blur-[10px]" : "opacity-100"
        }`}
      >
        <main className="relative z-20 pt-32">
          <Hero onOpenAssistant={() => setAssistantOpen(true)} soundEnabled={soundEnabled} />
          <About />
          <Skills />
          <Projects soundEnabled={soundEnabled} />
          <Certifications />
          <Education />
          <Contact soundEnabled={soundEnabled} />
        </main>

        <Footer />

        <AnimatePresence>
          {assistantOpen ? (
            <AIAssistant
              onClose={() => setAssistantOpen(false)}
              soundEnabled={soundEnabled}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  </div>
  );
}

export default App;
