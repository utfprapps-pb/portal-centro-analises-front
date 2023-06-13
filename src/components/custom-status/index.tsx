import React from "react";
import styles from "./styles.module.scss";

interface CustomStatusProps {
  text: string;
  textColor: string;
  backgroundColor: string;
  padding: string;
  letterSpacing: string;
  fontSize: string;
  fontWeight: string;
  width: string;
}

export function CustomStatus({
  text,
  textColor,
  backgroundColor,
  padding,
  letterSpacing,
  fontSize,
  fontWeight,
  width,
  ...rest
}: CustomStatusProps) {

  let linkStyle;

    linkStyle = {
      color: textColor,
      backgroundColor: backgroundColor,
      padding: padding,
      fontSize: fontSize,
      letterSpacing: letterSpacing,
      fontWeight: fontWeight,
      width: width,
    };

  return (
    <div
      className={styles.container}
      style={linkStyle}
      {...rest}
    >
      {text}
    </div>
  );
}