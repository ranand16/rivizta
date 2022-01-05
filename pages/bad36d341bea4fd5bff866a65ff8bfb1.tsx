import Axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { generateFetchPaymentDemandApiRoute } from "../config/ApiRoutes";

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
    if(!(refinedQuery.get("id"))) {
        return {
            props: { 
                error: "NHI PATHA, id daal re",
                data: null,
            }
        }
    }
    const id = refinedQuery.get("id");
    try{
        const { data } = await Axios.post(generateFetchPaymentDemandApiRoute(),{ uniqueParamId: id });
        console.log(data.data.uri);
        return {
            props: {
                error: null,
                data: data.data.uri
            }
        }
    } catch(err){
        console.log(err);
        return {
            props: {
                error: "There was an error. Please try after sometime",
                data: null
            }
        }      
    }
    
}