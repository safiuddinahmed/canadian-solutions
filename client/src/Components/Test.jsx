import React from "react";

import BackdropFilter from "react-backdrop-filter";

const Test = () => {
  return (
    <div className="container-test">
      <BackdropFilter
        className="bluredForm"
        filter={"blur(10px) sepia(50%)"}
        html2canvasOpts={{
          allowTaint: true,
        }}
        onDraw={() => {
          console.log("Rendered !");
        }}
      >
        <form>
          <div className="profilePic">
            <img src="test" alt="me" />
          </div>
          <h4>@tnargib</h4>
          <p>Login</p>
          <hr />
          <p>Password</p>
          <hr />
          <div className="button">Sign in</div>
          <small>Forgot password ?</small>
        </form>
      </BackdropFilter>
    </div>
  );
};

export default Test;
