'use client'

import { AuthNav } from "@/components/ui/navbar/auth-nav";
import { Col, Row } from "antd";
import { motion } from "framer-motion";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Row className="bg-[#FAFAFA] min-h-full w-full lg:py-8 " align={"middle"} justify={"center"}>
      <Col xs={22}>
        <AuthNav />
        <div className="flex  items-center justify-center min-h-screen h-full">
          <Row className="w-full" justify={"center"}>
            <Col xl={10} xxl={8} lg={12} md={16} xs={24}>
              <motion.div layout className="lg:bg-white lg:p-4 w-full lg:border lg:border-[#BEBEBE80] rounded-2xl">
                {children}
              </motion.div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
}
