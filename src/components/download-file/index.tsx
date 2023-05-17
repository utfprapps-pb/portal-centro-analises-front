import React, { ButtonHTMLAttributes, useState } from "react";
import styles from "./styles.module.scss";
import { CloudDownload } from '@material-ui/icons'


interface DownloadFileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  url: string;
  onClick?: () => void;
  type: "submit" | "reset" | "button";
}

export function DownloadFile({
  url,
  onClick = () => null,
  type,
  ...rest
}: DownloadFileProps) {

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <button
      className={styles.container}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={onClick}
      type={type}
      {...rest}
    >
      <CloudDownload style={{ color: '#3f51b5' }} />
      <h2 className={styles.text}>Baixar relatório</h2>
    </button>
  );
}