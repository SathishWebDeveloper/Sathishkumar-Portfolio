import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import "./styles/App.scss";

/**
 * Lazy imports
 */
const Home = lazy(() => import("./sections/Home"));
const About = lazy(() => import("./sections/About"));
const Projects = lazy(() => import("./sections/Projects"));
const Skills = lazy(() => import("./sections/Skills"));
const Contact = lazy(() => import("./sections/Contact"));
// const Resume = lazy(() => import("./sections/Resume")); // specific path-only component

/**
 * Compose a single page that renders ALL sections for the Home route.
 * This keeps each section lazy-loaded (they still load on demand when route is hit).
 */
function HomePage() {
  return (
    <>
      <Home />
      <About />
      {/* <Experience /> */}
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}

/**
 * Routes array (dynamic)
 * Only `/` (HomePage) shows all sections. `/resume` shows just Resume.
 */
const routes = [
  { path: "/", name: "Home", element: <HomePage /> },
  // { path: "/resume", name: "Resume", element: <Resume /> },
];

export default function App() {
  // read theme immediately so class is correct on first paint
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
    } catch (e) {
      // ignore
    }
    return true;
  });

  const [loading, setLoading] = useState(false);

  // initial loader (your existing timer)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  // apply theme class + persist selection
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // show initial Loader while waiting
  if (loading) return <Loader />;

  // run once and on resize to set a --vh custom property
function setVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVh();
window.addEventListener('resize', setVh);


  return (
    <Router>
      <div>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Suspense fallback while lazy chunks load */}
        <Suspense fallback={<Loader />}>
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

            {/* Unknown routes -> redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
