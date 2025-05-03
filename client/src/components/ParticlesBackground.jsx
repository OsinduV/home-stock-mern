import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#f0f0f0", // Light gray background (can be changed)
        },
        particles: {
          number: {
            value: 80, // Number of particles
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#3b82f6", // Blue particles (change as needed)
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: false,
          },
          size: {
            value: 3,
            random: true,
          },
          move: {
            enable: true,
            speed: 2, // Speed of particles
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
