import type { NextPage } from 'next'
import FormComponent from '../components/LotteryFormComponent/FormComponent'
import styles from '../styles/Home.module.css'
import Head from '../src/seo-head'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head 
        title={"Rivizta"}
        description={"Dedh sou rupiya dega"} 
        ogimage={'https://stickerly.pstatic.net/sticker_pack/rpEWW5jsv6APuMPXif7B4w/3QNUDQ/22/b9602166-6c8e-4b63-9c65-9cdfc71bb0f3.png'}
      ></Head>
      <main className={styles.main}>
        <FormComponent />
      </main>
      {/* <footer className={styles.footer}></footer> */}
    </div>
  )
}

export default Home