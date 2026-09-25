import { navigation, type NavigationItem } from "@/config/navigation";
import { hasPermission } from "@/lib/permissions";
import type { DemoUser } from "@/types/auth";

function filterItems(
  items: readonly NavigationItem[],
  user: DemoUser | null,
): NavigationItem[] {
  return items.flatMap((item) => {
    const children = item.children
      ? filterItems(item.children, user)
      : undefined;
    const isGroup = Boolean(item.children);
    const visible = isGroup
      ? Boolean(children?.length)
      : item.permission
        ? hasPermission(user, item.permission)
        : Boolean(user);

    if (!visible) return [];
    return [{ ...item, ...(children ? { children } : {}) }];
  });
}

export function getVisibleNavigation(user: DemoUser | null) {
  return filterItems(navigation, user);
}

export function getVisibleNavigationItems(user: DemoUser | null) {
  return getVisibleNavigation(user).flatMap((item) => [
    ...(item.children ? [] : [item]),
    ...(item.children ?? []),
  ]);
}
