export interface SubmitKycInterface {
  addressDocument: string;
  identityDocument: string;
  otherDocs: string[];
}

export interface GetKycResponse {
  addressDocumentUrl: string;
  identityDocumentUrl: string;
  otherDocumentUrl: string | null;
  id: string;
  status: "PENDING";
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
