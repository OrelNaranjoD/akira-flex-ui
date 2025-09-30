import { environment } from '../../environments/environment'

export const API_BASE_URL = environment.apiBaseUrl

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    platformRegister: `${API_BASE_URL}/auth/platform/register`,
    verifyEmail: `${API_BASE_URL}/auth/verify-email`,
    resendVerification: `${API_BASE_URL}/auth/resend-verification`,
    forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
    resetPassword: `${API_BASE_URL}/auth/reset-password`,
    refreshToken: `${API_BASE_URL}/auth/refresh-token`,
    logout: `${API_BASE_URL}/auth/logout`,
    me: `${API_BASE_URL}/auth/me`,
  },
}
