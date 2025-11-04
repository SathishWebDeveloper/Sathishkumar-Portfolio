import React from "react";
import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    { name: "Portfolio Website", tech: "React, Sass, Framer Motion" },
    { name: "Task Manager App", tech: "React, Node.js, MongoDB" },
    { name: "Weather App", tech: "React, OpenWeather API" },
  ];

  return (
    <section id="projects" className="section">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1>Projects</h1>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3>{project.name}</h3>
              <p>{project.tech}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
