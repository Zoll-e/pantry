import React, { Fragment } from "react";
import groceries from "../../groceries.jpeg";

import groceriesR from "../../groceriesR.jpeg";

export const Groceries = () => {
  return (
    <Fragment>
      <img src={groceries}  className="rounded h-100 hori h-100"style={{position:"absolute",right:"0px",left:"0px",width:"100%",bottom:"0px"}} alt=""></img>
      <img src={groceriesR}  className="rounded h-100 verti"style={{position:"absoulte",width:"100%",bottom:"0px"}} alt=""></img>

    </Fragment>
  );
};
