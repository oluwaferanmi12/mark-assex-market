import { SettingsInput } from "@/components/ui/inputs/settings-input";
import { VerificationIdtype } from "@/interfaces/ui-interfac";
import { Col, Row } from "antd";
import { ReactNode, useEffect, useState } from "react";
import arrowRight from "@/assets/svgs/chevron-right-white.svg";
import { Button } from "@/components/ui/buttons/button";
import { useGetUserProfile, useSaveProfile } from "@/hooks/queries/useSettings";
import { UserProfileInterface } from "@/types";
import moment from "moment";
import { GSelect } from "@/components/ui/inputs/general-select";
import { countryList } from "@/utils/country-list";
import { toast } from "sonner";

export const VerifyPersonalDetails = ({
  id,
  resolveNextStatus,
}: {
  id: VerificationIdtype;
  resolveNextStatus: (val: VerificationIdtype) => void;
}) => {
  const { data: userDetails } = useGetUserProfile();
  const [readOnly, setReadonly] = useState(false);
  const { mutate, isPending } = useSaveProfile((data) => {
    resolveNextStatus("personal-info");
  });
  const [userPayload, setUserPayload] = useState<UserProfileInterface>({
    id: "",
    firstName: "",
    lastName: "",
    gender: "MALE",
    email: "",
    middleName: "",
    dateOfBirth: "",
    phone: "",
    country: "",
    nationality: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    picture: "",
    walletBalance: 0,
    profileStatus: "ACTIVE",
    createdAt: "",
    updatedAt: "",
    phoneCode: "",
  });

  const handleUpdateUser = () => {
    const {
      firstName,
      lastName,
      middleName,
      gender,
      dateOfBirth,
      address,
      city,
      state,
      zip,
      country,
    } = userPayload;
    mutate({
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      middleName: middleName ?? "",
      gender: gender ?? "",
      dateOfBirth: dateOfBirth ?? "",
      address: address ?? "",
      city: city ?? "",
      state: state ?? "",
      zip: zip ?? "",
      country: country ?? "",
    });
  };
  useEffect(() => {
    if (userDetails) {
      setUserPayload(userDetails);
    }
  }, [userDetails]);
  return (
    <div className="w-full bg-white rounded-lg p-4">
      <Row gutter={36}>
        <ColWrapper>
          <SettingsInput
            placeholder="Blaise"
            label="First Name"
            value={userPayload?.firstName ?? ""}
            setValue={(e) => {
              setUserPayload((prev) => ({ ...prev, firstName: e }));
            }}
            readOnly={readOnly}
          />
        </ColWrapper>
        <ColWrapper>
          <SettingsInput
            placeholder="Blaise"
            label="Middle Name(Optional)"
            value={userPayload?.middleName ?? ""}
            setValue={(e) => {
              setUserPayload((prev) => ({ ...prev, middleName: e }));
            }}
            readOnly={readOnly}
          />
        </ColWrapper>
        <ColWrapper>
          <SettingsInput
            placeholder="Oliver"
            label="Last Name"
            value={userPayload?.lastName ?? ""}
            setValue={(e) => {
              setUserPayload((prev) => ({ ...prev, lastName: e }));
            }}
            readOnly={readOnly}
          />
        </ColWrapper>
        <ColWrapper>
          <SettingsInput
            value={moment(userDetails?.dateOfBirth).format("YYYY-MM-DD") ?? ""}
            setValue={(name, val) => {
              setUserPayload((prev) => ({ ...prev, dateOfBirth: name }));
            }}
            label="Date of Birth"
            type="date"
            readOnly={readOnly}
          />
        </ColWrapper>
        <ColWrapper>
          <GSelect
            label="Gender"
            setInputValue={(e) => {
              setUserPayload((prev) => ({ ...prev, gender: e }));
            }}
            inputValue={userDetails?.gender!}
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </GSelect>
        </ColWrapper>
        <ColWrapper>
          <GSelect
            inputValue={userDetails?.country!}
            label="Country"
            setInputValue={(e) =>
              setUserPayload((prev) => ({ ...prev, country: e }))
            }
          >
            <option>Select country</option>
            {countryList.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </GSelect>
        </ColWrapper>{" "}
        <ColWrapper>
          <SettingsInput
            value={userPayload?.state ?? ""}
            setValue={(name, val) => {
              setUserPayload((prev) => ({ ...prev, state: name }));
            }}
            readOnly={readOnly}
            label="State/Province"
          />
        </ColWrapper>
        <ColWrapper>
          <SettingsInput
            value={userPayload?.city ?? ""}
            setValue={(name, val) => {
              setUserPayload((prev) => ({ ...prev, city: name }));
            }}
            readOnly={readOnly}
            label="City"
          />
        </ColWrapper>
        <ColWrapper>
          <SettingsInput
            value={userPayload?.address ?? ""}
            setValue={(name, val) => {
              setUserPayload((prev) => ({ ...prev, address: name }));
            }}
            readOnly={readOnly}
            label="Address"
          />
        </ColWrapper>
        <ColWrapper>
          <SettingsInput
            value={userPayload?.zip ?? ""}
            setValue={(name, val) => {
              setUserPayload((prev) => ({ ...prev, zip: name }));
            }}
            readOnly={readOnly}
            label="Postal Code"
          />
        </ColWrapper>
      </Row>
      <div className="flex justify-end mt-4">
        <Button
          loading={isPending}
          action={() => {
            handleUpdateUser();
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
