import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Synapse Play | Streaming Catalog",
  description: "Streaming Catalog Server-Driven UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
