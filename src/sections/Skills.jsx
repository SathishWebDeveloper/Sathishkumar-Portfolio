import React from "react";
import { motion } from "framer-motion";

export default function Skills() {
  const skills = [
    "HTML", "CSS", "JavaScript", "React", "Sass", "Git", "Framer Motion",
  ];

  return (
    <section id="skills" className="section">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1>Skills</h1>
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              className="skill-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
