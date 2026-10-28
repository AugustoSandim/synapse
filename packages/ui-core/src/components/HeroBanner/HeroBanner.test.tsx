import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroBanner } from "./HeroBanner";

describe("HeroBanner Component", () => {
  it("should render title and badge with correct semantics", () => {
    render(
      <HeroBanner
        title="World Cup Final Streaming"
        badge="LIVE"
        action={{ url: "/live/1" }}
      />,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "World Cup Final Streaming",
    );
    expect(screen.getByText("LIVE")).toBeDefined();
    expect(
      screen.getByRole("link", { name: "Watch Now" }),
    ).toHaveAttribute("href", "/live/1");
  });

  it("should render a custom action label", () => {
    render(
      <HeroBanner
        title="Match Highlights"
        action={{ url: "https://example.com/watch", label: "Play" }}
      />,
    );

    expect(screen.getByRole("link", { name: "Play" })).toHaveAttribute(
      "href",
      "https://example.com/watch",
    );
  });

  it("should not render a CTA when action is missing", () => {
    render(<HeroBanner title="No CTA" />);

    expect(screen.queryByRole("link")).toBeNull();
  });

  it("should reject unsafe action URLs", () => {
    const { rerender } = render(
      <HeroBanner
        title="Unsafe"
        action={{ url: "javascript:alert(1)" }}
      />,
    );
    expect(screen.queryByRole("link")).toBeNull();

    rerender(
      <HeroBanner title="Unsafe" action={{ url: "data:text/html,hi" }} />,
    );
    expect(screen.queryByRole("link")).toBeNull();
  });
});
