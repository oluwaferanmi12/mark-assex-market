"use client";

import { AuthGuard } from "@/components/guard/auth-guard";
import { DashboardSideNav } from "@/components/ui/navbar/dashboard-side-nav";
import { DashboardTopNav } from "@/components/ui/navbar/dashboard-top-nav";
import { useGetUserProfile } from "@/hooks/queries/useSettings";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { setShowVerificationModal } from "@/store/slices/accountVerificationSlice";
import { Col, Row } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const { data } = useGetUserProfile();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (data?.kycStatus !== "PENDING") {
      dispatch(setShowVerificationModal(true));
    }
  }, [pathname]);
  return (
    <div className="bg-[#FAFAFA] w-full h-full">
      <Row>
        <Col className="col-responsive" lg={4} md={6} xs={4}>
          <DashboardSideNav userProfile={data} />
        </Col>
        <Col
          lg={20}
          md={24}
          xs={24}
          className="relative lg:pt-24 pt-20  h-screen min-h-screen max-h-screen overflow-hidden"
        >
          <div className="h-full overflow-y-scroll hide-scrollbar">
            <DashboardTopNav userProfile={data} />
            <div className="px-4 lg:px-8 h-full">{children}</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
