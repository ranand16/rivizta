import type { NextPage } from 'next'
import SuperpowerFormComponent from '../components/SuperpowerFormComponent/FormComponent'
import styles from '../styles/superhero.module.css'
import Head from '../src/seo-head'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head 
        title={"Superhero | Comicon"}
        description={"Here are superheros for you!"} 
        ogimage={'https://www.dccomics.com/sites/default/files/Char_Gallery_Batman_DTC1018_6053f2162bdf03.97426416.jpg'}
      ></Head>
      <main className={styles.main}>
        <SuperpowerFormComponent />
      </main>
    </div>
  )
}

export default Home