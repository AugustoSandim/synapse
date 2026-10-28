import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SDUIProvider } from "../registry";
import { SDUINodeRenderer } from "./SDUIRenderer";
import { SDUINode, SDUINodeSchema } from "../schema";

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

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

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

    expect(screen.getByText("Resilient Banner")).toBeDefined();
  });

  it("should show fallback for unregistered type in development", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const mockTree: SDUINode = {
      id: "unknown-1",
      type: "UnregisteredWidget",
      props: {},
      children: [],
    };

    render(
      <SDUIProvider registry={registry}>
        <SDUINodeRenderer node={mockTree} />
      </SDUIProvider>,
    );

    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText(/UnregisteredWidget/)).toBeDefined();
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("UnregisteredWidget"),
    );
  });

  it("should still render children of an unregistered wrapper", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const mockTree: SDUINode = {
      id: "unknown-wrapper",
      type: "MissingLayout",
      props: {},
      children: [
        {
          id: "banner-3",
          type: "Banner",
          props: { title: "Child Survives" },
          children: [],
        },
      ],
    };

    render(
      <SDUIProvider registry={registry}>
        <SDUINodeRenderer node={mockTree} />
      </SDUIProvider>,
    );

    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText("Child Survives")).toBeDefined();
  });

  it("should not treat inherited property names as registered components", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const mockTree: SDUINode = {
      id: "proto-1",
      type: "toString",
      props: {},
      children: [],
    };

    render(
      <SDUIProvider registry={registry}>
        <SDUINodeRenderer node={mockTree} />
      </SDUIProvider>,
    );

    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText("toString")).toBeDefined();
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("toString"),
    );
  });

  it("should recover ErrorBoundary when node type or props change", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const brokenNode: SDUINode = {
      id: "node-1",
      type: "BrokenComponent",
      props: {},
      children: [],
    };

    const { rerender } = render(
      <SDUIProvider registry={registry}>
        <SDUINodeRenderer node={brokenNode} />
      </SDUIProvider>,
    );

    expect(screen.queryByTestId("banner")).toBeNull();

    const fixedNode: SDUINode = {
      id: "node-1",
      type: "Banner",
      props: { title: "Recovered Banner" },
      children: [],
    };

    rerender(
      <SDUIProvider registry={registry}>
        <SDUINodeRenderer node={fixedNode} />
      </SDUIProvider>,
    );

    expect(screen.getByText("Recovered Banner")).toBeDefined();
  });

  it("should reject trees with duplicate sibling IDs at parse time", () => {
    const result = SDUINodeSchema.safeParse({
      id: "root",
      type: "Container",
      props: {},
      children: [
        { id: "dup", type: "Banner", props: { title: "A" }, children: [] },
        { id: "dup", type: "Banner", props: { title: "B" }, children: [] },
      ],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toContain("Sibling node IDs must be unique");
    }
  });
});
