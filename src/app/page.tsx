import { PsynaApp } from "@/components/PsynaApp";

export default function Home() {
  return (
    <>
      <noscript>
        <p style={{ padding: 16, background: "#fff", textAlign: "center" }}>
          The interactive 3D viewer needs JavaScript. Every psychological trait and its sources are still available
          as text further down this page.
        </p>
      </noscript>
      <PsynaApp />
    </>
  );
}
