"use client";

import React from "react";
import styles from "./Container.module.css";
import { ContainerProps } from "./types";

export const Container: React.FC<ContainerProps> = ({
  id,
  direction = "vertical",
  spacing = "medium",
  children,
}) => {
  const directionClass =
    direction === "horizontal" ? styles.horizontal : styles.vertical;

  const spacingClass =
    spacing === "small"
      ? styles.spacingSmall
      : spacing === "large"
        ? styles.spacingLarge
        : styles.spacingMedium;

  return (
    <section
      id={id}
      className={`${styles.container} ${directionClass} ${spacingClass}`}
    >
      {children}
    </section>
  );
};
