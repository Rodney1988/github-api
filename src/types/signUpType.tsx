export interface SignUpResponse {
  uid: string;
  email: string;
  emailVerified: boolean;
  disabled: boolean;
  metadata: Metadata;
  providerData: ProviderDaum[];
  tokensValidAfterTime: string;
  customToken: string;
}

export interface Metadata {
  lastSignInTime: any;
  creationTime: string;
  lastRefreshTime: any;
}

export interface ProviderDaum {
  uid: string;
  email: string;
  providerId: string;
}
