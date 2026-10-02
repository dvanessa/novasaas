import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#4f46e5",
        borderRadius: 14,
        color: "#f8fafc",
        display: "flex",
        fontSize: 36,
        fontWeight: 800,
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      N
    </div>,
    size,
  );
}
