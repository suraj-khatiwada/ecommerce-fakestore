import React from "react";
import { Warning } from "../../assets/images";
import { Button } from "reactstrap";
import "./index.scss";
function ErrorComponent({ reloadFunction }) {
  const handleReload = () => {
    reloadFunction();
  };
  return (
    <div className="error-component">
      <div className="error-component_icon">
        <img src={Warning} />
        <p>Server Error. Please Try Again.</p>
      </div>
      <div className="error-component_reload">
        <Button onClick={() => handleReload()}>Reload</Button>
      </div>
    </div>
  );
}

export default ErrorComponent;
