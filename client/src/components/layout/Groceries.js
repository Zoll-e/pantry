import React, { Fragment } from "react";
import groceries from "../../groceries.jpeg";

import groceriesR from "../../groceriesR.jpeg";

export const Groceries = () => {
  return (
    <Fragment>
      <img src={groceries}  className="rounded w-50  h-100 hori"style={{position:"absolute",right:"0px",width:"100%",bottom:"0px"}} alt=""></img>
      <img src={groceriesR}  className="rounded w-100 verti"style={{position:"absolute",bottom:"0px",right:"0px"}} alt=""></img>

    </Fragment>
  );
};
