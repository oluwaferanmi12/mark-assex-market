import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "sonner";
import QueryProvider from "@/react-query/query-provider";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ReduxWrapper } from "@/redux/redux-wrapper";
import { useTokenRefresher } from "@/hooks/custom/token-refresher";
import { ClientWrapper } from "@/components/client/client-wrapper";

export const metadata: Metadata = {
  title: "ASSEXMARKETS",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // prevents pinch & focus zoom
  viewportFit: "cover", // optional; nice for iOS safe areas
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
            <QueryProvider>
              <ClientWrapper>{children}</ClientWrapper>
            </QueryProvider>
          </AntdRegistry>
          <Toaster richColors position="top-right" />
        </ReduxWrapper>
      </body>
    </html>
  );
}
