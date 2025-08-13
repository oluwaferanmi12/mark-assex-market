import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

export const Spinner = () => {
  return (
    <div className="my-3">
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 36, color: "#007BFF" }} spin />
        }
      />
    </div>
  );
};
