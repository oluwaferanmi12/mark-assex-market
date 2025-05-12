import { DashboardSideNav } from "@/components/ui/navbar/dashboard-side-nav";
import { DashboardTopNav } from "@/components/ui/navbar/dashboard-top-nav";
import { Col, Row } from "antd";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#FAFAFA] w-full h-full">
      <Row>
        <Col xs={4}>
          <DashboardSideNav />
        </Col>
        <Col
          xs={20}
          className="relative pt-24  h-screen min-h-screen max-h-screen overflow-hidden"
        >
          <div className="h-full overflow-y-scroll hide-scrollbar">
            <DashboardTopNav />
            <div className=" px-8">{children}</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
