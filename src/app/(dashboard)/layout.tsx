import { AuthGuard } from "@/components/guard/auth-guard";
import { DashboardSideNav } from "@/components/ui/navbar/dashboard-side-nav";
import { DashboardTopNav } from "@/components/ui/navbar/dashboard-top-nav";
import { Col, Row } from "antd";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#FAFAFA] w-full h-full">
      <Row>
        <Col className="col-responsive" lg={4} md={6} xs={4}>
          <DashboardSideNav />
        </Col>
        <Col
          lg={20}
          md={24}
          xs={24}
          className="relative lg:pt-24 pt-20  h-screen min-h-screen max-h-screen overflow-hidden"
        >
          <div className="h-full overflow-y-scroll hide-scrollbar">
            <DashboardTopNav />
            <div className="px-4 lg:px-8 h-full">{children}</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
