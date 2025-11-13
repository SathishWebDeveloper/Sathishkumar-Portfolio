import React, { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Map progress (0..1) to opacity and y motion values
  const opacity = useTransform(scrollYProgress, [0, 0.06, 0.24, 0.9, 1], [0, 1, 1, 0.6, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 1], [30, 0, -20]); // y is MotionValue

  return (
    <section className="about-section" ref={sectionRef}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="text-center" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
              <h2 style={{ fontSize: "2.75rem", color: "var(--text-color)", margin: 0 }}>
                Hi There! <span role="img" aria-label="wave">👋</span>
              </h2>
              <p style={{ color: "var(--muted-color)", marginTop: "0.75rem" }}>WELCOME TO MY PORTFOLIO!</p>
            </div>

            <div className="about-divider" />

            <div className="about-content">
              <div className="left">
                <div className="about-icon">
                  {/* your SVG */}
                </div>
              </div>

              <div className="right">
                <div className="about-title">ABOUT ME</div>

                {/* Correct usage: pass motion values directly as style props */}
                <motion.p
                  className="about-paragraph"
                  style={{ opacity, y }}   // <-- pass MotionValues directly
                >
                  I am a passionate developer with experience in building web applications.
                  I focus on creating performant, accessible, and delightful user experiences
                  using modern tools and libraries. I enjoy solving problems, learning new
                  technologies, and building products that have real impact.
                </motion.p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
