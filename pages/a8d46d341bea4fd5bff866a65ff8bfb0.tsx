import Axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import { generatePaymentDemandApiRoute } from "../config/ApiRoutes";

interface Props {
    data: Record<string, any> | null,
    error: any
}

const PaymentRequest: NextPage<Props> = ({ data, error } : Props) => {
    const [copied, setCopied] = useState(false);
    const copyText = () => {
        var element = document.getElementById("linktext");
        if(element) {
            navigator.clipboard.writeText(element.innerHTML || element.innerText);
            setCopied(true);
            setTimeout(()=>{
                setCopied(false);
            },3000);
        }
    }
    console.log(data, error);
    if(error) {
        return <>{error}</>;
    }
    if(data) {
        return <>
            Here is a short link: {<a href={data["paymentDemand"]["bitly_link"]}>Link</a>}
            <button onClick={()=>copyText()}>Copy link</button>
            <div id="linktext" style={{ visibility: "hidden" }}>{data["paymentDemand"]["bitly_link"]}</div>
            {copied && <div>Copied to clipboard!</div>}
        </>;
    }
    return <>{"Processing"}</>
}

export default PaymentRequest;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const refinedQuery = new URLSearchParams(query as Record<any, any>); // since Next js assigns query as Dict<any, any>
    // upi://pay?pa=9886142140@upi&pn=Myself&mc=payeeMCC&tid=trxnID&tr=trxnRefId&tn=This is a note&am=1&cu=INR&refUrl=refUrl&mode=04&purpose=00
    // const config = { headers: { authorization: `${token}` } };

    // if(!(refinedQuery.get("pa") && refinedQuery.get("pn") && refinedQuery.get("am") && refinedQuery.get("tn"))) {
    //     return {
    //         props: { 
    //             error: "pa, pn, am and tn are compulsory fields for a payment demand request",
    //             data: null,
    //         }
    //     }
    // }
    try {
        const refinedQueryEntries = refinedQuery.entries();
        const refinedQueryObject: any = {};
        for(const [key, value] of refinedQueryEntries) { // each 'entry' is a [key, value] tupple
            refinedQueryObject[key] = value;
        }
        var paymentURL = `upi://pay?pa=${refinedQuery.get("pa")}&pn=${refinedQuery.get("pn")}&tn=${refinedQuery.get("tn")}&am=${refinedQuery.get("am")}`;
        
        if(refinedQuery.get("cu"))paymentURL = paymentURL + `&cu=${refinedQuery.get("cu")}`; 
        else paymentURL = paymentURL + '&cu=INR';
    
        if(refinedQuery.get("mode"))paymentURL = paymentURL + `&mode=${refinedQuery.get("mode")}`;     
        if(refinedQuery.get("purpose"))paymentURL = paymentURL + `&purpose=${refinedQuery.get("purpose")}`; 
    
    
        const { data } = await Axios.post(generatePaymentDemandApiRoute(),{ payment_url: paymentURL,  ...refinedQueryObject });
        return {
            props: {
                error: null,
                data: data.data
            }
        }
    } catch(err){
        console.log("------------err------------")
        console.log(err)
        console.log("------------err------------")
        return {
            props: {
                error: "There was an error. Please try after sometime",
                data: null
            }
        }      
    }
}