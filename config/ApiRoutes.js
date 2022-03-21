import { BASE_SERVER_V1_API } from "./Constants";

const generateLotteryParticipateApiRoute = () => `/lottery`;
const generateAddProductApiRoute = () => `/product`;
const generatePaymentDemandApiRoute = () => `${BASE_SERVER_V1_API}/payment-demand`;
const generateFetchPaymentDemandApiRoute= () => `${BASE_SERVER_V1_API}/fetch-payment-demand`;
const generateAddSuperheroApiRoute = () => `/addSuperhero`;
const generateAddSuperpowerApiRoute = () => '/addSuperpower';
const generateGetAllSuperpowerApiRoute = () => `${BASE_SERVER_V1_API}/comicon/getsuperpowers`;
const generateGetAllSuperheroApiRoute = () => `${BASE_SERVER_V1_API}/comicon`
export {
    generateLotteryParticipateApiRoute,
    generateAddProductApiRoute,
    generatePaymentDemandApiRoute,
    generateFetchPaymentDemandApiRoute,
    generateAddSuperheroApiRoute,
    generateAddSuperpowerApiRoute,
    generateGetAllSuperpowerApiRoute,
    generateGetAllSuperheroApiRoute
}