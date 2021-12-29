import React from 'react';
import axios from 'axios';
import Head from '../../src/seo-head';
import get from "lodash.get";
import styles from '../../styles/Home.module.css'
// import { GetStaticProps, GetStaticPaths, GetServerSideProps, NextPageContext } from 'next'
import { BASE_SERVER_V1_API } from '../../config/Constants';

interface IProps {
    success: boolean;
    data: any;
    token: string;
}

const VerifyGiveawayParticipation = (props : any) => {
    return (
        <div className={styles.container}>
            <Head
                title={'Email Verification'} 
                description={''} 
            ></Head>
            <main className={styles.main}>
                {get(props, 'success') === true ? <p>Verified</p> : <p>Not done</p>}
            </main>
        </div>
    )
}

interface SProps { query: any }
export async function getServerSideProps({query}: SProps) {
    const { token } = query;
    let resp = {
        success: false,
        data: {},
        token
    };
    
    try {
        if (!token) {
            return { props: resp };
        } else {
            await axios({
                method: 'patch',
                baseURL: BASE_SERVER_V1_API,
                url: "/verify-giveaway-participation",
                data: {token}
            }).then(response => {
                console.log(response);
                if (get(response, 'status') === 200) {
                    resp = {
                        success: true,
                        data: response.data,
                        token
                    };
                }
            })
            .catch(error => {
                console.log(error);
                resp = {
                    success: false,
                    token,
                    data: {
                        message: 'Something went wrong, please try again after sometime'
                    }
                };
            });
            return {props : resp};
        }
    } catch (error: any) {
        return { props: { success: false, data: error, token } };
    }
}

export default VerifyGiveawayParticipation;
