import { ImageResponse } from "next/og";

// next/og (@vercel/og) targets the edge runtime; this also avoids a Windows
// Node-runtime font-path resolution error during static prerender.
export const runtime = "edge";

// Branded social share image (1200×630), generated at build/request time —
// "The Scholar" palette: Harbor Navy ground, brass accent, Paper text.
export const alt =
  "Eduhub — school services in Istanbul. Activities, School Services, and Graduation.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "90px",
          background: "#14355A",
          color: "#F7F5EF",
          fontFamily: "serif",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            fontSize: 26,
            letterSpacing: "0.2em",
            color: "#D9A441",
            fontFamily: "sans-serif",
          }}
        >
          <span>SCHOOL SERVICES</span>
          <span>·</span>
          <span>ISTANBUL</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div style={{ fontSize: 92, fontWeight: 700 }}>Eduhub</div>
          <div style={{ fontSize: 48, lineHeight: 1.12, maxWidth: 920, color: "#DCEBF7" }}>
            Every school event, beautifully handled.
          </div>
          <div style={{ display: "flex", height: 8, width: 240, background: "#D9A441", borderRadius: 999 }} />
        </div>

        <div style={{ display: "flex", gap: "18px", fontSize: 30, fontFamily: "sans-serif", color: "#DCEBF7" }}>
          <span>Activities</span>
          <span style={{ color: "#D9A441" }}>·</span>
          <span>School Services</span>
          <span style={{ color: "#D9A441" }}>·</span>
          <span>Graduation</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
