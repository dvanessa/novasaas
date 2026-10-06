import { render, screen, waitFor } from "@testing-library/react";
import { StrictMode } from "react";
import { describe, expect, it, vi } from "vitest";

import { KitWaitlistForm } from "./kit-waitlist-form";

const KIT_SCRIPT_URL =
  "https://novasaas-by-code-with-vanessa.kit.com/2ec0df1d60/index.js";

describe("KitWaitlistForm", () => {
  it("loads the configured Kit embed once under React Strict Mode", async () => {
    const createElement = vi.spyOn(document, "createElement");
    const { unmount } = render(
      <StrictMode>
        <KitWaitlistForm />
      </StrictMode>,
    );

    const container = screen.getByTestId("kit-waitlist-form");

    await waitFor(() => {
      expect(container.querySelectorAll("script")).toHaveLength(1);
    });

    try {
      const script = container.querySelector("script");
      expect(script).toHaveAttribute("src", KIT_SCRIPT_URL);
      expect(script).toHaveAttribute("data-uid", "2ec0df1d60");
      expect(script).toHaveProperty("async", true);
      expect(
        createElement.mock.calls.filter(([tagName]) => tagName === "script"),
      ).toHaveLength(1);

      unmount();
      await waitFor(() => {
        expect(
          document.querySelector(`script[src="${KIT_SCRIPT_URL}"]`),
        ).toBeNull();
      });
    } finally {
      unmount();
      createElement.mockRestore();
    }
  });
});
