import { NextPage } from "next";
import styles from "../styles/Home.module.css"; 
import Head from '../src/seo-head';
import ProductForm from "../components/ProductForm/ProductForm";

const AddProduct: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head 
                title={"Rivizta"}
                description={"Dedh sou rupiya dega"} 
                ogimage={'https://stickerly.pstatic.net/sticker_pack/rpEWW5jsv6APuMPXif7B4w/3QNUDQ/22/b9602166-6c8e-4b63-9c65-9cdfc71bb0f3.png'}
            ></Head>
            <main className={styles.main}>
                <ProductForm />
            </main>
        </div>
    );
}

export default AddProduct;