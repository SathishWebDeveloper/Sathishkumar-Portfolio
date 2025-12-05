import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
// import './Projects.scss';

const cards = [
  { title: 'Notes', text: `MERN Stack Notes Application – ...`, tech: ['React', 'Redux', 'Node.js', 'Fastify.js', 'MongoDB'], img: '/images/notes.jpg', color: 'purple' },
  { title: 'Social login', text: `Secure authentication ...`, tech: ['React', 'Redux', 'Firebase'], img: '/images/social.jpg', color: 'blue' },
  { title: 'e-mart', text: `React.js e-commerce ...`, tech: ['React', 'Redux Toolkit', 'Redux-thunk'], img: '/images/emart.jpg', color: 'green' },
  { title: 'Weather App', text: `Responsive web app ...`, tech: ['React', 'OpenWeather'], img: '/images/weather.jpg', color: 'purple' },
  { title: 'Product API', text: `A RESTful API ...`, tech: ['Node.js', 'Express', 'MongoDB'], img: '/images/api.jpg', color: 'orange' },
  { title: 'Wedding website', text: `Wedding website ...`, tech: ['React', 'Tailwind'], img: '/images/wedding.jpg', color: 'purple' }
];

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: index * 0.12, duration: 0.56, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function Projects() {
  const cardRefs = useRef([]);
  const [visible, setVisible] = useState(() => Array(cards.length).fill(false));
  const [hoverIdx, setHoverIdx] = useState(null);           // <-- NEW: track hovered card index
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.dataset.index);
          if (Number.isNaN(idx)) return;
          setVisible((prev) => {
            const copy = [...prev];
            copy[idx] = entry.isIntersecting;
            return copy;
          });
        });
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.2 }
    );

    // Observe current elements
    cardRefs.current.forEach((el) => {
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current && observerRef.current.disconnect();
  }, []);

  return (
    <section className="projects-section py-5 section" id='projects'>
      <div className="container">
        <h2 className="section-title text-center mb-4">EXPERIENCE / PERSONAL PROJECTS</h2>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {cards.map((c, idx) => (
            <div key={idx} className="col" data-color={c.color}>
              <motion.article
                ref={(el) => (cardRefs.current[idx] = el)}
                data-index={idx}
                /* add glare/overlay classes based on hoverIdx state */
                className={
                  `custom-card h-100 glass-card ${hoverIdx === idx ? 'glare-active overlay-active' : ''}`
                }
                variants={cardVariants}
                custom={idx}
                initial="hidden"
                animate={visible[idx] ? 'visible' : 'hidden'}

                whileHover={{
                  scale: 1.05,
                  y: -6,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}

                whileTap={{
                  scale: 0.98
                }}

                transition={{
                  duration: 0.18,              // default for un-hover
                  ease: "easeOut"               // makes shrink-back fast + clean
                }}


                /* use React state handlers (more reliable) */
                onHoverStart={() => setHoverIdx(idx)}
                onHoverEnd={() => setHoverIdx(null)}

              // transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <div className="card-inner d-flex">
                  <div className="card-content">
                    <h4 className="card-title">{c.title}</h4>
                    <p className="card-text">{c.text}</p>

                    <div className="tech-list">
                      {c.tech.map((t, i) => (
                        <span key={i} className="badge tech-badge">{t}</span>
                      ))}
                    </div>

                    <div className="card-actions mt-3">
                      <a className="icon-link" href="#" aria-label="github">🔗</a>
                      <a className="icon-link ms-2" href="#" aria-label="live">↗</a>
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
