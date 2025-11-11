import React from "react";
import Typewriter from "typewriter-effect";

const TypeText = () => {
    return (
        <Typewriter
          options={{
            strings: [
              "MERN Stack Developer",
              "Full Stack Developer",
              "Effective Problem Solver"
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 50,
          }}
        />
      )
}

export default TypeText;