import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "pata — cuidado para quem você ama",
  description: "Acompanhe a rotina e a saúde do seu pet em um só lugar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
