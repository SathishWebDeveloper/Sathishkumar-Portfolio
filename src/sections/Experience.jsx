import React from "react";
import { motion } from "framer-motion";

export default function Experience() {
  const experiences = [
    { role: "Frontend Developer", company: "TechCorp", period: "2022 - Present" },
    { role: "Web Developer Intern", company: "DevStudio", period: "2021 - 2022" },
  ];

  return (
    <section id="experience" className="section">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1>Experience</h1>
        <div className="experience-list">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="experience-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h3>{exp.role}</h3>
              <p>{exp.company}</p>
              <span>{exp.period}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
