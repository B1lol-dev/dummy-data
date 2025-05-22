import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section>
      <h1>404</h1>
      <NavLink to="/">Home</NavLink>
    </section>
  );
};

export default React.memo(ErrorPage);
