import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "sonner";
import QueryProvider from "@/react-query/query-provider";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ReduxWrapper } from "@/redux/redux-wrapper";

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
        <ReduxWrapper>
          <AntdRegistry>
            <QueryProvider>{children}</QueryProvider>
          </AntdRegistry>
          <Toaster richColors position="top-right" />
        </ReduxWrapper>
      </body>
    </html>
  );
}
