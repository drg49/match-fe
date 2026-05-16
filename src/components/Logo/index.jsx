import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlateWheat } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";

/**
 * The Table Top logo, with icon and text.
 */
const Logo = ({ size = "5x" }) => {
  return (
    <div className="table-top-logo no-select">
      <span>
        <FontAwesomeIcon icon={faPlateWheat} size={size} color="#a90409" />
      </span>
      <h1>Table Top</h1>
    </div>
  );
};

export default Logo;
