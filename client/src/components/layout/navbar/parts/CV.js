import React from "react";
import axios from "axios";

const CV = () => {
  const downloadCV = async lang => {
    try{
    const response = await axios(`/cv/${lang}.pdf`, {
      method: "GET",
      responseType: "blob",
    });
    const file = new Blob([response.data], { type: "application/pdf" });

    const fileURL = URL.createObjectURL(file);

    window.open(fileURL);
  }catch(err){
    console.log(err);
  }
  };

  return (
    <ul>
      <li style={{ margin: "25%" }}>
        Click here to download my CV:{" "}
        <button onClick={e => downloadCV("en")} style={{ cursor: "pointer" }}>
          English
        </button>
        /
        <button onClick={e => downloadCV("hun")} style={{ cursor: "pointer" }}>
          Hungrarian
        </button>
      </li>
    </ul>
  );
};

export default CV;
