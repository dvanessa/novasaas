import { ImageResponse } from "next/og";

export const alt = "NovaSaaS Free — Next.js Admin Dashboard Starter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#020817",
        color: "#e2e8f0",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: 72,
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 34,
            fontWeight: 700,
            gap: 18,
          }}
        >
          <span
            style={{
              alignItems: "center",
              background: "#6366f1",
              borderRadius: 16,
              display: "flex",
              height: 64,
              justifyContent: "center",
              width: 64,
            }}
          >
            N
          </span>
          NovaSaaS Free
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1.08,
            marginTop: 54,
          }}
        >
          Build your SaaS dashboard without starting from zero.
        </div>
        <div style={{ color: "#94a3b8", fontSize: 28, marginTop: 34 }}>
          Next.js · TypeScript · Tailwind CSS
        </div>
      </div>
    </div>,
    size,
  );
}
