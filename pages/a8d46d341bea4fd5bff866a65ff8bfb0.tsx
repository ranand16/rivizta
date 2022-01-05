import Axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { generatePaymentDemandApiRoute } from "../config/ApiRoutes";

interface Props {
    data: string | null,
    error: any
}

const PaymentRequest: NextPage<Props> = ({ data, error } : Props) => {
    console.log(data, error);
    return <>{error || data || "Processing" }</>;
}

export default PaymentRequest;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const refinedQuery = new URLSearchParams(query as Record<any, any>); // since Next js assigns query as Dict<any, any>
    // upi://pay?pa=9886142140@upi&pn=Myself&mc=payeeMCC&tid=trxnID&tr=trxnRefId&tn=This is a note&am=1&cu=INR&refUrl=refUrl&mode=04&purpose=00
    // const config = { headers: { authorization: `${token}` } };

    if(!(refinedQuery.get("pa") && refinedQuery.get("pn") && refinedQuery.get("am") && refinedQuery.get("tn"))) {
        return {
            props: { 
                error: "pa, pn, am and tn are compulsory fields for a payment demand request",
                data: null,
            }
        }
    }
    try{
        const refinedQueryEntries = refinedQuery.entries();
        const refinedQueryObject: any = {};
        for(const [key, value] of refinedQueryEntries) { // each 'entry' is a [key, value] tupple
            refinedQueryObject[key] = value;
        }
        const paymentURL = `upi://pay?pa=${refinedQuery.get("pa")}&pn=${refinedQuery.get("pn")}&mc=${refinedQuery.get("mc")}&tid=${refinedQuery.get("tid")}&tr=${refinedQuery.get("tr")}&tn=${refinedQuery.get("tn")}&cu=${refinedQuery.get("cu")}&refUrl=${refinedQuery.get("refUrl")}&mode=${refinedQuery.get("mode")}&purpose=${refinedQuery.get("purpose")}`;
        const { data } = await Axios.post(generatePaymentDemandApiRoute(),{ payment_url: paymentURL,  ...refinedQueryObject });
        return {
            props: {
                error: null,
                data: "Success"
            }
        }
    } catch(err){
        return {
            props: {
                error: "There was an error. Please try after sometime",
                data: null
            }
        }      
    }
    
}