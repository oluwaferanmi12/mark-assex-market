export interface SubmitKycInterface {
  addressDocument: string;
  identityDocument: string;
  otherDocs: string[];
}

type StatusType = "PENDING" | "REJECTED" | "APPROVED";

export interface GetKycResponse {
  addressDocumentUrl: string;
  identityDocumentUrl: string;
  otherDocumentUrl: null | string;
  id: string;
  currentWork: null | string;
  businessNature: null | string;
  educationLevel: null | string;
  fundsSource: null | string;
  netCapital: null | string;
  annualIncome: null | string;
  financialObligation: null | string;
  annualInvestment: null | string;
  accountPurpose: null | string;
  tradingInstruments: null | string;
  phoneCode: null | string;
  phone: null | string;
  status: StatusType;
  addressStatus: StatusType;
  identityStatus: StatusType;
  otherStatus: StatusType;
  phoneStatus: StatusType;
}

export interface NotificationPreference {
  tradingActivities: boolean;
  accountUpdates: boolean;
  promotions: boolean;
  marketInsights: boolean;
  maintenance: boolean;
}

export interface Get2FA {
  twoFaStatus: boolean;
  image: string;
  secret: string;
}

export interface Verify2fa {
  code: string;
}

export interface PhoneRequest {
  phone: string;
  phoneCode: string;
}

export interface PhoneVerify {
  phone: string;
  phoneCode: string;
  otp: string;
}

export interface CreateKycFinance {
  currentWork: string;
  businessNature: string;
  educationLevel: string;
  fundsSource: string;
  netCapital: string;
  annualIncome: string;
  financialObligation: string;
  annualInvestment: string;
  accountPurpose: string;
  tradingInstruments: string;
}
