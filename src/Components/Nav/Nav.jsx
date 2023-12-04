import React from "react";

import { addDoc, collection } from "@firebase/firestore";
import { firebase } from "../../../firebase";

const Nav = () => {
  const ref = collection(firebase, "navBar");

  const handleClick =async (e) => {
    const navBarToAppend = document.getElementById("navbar");

    const componentFile = navBarToAppend.innerHTML;
    const a = document.createElement("a");
    a.href = componentFile;
    a.download = "nav.html";
    // a.click();

    

    console.log(componentFile);
  };
  return (
    <div className=" d-none  relative  ">
      <div onClick={handleClick} className=" absolute p-2 top-0 right-0  ">
        Download
      </div>

      <div id="navbar"></div>
    </div>
  );
};

export default Nav;
