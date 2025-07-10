import { DashboardSideNav } from "@/components/ui/navbar/dashboard-side-nav";
import { DashboardTopNav } from "@/components/ui/navbar/dashboard-top-nav";
import { Col, Row } from "antd";
import { ReactNode, Suspense } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
