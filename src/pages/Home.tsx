import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Container } from "@material-ui/core";
import { carousel_src } from "../dummy";

const Home = () => {
  return (
    <Container>
      <Carousel>
        {carousel_src.map((src, i) => (
          <Paper key={i}>
            <img src={src} style={{ maxWidth: "100%" }} />
          </Paper>
        ))}
      </Carousel>
    </Container>
  );
};

export default Home;
