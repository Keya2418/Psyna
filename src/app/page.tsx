import { MindAtlasApp } from "@/components/MindAtlasApp";

export default function Home() {
  return (
    <>
      <noscript>
        <p style={{ padding: 16, background: "#fff", textAlign: "center" }}>
          The interactive 3D viewer needs JavaScript. All region explanations, lessons, and sources are still available
          as text further down this page.
        </p>
      </noscript>
      <MindAtlasApp />
    </>
  );
}
