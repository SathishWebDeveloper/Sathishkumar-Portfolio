import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import "./styles/App.scss";
import Home from "./sections/Home";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Particles from "./components/Animation/Particles";
import { motion } from "framer-motion";


export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  // Handle loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  // Apply global theme class
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}


  return (
    <>

       {loading ? (
      <Loader />
    ) : (
      <motion.div
        key="main"
        className="app"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="bg-container">
                        <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Home />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        </Particles>
        </div>

      </motion.div>
    )}
    


   
      {/* {loading ? (
        <Loader />
      ) : (
        <div className="bg-container">
                <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Home />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />

          </Particles>
        </div>
      )} */}
    </>
  );
}


