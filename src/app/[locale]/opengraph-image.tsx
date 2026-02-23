import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MEYNG — AI That Matters";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a0f 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Purple glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "999px",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            background: "rgba(139, 92, 246, 0.1)",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "16px", color: "#a78bfa", fontWeight: 600 }}>
            ✦ {isEn ? "AI That Matters" : "L'IA qui compte"}
          </span>
        </div>

        {/* Company name */}
        <div
          style={{
            fontSize: "80px",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: "20px",
            display: "flex",
          }}
        >
          MEYNG
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "#a1a1aa",
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          {isEn
            ? "Building AI for those left behind"
            : "L'IA pour ceux qu'on oublie"}
        </div>

        {/* Product pills */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          {["SangoAI", "Obêtrack", "eNdara", "ConnectZ"].map((name) => (
            <div
              key={name}
              style={{
                padding: "8px 20px",
                borderRadius: "12px",
                border: "1px solid rgba(139, 92, 246, 0.25)",
                background: "rgba(139, 92, 246, 0.08)",
                color: "#c4b5fd",
                fontSize: "16px",
                fontWeight: 500,
                display: "flex",
              }}
            >
              {name}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            fontSize: "16px",
            color: "#71717a",
            display: "flex",
          }}
        >
          meyng.com
        </div>
      </div>
    ),
    { ...size }
  );
}
