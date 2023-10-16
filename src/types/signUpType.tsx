export interface SignUpResponse {
  user: User;
  providerId: any;
  _tokenResponse: TokenResponse;
  operationType: string;
}

export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: ProviderDaum[];
  stsTokenManager: StsTokenManager;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}

export interface ProviderDaum {
  providerId: string;
  uid: string;
  displayName: any;
  email: string;
  phoneNumber: any;
  photoURL: any;
}

export interface StsTokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

export interface TokenResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
