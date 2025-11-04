import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="section">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1>About Me</h1>
        <p>
          I’m a passionate web developer focused on building beautiful and
          responsive web applications. I love exploring new technologies and
          constantly improving my craft through hands-on experience.
        </p>
      </motion.div>
    </section>
  );
}
