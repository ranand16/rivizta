import Head from 'next/head'
import { Key, FC } from 'react'

type ChildProps = {
    title: string ,
    description: string, 
    ogimage?: string, 
    styleSheet?: Array<string>, 
    children?: FC, 
    keywords?: Array<string>,
}

const Meta: FC<ChildProps> = ({
    title, 
    description, 
    ogimage = "", 
    styleSheet = [], 
    children, 
    keywords = [],
}) => {
    return (
        <Head>
            <title>{title || 'Rivizta' }</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"></meta>

            {/* <-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.rivizta.com/" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" itemProp="image" content={ogimage} />

            {/**Twitter */}
            <meta property="twitter:card" content={ogimage} />
            <meta property="twitter:url" content="https://www.rivizta.com/" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogimage} />
            <meta name="facebook-domain-verification" content="oa9lfrlk334a928ddm9r4q1cee3lvy" />
            {keywords.length > 0 &&
                <meta name="keywords" content={keywords.toString()} />}

            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            {styleSheet.map((style: string, index: Key) => {
                return (
                    <link key={index} rel="stylesheet" as="style" href={style} data-optimized-fonts="true"></link>
                )
            })}
            {children}
        </Head>
    )
}
export default Meta
