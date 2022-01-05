import Axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import { generateFetchPaymentDemandApiRoute } from "../config/ApiRoutes";
import { deepLinkRedirect, getMobileOperatingSystem } from "../config/Constants";

interface Props {
    data: string | null,
    error: any,
    os: string
}

const PaymentRequest: NextPage<Props> = ({ os, data, error } : Props) => {
    useEffect(() => {
        console.log("Redirecting to ... ", data, " :: on ", os);
        deepLinkRedirect(os, data);
    }, [data, os]);

    console.log(data, error);
    return <>{error || data || "Processing" }</>;
}

export default PaymentRequest;

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const os = getMobileOperatingSystem(req);
    const refinedQuery = new URLSearchParams(query as Record<any, any>); // since Next js assigns query as Dict<any, any>
    if(!(refinedQuery.get("id"))) {
        return {
            props: { 
                error: "NHI PATHA, id daal re",
                data: null,
                os
            }
        }
    }
    const id = refinedQuery.get("id");
    try{
        const { data } = await Axios.post(generateFetchPaymentDemandApiRoute(),{ uniqueParamId: id });
        console.log(data.data.uri);
        return {
            props: {
                os,
                error: null,
                data: data.data.uri
            }
        }
    } catch(err){
        console.log(err);
        return {
            props: {
                os,
                error: "There was an error. Please try after sometime",
                data: null
            }
        }      
    }
    
}