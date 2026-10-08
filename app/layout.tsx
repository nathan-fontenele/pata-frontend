import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pata — gestão para clínicas veterinárias",
  description: "Organize a equipe e os atendimentos da sua clínica veterinária em um só lugar.",
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
