import { Col, Row } from "antd";
import Image from "next/image";
import logo from "@/assets/svgs/logo.svg";

export const AuthNav = () => {
  return (
    <div className=" hidden lg:block fixed top-0 left-0 z-40 right-0  w-full p-4">
      <Row>
        <Col xs={22}>
          <Image src={logo} alt="" />
        </Col>
      </Row>
    </div>
  );
};
