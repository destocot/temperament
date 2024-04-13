import { expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

const mocks = vi.hoisted(() => {
  return {
    useKindeBrowserClient: vi.fn(),
  };
});

vi.mock("@kinde-oss/kinde-auth-nextjs", async (importOriginal) => {
  const mod =
    await importOriginal<typeof import("@kinde-oss/kinde-auth-nextjs")>();
  return {
    ...mod,
    useKindeBrowserClient: mocks.useKindeBrowserClient,
  };
});

describe("Home Page", () => {
  it("Page Renders", () => {
    mocks.useKindeBrowserClient.mockReturnValue({ isAuthenticated: true });

    render(<Home />);
    expect(screen.getByText(/temperament/i)).toBeTruthy();

    const link = screen.getByRole("link", { name: /get started/i });
    expect(link.getAttribute("href")).toBe("/journal");
  });

  it("Login Link Renders", () => {
    mocks.useKindeBrowserClient.mockReturnValue({ isAuthenticated: false });

    render(<Home />);
    expect(screen.getByText(/temperament/i)).toBeTruthy();

    const link = screen.getByRole("link", { name: /get started/i });
    expect(link.getAttribute("href")).not.toBe("/journal");
  });
});
