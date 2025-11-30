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
      {/* <Orb
        hoverIntensity={0.75}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
        className={"particles-bglayout"}
      /> */}
      <Container className="home-content">
        <Row className='w-100 justify-spaceeven mob-responsive'>
          <Col md={6} className="home-header">
            <h1 className="heading">
              Hi There!
              <span className="wave" role="img" aria-labelledby="wave">
                👋🏻
              </span>
            </h1>

            <h1 className="heading-name">
              I'M
              <strong className="main-name">
                {" "}
                Sathishkumar V C
              </strong>
            </h1>

            <div>
              <TypeText />
            </div>
          </Col>

          <Col md={4} className='home-imagecontainer'>
            <img
              src={homeLogo}
              alt="home pic"
              className="img-fluid"
              // style={{ maxHeight: "450px" }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

