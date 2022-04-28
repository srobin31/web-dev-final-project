import React from "react";
import Search from "./search";
import Nav from "./nav";

const Home = () => {
  return (
    <div>
      <Nav active="home" />
      <div className="container">
        <div className="text-center mt-3 mb-5">
          <img
            className="d-inline"
            src="cocktail-clipart.png"
            alt="cocktail-clipart"
            height={150}
          />
          <h1 className="d-inline align-middle">Cocktail Ratings</h1>
          <img
            className="d-inline"
            src="cocktail-clipart.png"
            alt="cocktail-clipart"
            height={150}
            style={{ transform: "scaleX(-1)" }}
          />
        </div>
        <Search />
      </div>
    </div>
  );
};

export default Home;
