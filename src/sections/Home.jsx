import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Particles from "../components/Animation/Particles";
import TypeText from "../components/TypeWriterText";
import homeLogo from "../assets/images/home-user1.png";
import GradientBlinds from '../components/Animation/GradientBlinds';
import LightRays from '../components/Animation/LightRays';
import Orb from '../components/Animation/orb';


export default function Home() {
  return (
    <section id="home" className="section home-pagesection">
      {/* <Particles
        particleColors={["#112149", "#112149"]}
        particleCount={100}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        className={"particles-bglayout"}
      ></Particles> */}
        <Orb
    hoverIntensity={0.75}
    rotateOnHover={true}
    hue={0}
    forceHoverState={false}
    className={"particles-bglayout"}
  ></Orb>
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

