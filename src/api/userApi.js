const baseUrl=import.meta.env.VITE_BASE_URL

export const userUrl={
    resetPasswordLink:`${baseUrl}/auth/forgot-password-link`,
    resetPassword:`${baseUrl}/auth/forgot-password`,
    login:`${baseUrl}/auth/login`,
    sendOtp:`${baseUrl}/auth/send-otp`,
    signUp:`${baseUrl}/auth/signup`,
    sendMessage:`${baseUrl}/auth/receive-message`,
    verifySession: `${baseUrl}/auth/verify-session`,
    logout:`${baseUrl}/auth/logout`,
    resetAuthPassword:`${baseUrl}/auth/reset-auth-password`,
    deleteUser:`${baseUrl}/auth//delete-user`,
    updateProfilePicture:`${baseUrl}/auth/update-user-image`,
    updateProfile:`${baseUrl}/auth/update-profile`
}