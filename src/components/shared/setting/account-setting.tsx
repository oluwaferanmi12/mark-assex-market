"use client";
import placeholderImage from "@/assets/svgs/settings-image-placeholder.svg";
import Image from "next/image";
import { Button } from "@/components/ui/buttons/button";
import uploadGreenIcon from "@/assets/svgs/upload-icon-green.svg";
import trashIconRed from "@/assets/svgs/trash-icon-red.svg";
import { useEffect, useRef, useState } from "react";
import { SettingsInput } from "@/components/ui/inputs/settings-input";
import { Col, Row } from "antd";
import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import { ModalHeader } from "@/components/shared/modal-wrapper/modal-header";
import { ModalBody } from "@/components/shared/modal-wrapper/modal-body";
import { ModalFooter } from "@/components/shared/modal-wrapper/modal-footer";
import cloudIcon from "@/assets/svgs/upload-cloud-icon-green.svg";
import deleteIcon from "@/assets/svgs/border-bin-icon.svg";
import {
  useGetUserProfile,
  useManageProfilePicture,
  useSaveProfile,
} from "@/hooks/queries/useSettings";
import { UserProfileInterface } from "@/types";
import { toast } from "sonner";
import { GSelect } from "@/components/ui/inputs/general-select";
import moment from "moment";
import { countryList } from "@/utils/country-list";
import userRoundPen from "@/assets/svgs/user-round-pen.svg";
import { Avatar } from "../avatar/avatar";
import { useQueryClient } from "@tanstack/react-query";

export const AccountSetting = () => {
  const queryClient = useQueryClient();
  const [readOnly, setReadOnly] = useState(true);
  const [showUploadModal, setShowUploadmodal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { mutate, isPending } = useSaveProfile((data) => {
    toast.success("Profile Updated successfully");
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // for <img src=...>
  const [dataUrl, setDataUrl] = useState<string | null>(null); // full data URL
  const [isUploading, setIsUploading] = useState(false);
  const objectUrlRef = useRef<string | null>(null);
  const mutateProfilePicture = useManageProfilePicture(() => {
    toast.success("Profile updated");
    queryClient.invalidateQueries({ queryKey: ["user-profile"] });
  });

  const [userData, setUserData] = useState<UserProfileInterface>({
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
  const { data, isSuccess } = useGetUserProfile();

  function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1]; // remove "data:image/png;base64,"
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const onPick: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      e.target.value = "";
      return;
    }

    // Preview with object URL (more efficient than base64 for <img>)
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = URL.createObjectURL(file);
    setPreviewUrl(objectUrlRef.current);

    // Convert to Base64 (Data URL) for API
    const data = await fileToDataUrl(file);
    setDataUrl(data);

    // allow re-selecting the same file again
    e.target.value = "";
  };

  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        ...data,
        dateOfBirth: moment(data.dateOfBirth).format("YYYY-MM-DD"),
      });
      if (data.picture) {
        setPreviewUrl(data.picture);
      }
    }
  }, [data, isSuccess]);

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
    } = userData;
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
  return (
    <>
      <ModalContainer
        greyBg
        active={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false);
        }}
      >
        <ModalHeader
          headText={deleteIcon}
          handleCancel={() => {
            setShowDeleteModal(false);
          }}
          iconType
        />
        <ModalBody>
          <div>
            <p className="text-[#202020] font-work-sans-medium text-lg">
              Remove Profile Picture
            </p>
            <p className="mt-1 text-[#707070] font-work-sans-regular">
              Removing your profile picture will revert it to the default
              avatar. You can upload a new photo at any time.
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="py-2">
            <div className="flex justify-end items-center gap-2">
              <Button
                variant="grey-bg"
                text="Cancel"
                loading={false}
                action={() => {
                  setShowDeleteModal(false);
                }}
              />
              <Button
                variant="red-bg"
                text="Remove"
                loading={false}
                action={() => {
                  setShowDeleteModal(false);
                }}
              />
            </div>
          </div>
        </ModalFooter>
      </ModalContainer>

      <ModalContainer
        active={showUploadModal}
        handleClose={() => {
          setShowUploadmodal(false);
        }}
        greyBg
      >
        <ModalHeader
          headText="Upload Image"
          handleCancel={() => {
            setShowUploadmodal(false);
          }}
        />
        <ModalBody>
          <div className="flex items-center justify-center relative">
            <div className="w-[250px] rounded-full h-[250px] border border-dashed border-[#0DAE94] flex flex-col items-center justify-center overflow-hidden ">
              {previewUrl && (
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <input
                      onChange={onPick}
                      className="absolute w-[200px] opacity-0"
                      type="file"
                      accept="images/*"
                    />
                    <Button
                      variant="green-bg-faded"
                      text="Browse Files"
                      loading={false}
                      action={() => {}}
                      buttonSmaller
                    />
                  </div>
                </div>
              )}

              {previewUrl ? (
                <img
                  src={previewUrl}
                  className="object-cover w-full h-full "
                  alt=""
                />
              ) : (
                <>
                  <span>
                    <Image src={cloudIcon} alt="" />
                  </span>
                  <div className="my-3">
                    <p className="text-xs text-[#0DAE94] font-work-sans-regular">
                      Drag and drop your image here
                    </p>
                    <p className="text-xs text-[#707070]  font-work-sans-regular">
                      Or click to browse (8mb Max)
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      onChange={onPick}
                      className="absolute w-[200px] opacity-0"
                      type="file"
                      accept="images/*"
                    />
                    <Button
                      variant="green-bg-faded"
                      text="Browse Files"
                      loading={false}
                      action={() => {}}
                      buttonSmaller
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end  py-2 items-center gap-2">
            <Button
              variant="grey-bg"
              text="Cancel"
              loading={false}
              action={() => {
                setShowUploadmodal(false);
              }}
            />
            <Button
              variant="green-bg"
              text="Save Changes"
              loading={mutateProfilePicture.isPending}
              action={() => {
                mutateProfilePicture.mutate({ picture: dataUrl! });
              }}
            />
          </div>
        </ModalFooter>
      </ModalContainer>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <span>
            <Avatar avatar={userData.picture!} width={80} height={80} />
          </span>
          <div className="flex items-center gap-2">
            <Button
              icon={uploadGreenIcon}
              action={() => {
                setShowUploadmodal(true);
              }}
              loading={false}
              text="Upload"
              variant="green-faded-border"
              buttonSmaller
            />
            <Button
              icon={trashIconRed}
              action={() => {
                setShowDeleteModal(true);
              }}
              loading={false}
              text="Remove"
              variant="red-faded-border"
              buttonSmaller
            />
          </div>
        </div>
        <Button
          loading={false}
          text="Edit"
          action={() => {
            setReadOnly(false);
          }}
          variant="grey-border"
          icon={userRoundPen}
        />
      </div>

      <div className="my-6">
        <div className="mb-4">
          <p className="font-work-sans-regular text-base lg:text-lg text-[#202020]">
            Personal Details
          </p>
          <div className="mt-2 bg-white p-4  rounded-lg w-full ">
            <Row gutter={20}>
              <Col xs={24} lg={12} className="mb-4">
                <SettingsInput
                  value={userData?.firstName ?? ""}
                  setValue={(name, val) => {
                    setUserData((prev) => ({ ...prev, firstName: name }));
                  }}
                  readOnly={readOnly}
                  label="First Name"
                />
              </Col>
              <Col className="mb-4" lg={12} xs={24}>
                <SettingsInput
                  value={userData?.middleName ?? ""}
                  setValue={(name, val) => {
                    setUserData((prev) => ({ ...prev, middleName: name }));
                  }}
                  readOnly={readOnly}
                  label="Middle Name"
                />
              </Col>
              <Col className="mb-4" lg={12} xs={24}>
                <SettingsInput
                  value={userData?.lastName ?? ""}
                  setValue={(name, val) => {
                    setUserData((prev) => ({ ...prev, lastName: name }));
                  }}
                  readOnly={readOnly}
                  label="Last Name"
                />
              </Col>
              <Col className="mb-4" lg={12} xs={24}>
                <SettingsInput
                  value={
                    moment(userData?.dateOfBirth).format("YYYY-MM-DD") ?? ""
                  }
                  setValue={(name, val) => {
                    setUserData((prev) => ({ ...prev, dateOfBirth: name }));
                  }}
                  readOnly={readOnly}
                  label="Date of Birth"
                  type="date"
                />
              </Col>
              <Col className="mb-4" lg={12} xs={24}>
                <GSelect
                  label="Gender"
                  setInputValue={(e) => {
                    setUserData((prev) => ({ ...prev, gender: e }));
                  }}
                  inputValue={userData.gender!}
                  disabled={readOnly}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </GSelect>
                {/* <SettingsInput
                  value={userData?.gender ?? ""}
                  setValue={(name, val) => {
                    setUserData((prev) => ({ ...prev, gender: name }));
                  }}
                  readOnly={readOnly}
                  label="Gender"
                /> */}
              </Col>
            </Row>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-work-sans-regular text-base lg:text-lg text-[#202020]">
            Address
          </p>
          <div className="mt-2 bg-white p-4  rounded-lg w-full ">
            <Row gutter={20}>
              <Col lg={12} xs={24} className="mb-4">
                <GSelect
                  inputValue={userData.country!}
                  label="Country"
                  setInputValue={(e) =>
                    setUserData((prev) => ({ ...prev, country: e }))
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
              </Col>
              <Col className="mb-4" lg={12} xs={24}>
                <SettingsInput
                  value={userData?.state ?? ""}
                  setValue={(name, val) => {
                    setUserData((prev) => ({ ...prev, state: name }));
                  }}
                  readOnly={readOnly}
                  label="State/Province"
                />
              </Col>
              <Col className="mb-4" lg={12} xs={24}>
                <SettingsInput
                  value={userData?.city ?? ""}
                  setValue={(name, val) => {
                    setUserData((prev) => ({ ...prev, city: name }));
                  }}
                  readOnly={readOnly}
                  label="City"
                />
              </Col>
              <Col className="mb-4" lg={12} xs={24}>
                <SettingsInput
                  value={userData?.address ?? ""}
                  setValue={(name, val) => {
                    setUserData((prev) => ({ ...prev, address: name }));
                  }}
                  readOnly={readOnly}
                  label="Address"
                />
              </Col>
              <Col className="mb-4" lg={12} xs={24}>
                <SettingsInput
                  value={userData?.zip ?? ""}
                  setValue={(name, val) => {
                    setUserData((prev) => ({ ...prev, zip: name }));
                  }}
                  readOnly={readOnly}
                  label="Postal Code"
                />
              </Col>
            </Row>
          </div>
        </div>
        <div>
          {readOnly ? (
            <Button
              action={() => {
                setReadOnly(false);
              }}
              loading={false}
              text="Edit Profile Details"
              variant="green-bg"
            />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                action={() => {
                  setReadOnly(false);
                  handleUpdateUser();
                }}
                loading={isPending}
                text="Save Changes"
                variant="green-bg"
              />
              <Button
                action={() => {
                  setReadOnly(true);
                }}
                loading={false}
                text="Cancel"
                variant="grey-bg"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
