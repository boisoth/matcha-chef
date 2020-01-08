import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large matcha">Matcha Chef</h1>
          <p className="lead">
            Create a profile/portfolio, share posts and get help from other
            chefs
          </p>
          <div className="buttons">
            <Link to="/register" className="">
              Sign Up
            </Link>
            <Link to="/login" className="">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
