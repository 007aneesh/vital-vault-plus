import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vital Vault",
  
  description:
    "Vital Vault, where healthcare data management meets innovation. Vital Vault is more than just a healthcare data system; it's a solution designed to streamline the complexities of healthcare data, making it secure, accessible, and efficient.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoMono.className} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
