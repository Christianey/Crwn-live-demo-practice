import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({
  children,
  isGoogleSignedIn,
  inverted,
  ...otherProps
}) => (
  <button
    className={`${isGoogleSignedIn ? "google-sign-in" : ""}
        ${inverted ? "inverted" : ""}
        custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
