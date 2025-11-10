import React from "react";
import { motion } from "framer-motion";
import Particles from "../components/Animation/Particles";

export default function Home() {
  return (
    <section id="home" className="section">
          <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >

        Home Section fu
      </motion.div>
        </Particles>
    </section>
  );
}
