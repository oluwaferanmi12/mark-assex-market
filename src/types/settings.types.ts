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
