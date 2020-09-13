import React from "react";

const CardFooter = () => {
  return (
    <div className="row justify-content" >
      <div className="col-4" style={{alignItems:"center",textAlign:"center"}}>
        <p><i class="fas fa-clock"></i></p>
        <p> 2:55</p>
      </div>
      <div className="col-4" style={{alignItems:"center",textAlign:"center"}}>
        <p><i class="fas fa-heart"></i></p>
        <p> 55</p>
      </div>
      <div className="col-4" style={{alignItems:"center",textAlign:"center"}}>
        <p><i class="fas fa-dollar-sign"></i></p>
        <p> $$$</p>
      </div>
      
     
    </div>
  );
};

export default CardFooter;
