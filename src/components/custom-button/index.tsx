import React, { ButtonHTMLAttributes, useState } from "react";
import styles from "./styles.module.scss";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  textColor: string;
  backgroundColor: string;
  textColorHover: string;
  backgroundColorHover: string;
  padding: string;
  letterSpacing: string;
  fontSize: string;
  fontWeight: string;
  onClick?: () => void;
  type: "submit" | "reset" | "button";
}

export function CustomButton({
  text,
  textColor,
  backgroundColor,
  textColorHover,
  backgroundColorHover,
  padding,
  letterSpacing,
  fontSize,
  fontWeight,
  onClick = () => null,
  type,
  ...rest
}: CustomButtonProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  let linkStyle;

  if (isHovering) {
    linkStyle = {
      color: textColor,
      backgroundColor: backgroundColorHover,
      padding: padding,
      fontSize: fontSize,
      letterSpacing: letterSpacing,
      fontWeight: fontWeight,
    };
  } else {
    linkStyle = {
      color: textColorHover,
      backgroundColor: backgroundColor,
      padding: padding,
      fontSize: fontSize,
      letterSpacing: letterSpacing,
      fontWeight: fontWeight,
    };
  }

  return (
    <button
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={onClick}
      className={styles.button_container}
      style={linkStyle}
      type={type}
      {...rest}
    >
      {text}
    </button>
  );
}