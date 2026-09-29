export function getSafeReturnUrl(
  returnTo: string | null | undefined,
  fallback = "/dashboard",
): string {
  if (
    !returnTo ||
    !returnTo.startsWith("/") ||
    returnTo.startsWith("//") ||
    returnTo.includes("\\") ||
    /[\u0000-\u001f]/.test(returnTo)
  ) {
    return fallback;
  }

  try {
    const parsed = new URL(returnTo, "https://novasaas.local");
    if (parsed.origin !== "https://novasaas.local") return fallback;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}
