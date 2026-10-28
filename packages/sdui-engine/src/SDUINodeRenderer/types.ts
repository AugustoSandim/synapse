import { ReactNode } from "react";

export interface ErrorBoundaryProps {
  nodeId: string;
  nodeType: string;
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
