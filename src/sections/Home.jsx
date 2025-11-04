import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section id="home" className="section">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Home Section fu
      </motion.h1>
    </section>
  );
}
