import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaNodeJs,
  FaGitAlt,
  FaDatabase,
  FaDocker,
  FaPython,
} from "react-icons/fa";
import {
  SiMongodb,
  SiRedux,
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiGraphql,
  SiSass,
  SiFirebase,
  SiJest,
  SiVercel,
} from "react-icons/si";

// import "./SkillsSection.scss";

/* ------------------------
  TIMING CONFIG (edit these)
  ------------------------
  STAGGER_DELAY: per-card delay in seconds (0.05 = 50ms). This controls how much
                 time separates each card reveal (card i delays i * STAGGER_DELAY).
  PROGRESS_DURATION: how long (ms) the progress bar + numeric counter take to reach target.
*/
const STAGGER_DELAY = 0.09; // seconds between each card revealing (increase for more separation)
const PROGRESS_DURATION = 2400; // ms to reach full percent (increase for slower progress)

/* ------------------------
  SKILLS & PROGRESS DATA
  ------------------------ */
const SKILLS = [
  { name: "React", icon: <FaReact /> },
  { name: "JavaScript", icon: <FaJsSquare /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "HTML5", icon: <FaHtml5 /> },
  { name: "CSS3", icon: <FaCss3Alt /> },

  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Redux", icon: <SiRedux /> },
  { name: "GraphQL", icon: <SiGraphql /> },
  { name: "Docker", icon: <FaDocker /> },

  { name: "Git", icon: <FaGitAlt /> },
  { name: "Database", icon: <FaDatabase /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Express", icon: <SiExpress /> },

  // { name: "Sass", icon: <SiSass /> },
  // { name: "Vercel", icon: <SiVercel /> },
  // { name: "Python", icon: <FaPython /> },
  // { name: "Testing", icon: <SiJest /> },
  // { name: "API", icon: <FaDatabase /> },

  { name: "Security", icon: <FaNodeJs /> },
  { name: "Performance", icon: <FaReact /> },
  { name: "UI/UX", icon: <FaHtml5 /> },
  { name: "Serverless", icon: <FaNodeJs /> },
  { name: "Microservices", icon: <FaNodeJs /> },
];

const progressItems = [
  { label: "Frontend", percent: 90 },
  { label: "Backend", percent: 90 },
  { label: "Database", percent: 85 },
  { label: "Deploy & Git", percent: 92 },
];

/* ------------------------
  Framer Motion variants
  - cardVariants uses the custom prop (index) to compute delay = index * STAGGER_DELAY
  ------------------------ */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      // container-level stagger is kept minimal; per-card delay handled in cardVariants.
      staggerChildren: 0.01,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: "easeOut",
      // per-card delay computed from index and STAGGER_DELAY
      delay: index * STAGGER_DELAY,
    },
  }),
};

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState(progressItems.map(() => 0));
  // keep a simple counter to cancel running RAF loops if needed
  const rafRefs = useRef([]);

  // IntersectionObserver - replay on every entry
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Enter view -> reveal cards + start progress
            setInView(true);
            controls.start("visible");
            startCountersAndBars();
          } else {
            // Exit view -> hide cards + reset progress so next enter replays
            setInView(false);
            controls.start("hidden");
            resetCountersAndBars();
          }
        });
      },
      { threshold: 0.28 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      // cancel any RAFs on unmount
      rafRefs.current.forEach((id) => id && cancelAnimationFrame(id));
    };
  }, [controls]);

  function resetCountersAndBars() {
    // cancel any existing RAFs
    rafRefs.current.forEach((id) => id && cancelAnimationFrame(id));
    rafRefs.current = [];
    setCounts(progressItems.map(() => 0));
  }

  function startCountersAndBars() {
    // ensure previous are cancelled
    resetCountersAndBars();

    progressItems.forEach((item, idx) => {
      const startTime = performance.now();
      const duration = PROGRESS_DURATION + idx * 120; // slight stagger between bars
      const endVal = item.percent;
      // step function that updates numbers
      function step(now) {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.round(endVal * eased);

        setCounts((prev) => {
          const next = [...prev];
          next[idx] = value;
          return next;
        });

        if (t < 1) {
          rafRefs.current[idx] = requestAnimationFrame(step);
        } else {
          rafRefs.current[idx] = null;
        }
      }
      rafRefs.current[idx] = requestAnimationFrame(step);
    });
  }

  return (
    <section className="skills-section dark-theme" ref={sectionRef} id="skills">
      <div className="container-inner">
        <h2 className="section-title">
          Skills <span>&</span> Experience
        </h2>

        <div className="skills-grid">
          {/* LEFT GRID */}
          <motion.div
            className="skills-cards"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {SKILLS.map((s, i) => (
              <motion.div
                key={i}
                className="skill-card"
                custom={i}
                variants={cardVariants}
              >
                <div className="icon-wrap">{s.icon}</div>
                <div className="skill-name">{s.name}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT GLASS CARD */}
          <div className="skills-right">
            <div className="glass-card">
              <h3>Technical Strengths</h3>
              <p className="sub">Frontend, Backend, Database & Deployment</p>

              <div className="progress-list">
                {progressItems.map((item, idx) => (
                  <div className="progress-row" key={idx}>
                    <div className="top">
                      <span>{item.label}</span>
                      <span className="percent">{counts[idx]}%</span>
                    </div>

                    <div className="bar-outer">
                      <div
                        className="bar-inner"
                        style={{
                          width: inView ? `${item.percent}%` : "0%",
                          transition: inView
                            ? `width ${PROGRESS_DURATION + idx * 120}ms cubic-bezier(.2,.9,.2,1)`
                            : "width 180ms linear",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <small className="note">
                Cards reveal one-by-one; progress bars take {Math.round(PROGRESS_DURATION / 1000 * 10) / 10}s (config).
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
