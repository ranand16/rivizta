import { BASE_SERVER_V1_API } from "./Constants";

const generateLotteryParticipateApiRoute = () => `/lottery`;
const generateAddProductApiRoute = () => `/product`;
const generatePaymentDemandApiRoute = () => `${BASE_SERVER_V1_API}/payment-demand`;

export {
    generateLotteryParticipateApiRoute,
    generateAddProductApiRoute,
    generatePaymentDemandApiRoute
}