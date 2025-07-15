import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "sonner";
import QueryProvider from "@/react-query/query-provider";

export const metadata: Metadata = {
  title: "ASSEXMARKETS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-work-sans-regular antialiased`}>
        <AntdRegistry>
          <QueryProvider>{children}</QueryProvider>
        </AntdRegistry>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
