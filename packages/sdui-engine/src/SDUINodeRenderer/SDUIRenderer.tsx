import React, { Component, ErrorInfo, ReactNode } from "react";
import { SDUINode } from "../schema";
import { useSDUIRegistry, FallbackUnknownNode } from "../registry";
import { ErrorBoundaryProps, ErrorBoundaryState } from "./types";

export class NodeErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn(
      `[SDUI ErrorBoundary] Failure in node ${this.props.nodeId} (${this.props.nodeType}):`,
      error,
      errorInfo,
    );
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export const SDUINodeRenderer: React.FC<{ node: SDUINode }> = ({ node }) => {
  const registry = useSDUIRegistry();
  const ComponentToRender = registry[node.type];

  const renderedChildren =
    node.children && node.children.length > 0
      ? node.children.map((childNode: SDUINode) => (
          <SDUINodeRenderer key={childNode.id} node={childNode} />
        ))
      : null;

  if (!ComponentToRender) {
    return <FallbackUnknownNode type={node.type} id={node.id} />;
  }

  return (
    <NodeErrorBoundary nodeId={node.id} nodeType={node.type}>
      <ComponentToRender {...node.props} id={node.id}>
        {renderedChildren}
      </ComponentToRender>
    </NodeErrorBoundary>
  );
};