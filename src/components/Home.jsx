import React, { useRef } from "react";
import Hero from "./Hero/Hero";
import Hot from "./Hot/Hot";
import Categories from "./Category/Categories";
import Review from "./Review/Review";
import { Helmet } from "react-helmet";

function Home() {
  const resultRef = useRef(null);

  return (
    <div className="homePage">
      <Helmet>
        <meta charSet="utf-8" />
        <title>IGU - 1500+ AI Tools To Explore All Your Needs! </title>
      </Helmet>
      <Hero resultRef={resultRef} />
      <Hot />
      <Categories ref={resultRef} />
      <Review />
    </div>
  );
}

export default Home;
