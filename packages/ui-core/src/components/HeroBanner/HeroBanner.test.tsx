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
        actionUrl="/live/1"
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
});
