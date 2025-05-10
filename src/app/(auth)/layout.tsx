import { AuthNav } from "@/components/ui/navbar/auth-nav";
import { Col, Row } from "antd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Row className="bg-[#FAFAFA]" align={"middle"} justify={"center"}>
      <Col xs={22}>
        <AuthNav />
        <div className="flex  items-center justify-center min-h-screen h-screen">
          <Row className="w-full" justify={"center"}>
            <Col xl={8} lg={10} md={12} xs={22}>
              <div className="bg-white p-4 w-full border border-[#BEBEBE80] rounded-2xl">
                {children}
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
}
