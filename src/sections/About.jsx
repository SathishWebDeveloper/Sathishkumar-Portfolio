import React, { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion, useScroll, useTransform } from "framer-motion";
import aboutLogo from "../assets/images/Developer.gif";

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
    <section className="section home-pagesection" ref={sectionRef} id="about">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="text-center about-titlecontainer">
              <h2 className="content-title mb-2">
                About Me <span role="img" aria-label="wave">👨‍💻</span>
              </h2>
              <p className="content-subheader">SATHISHKUMAR V C</p>
            </div>

            <div className="about-divider" />

            <div className="about-content">
              <div className="left">

                  <img src={aboutLogo} className="w-100"/>
              </div>

              <div className="right">
                <div className="content-subtitle mb-3">Full Stack Web Developer</div>

                {/* Correct usage: pass motion values directly as style props */}
                <motion.p
                  className="content-paragraph"
                >
                  Full Stack Developer with 3+ years of hands-on experience building responsive web applications. Proficient in React.js, Node.js, Express, MongoDB, and MySQL, with a strong knowledge of AWS for cloud deployment. Skilled in performance optimization, reusable component architecture, and delivering scalable solutions in Agile environments.
                </motion.p>
              </div>

              <div className="floating-circles" aria-hidden="true">
                <div className="circle c1" />
                <div className="circle c2" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
