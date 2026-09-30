import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NotificationsPreview } from "./notifications-preview";

describe("NotificationsPreview", () => {
  it("associates the unread count with the notification trigger", () => {
    render(<NotificationsPreview />);

    expect(
      screen.getByRole("button", { name: "Notifications, 5 unread" }),
    ).toBeVisible();
    expect(screen.getByText("5")).toHaveAttribute("aria-hidden", "true");
  });

  it("omits the badge and unread description when there are no unread items", () => {
    render(<NotificationsPreview initialUnreadCount={0} />);

    expect(screen.getByRole("button", { name: "Notifications" })).toBeVisible();
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("shows two-digit counts and caps larger badge labels at 99+", () => {
    const { unmount } = render(
      <NotificationsPreview initialUnreadCount={42} />,
    );

    expect(
      screen.getByRole("button", { name: "Notifications, 42 unread" }),
    ).toBeVisible();
    expect(screen.getByText("42")).toBeVisible();

    unmount();
    render(<NotificationsPreview initialUnreadCount={125} />);

    expect(
      screen.getByRole("button", { name: "Notifications, 99+ unread" }),
    ).toBeVisible();
    expect(screen.getByText("99+")).toBeVisible();
  });
});
