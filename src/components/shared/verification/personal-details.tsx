import { SettingsInput } from "@/components/ui/inputs/settings-input";
import { VerificationIdtype } from "@/interfaces/ui-interfac";
import { Col, Row } from "antd";
import { ReactNode } from "react";
import arrowRight from "@/assets/svgs/chevron-right-white.svg";
import { Button } from "@/components/ui/buttons/button";

export const VerifyPersonalDetails = ({
  id,
  resolveNextStatus,
}: {
  id: VerificationIdtype;
  resolveNextStatus: (val: VerificationIdtype) => void;
}) => {
  return (
    <div className="w-full bg-white rounded-lg p-4">
      <Row gutter={36}>
        <ColWrapper>
          <SettingsInput
            placeholder="Blaise"
            label="First Name"
            readOnly={false}
          />
        </ColWrapper>
        <ColWrapper>
          <SettingsInput
            placeholder="Blaise"
            label="Middle Name(Optional)"
            readOnly={false}
          />
        </ColWrapper>
        <ColWrapper>
          <SettingsInput
            placeholder="Oliver"
            label="Last Name"
            readOnly={false}
          />
        </ColWrapper>
        <ColWrapper>
          <SettingsInput
            placeholder="06/11/1990"
            label="Date of Birth"
            readOnly={false}
          />
        </ColWrapper>
        <ColWrapper>
          <SettingsInput placeholder="Male" label="Gender" readOnly={false} />
        </ColWrapper>
        <ColWrapper>
          <SettingsInput
            placeholder="Nigeria"
            label="Country"
            readOnly={false}
          />
        </ColWrapper>{" "}
        <ColWrapper>
          <SettingsInput
            placeholder="Lagos"
            label="State/Province"
            readOnly={false}
          />
        </ColWrapper>
        <ColWrapper>
          <SettingsInput placeholder="Epe" label="City" readOnly={false} />
        </ColWrapper>
        <ColWrapper>
          <SettingsInput
            placeholder="No 132 High Str Ikeja"
            label="Residential Address"
            readOnly={false}
          />
        </ColWrapper>
        <ColWrapper>
          <SettingsInput
            placeholder="2200002"
            label="Postal Code"
            readOnly={false}
          />
        </ColWrapper>
      </Row>
      <div className="flex justify-end mt-4">
        <Button
          loading={false}
          action={() => {
            resolveNextStatus("personal-info")
          }}
          text="Proceed"
          variant="green-bg"
          icon={arrowRight}
          iconPosition="right"
        />
      </div>
    </div>
  );
};

const ColWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Col className="mb-4" xs={24} lg={12}>
      {children}
    </Col>
  );
};
