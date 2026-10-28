import { ReactNode } from "react";

export interface ContainerProps {
  id?: string;
  direction?: "vertical" | "horizontal";
  spacing?: "small" | "medium" | "large";
  children?: ReactNode;
}
