import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { AiOutlineDownload } from "react-icons/ai";

import pdf from "../assets/pdf/Sathishkumar_VC_FullStackDeveloper_Resume.pdf";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useNavigate } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const resumeLink = `https://raw.githubusercontent.com/SathishWebDeveloper/Sathishkumar-Portfolio/master/src/assets/pdf/Sathishkumar_VC_FullStackDeveloper_Resume.pdf`;

const Resume = () => {
  const [width, setWidth] = useState(1200);
  const navigate = useNavigate();

  useEffect(() => {
    
    setWidth(window.innerWidth);
  }, []);

  return (
    <div className="section">
      <Container fluid className="resume-section mt-5">
        <Row style={{ justifyContent: "center", position: "relative" }}
         >  
                   <Button
            variant="primary"
            // target="_blank"
            onClick={()=> navigate("/")}
            style={{ maxWidth: "200px" , margin : "50px 20px 20px 0px" }}
          >  
            <AiOutlineDownload />
             Back  to Home
          </Button> 

                    <Button
            variant="primary"
            href={pdf}
            target="_blank"
            style={{ maxWidth: "200px" ,  margin : "50px 20px 20px 0px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download Resume
          </Button>
        </Row>

        <Row className="resume">
          <Document file={resumeLink} className="d-flex justify-content-center">
            <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
        </Row>

        <Row style={{ justifyContent: "center", position: "relative" }}>

        </Row>
      </Container>
    </div>
  )
}

export default Resume;