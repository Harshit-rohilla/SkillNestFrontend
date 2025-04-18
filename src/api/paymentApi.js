const baseUrl=import.meta.env.VITE_BASE_URL

export const paymentUrl={
    createOrder:`${baseUrl}/payment/create-order`,
    verifySignature:`${baseUrl}/payment/verify-signature`,
    paymentMail:`${baseUrl}/payment/payment-mail`
}