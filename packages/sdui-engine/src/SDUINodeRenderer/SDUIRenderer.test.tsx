import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SDUIProvider } from "../registry";
import { SDUINodeRenderer } from "./SDUIRenderer";
import { SDUINode } from "../schema";

describe("SDUIRenderer Engine", () => {
  const Container: React.FC<{ children?: React.ReactNode }> = ({
    children,
  }) => <div data-testid="container">{children}</div>;

  const Banner: React.FC<{ title: string }> = ({ title }) => (
    <h1 data-testid="banner">{title}</h1>
  );

  const BrokenComponent: React.FC = () => {
    throw new Error("Fatal runtime failure");
  };

  const registry = {
    Container,
    Banner,
    BrokenComponent,
  };

  it("should render nested nodes recursively", () => {
    const mockTree: SDUINode = {
      id: "root-1",
      type: "Container",
      props: {},
      children: [
        {
          id: "banner-1",
          type: "Banner",
          props: { title: "Synapse Live Streaming" },
          children: [],
        },
      ],
    };

    render(
      <SDUIProvider registry={registry}>
        <SDUINodeRenderer node={mockTree} />
      </SDUIProvider>,
    );

    expect(screen.getByTestId("container")).toBeDefined();
    expect(screen.getByText("Synapse Live Streaming")).toBeDefined();
  });

  it("should isolate failure with ErrorBoundary without breaking the rest of the screen", () => {
    // Silence console.warn for the test
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const mockTree: SDUINode = {
      id: "root-1",
      type: "Container",
      props: {},
      children: [
        { id: "broken-1", type: "BrokenComponent", props: {}, children: [] },
        {
          id: "banner-2",
          type: "Banner",
          props: { title: "Resilient Banner" },
          children: [],
        },
      ],
    };

    render(
      <SDUIProvider registry={registry}>
        <SDUINodeRenderer node={mockTree} />
      </SDUIProvider>,
    );

    // The resilient banner continues on the screen even with the broken neighbor node
    expect(screen.getByText("Resilient Banner")).toBeDefined();
  });
});
