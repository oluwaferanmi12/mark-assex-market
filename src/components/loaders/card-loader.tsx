import { Col, Row } from "antd";

export const CardGroupLoader = () => {
  return (
    <div>
      <Row gutter={16} className="mt-8">
        {Array.from({ length: 10 }).map((_, index) => (
          <Col xs={24} lg={12} className="mb-4" key={index}>
            <div
              className={`
                border border-[#BEBEBE59]
                w-full py-6 min-h-[200px] bg-white rounded-2xl p-4 flex items-start gap-4
              `}
            >
              {/* Icon Placeholder */}
              <div className="w-12 h-12 rounded-lg bg-gray-200 animate-pulse"></div>

              {/* Text placeholders */}
              <div className="flex flex-col gap-3 w-full">
                <div className="h-5 w-1/2 rounded-md bg-gray-200 animate-pulse"></div>
                <div className="h-4 w-1/3 rounded-md bg-gray-200 animate-pulse"></div>
                <div className="h-4 w-1/4 rounded-md bg-gray-200 animate-pulse"></div>
                <div className="h-4 w-1/5 rounded-md bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};