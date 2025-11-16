import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
// import { motion } from "framer-motion";
import Particles from "../components/Animation/Particles";
import TypeText from "../components/TypeWriterText";
// import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../assets/images/home-it.png";
import GradientBlinds from '../components/Animation/GradientBlinds';
import LightRays from '../components/Animation/LightRays';
// import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
  return (
    <section id="home" className="section">
      {/* <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        className={"particles-bglayout"}
      ></Particles> */}
        <LightRays
    raysOrigin="top-center"
    raysColor="#ffffff"
    raysSpeed={1}
    lightSpread={0.6}
    rayLength={1.2}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0.1}
    distortion={0.05}
    className="particles-container particles-bglayout"
  />


      <Container className="home-content">
        <Row className='w-100 justify-spaceeven'>
          <Col md={6} className="home-header">
            <h1 style={{ paddingBottom: 15 }} className="heading">
              Hi There!{" "}
              <span className="wave" role="img" aria-labelledby="wave">
                👋🏻
              </span>
            </h1>

            <h1 className="heading-name">
              I'M
              <strong className="main-name">
                {" "}
                 SK
              </strong>
            </h1>

            <div style={{ padding: 50, textAlign: "left" }}>
              <TypeText />
            </div>
          </Col>

          <Col md={4} style={{ paddingBottom: 20 }}>
            <img
              src={homeLogo}
              alt="home pic"
              className="img-fluid"
              style={{ maxHeight: "450px" }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

