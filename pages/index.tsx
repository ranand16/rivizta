import type { NextPage } from 'next'
import HomeComponent from '../components/HomeComponent/HomeComponent'
import styles from '../styles/Home.module.css'
import Head from '../src/seo-head'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head 
        title={"Rivizta"}
        description={"Generated by create next app"} 
        ogimage={''}
      ></Head>
      <main className={styles.main}>
        <HomeComponent />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Home