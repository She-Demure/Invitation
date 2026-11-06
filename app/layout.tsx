import type { Metadata } from "next";
import "../src/index.css";

export const metadata: Metadata = {
  title: "The Baptism of Jose Ulysis Tano Duenas Jr.",
  description: "Join us to celebrate the baptism of Jose Ulysis Tano Duenas Jr.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
