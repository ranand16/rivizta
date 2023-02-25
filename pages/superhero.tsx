import type { GetServerSideProps, NextPage } from 'next'
import styles from '../styles/superhero.module.css'
import Head from '../src/seo-head'
import { generateDeleteSuperheroApiRoute, generateGetAllSuperheroApiRoute, generateGetAllSuperpowerApiRoute } from '../config/ApiRoutes'
import Axios from 'axios'
import { get } from 'lodash';
import GenericModal from '../components/Modals/GenericModal'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import FormComponent from '../components/SuperheroFormComponent/FormComponent'
import { ModalMode, Superhero, Superpower } from '../config/Interfaces'
import axios from 'axios'
import { BASE_SERVER_V1_API } from '../config/Constants'
import { createApiCall } from "../src/utility/functions";

const Home: NextPage = ({ superpowerData: spd, superheroData: shd }: any) => {
  const [modalShow, setModalShow] = React.useState<boolean>(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState<boolean>(false);
  const [modalMode, setModalMode] = React.useState<ModalMode>("ADD");
  const [singlesuperheroData, setSingleSuperheroData] = React.useState<Superhero | null>(null); // to be used for edit pr delete purpose

  const [superheroData, setSuperheroData] = useState<Array<Superhero>>([]);
  const [superpowerData, setSuperpowerData] = useState<Array<Superpower>>([]);
  
  console.log(superheroData);
  useEffect(()=>{
    setSuperheroData(shd);
  },[shd, setSuperheroData]);

  useEffect(()=>{
    setSuperpowerData(spd);
  },[spd, setSuperpowerData]);

  const TableData = (): React.ReactNode => {
    return <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Superhero</th>
          <th>Publisher</th>
          <th>Alter Ego</th>
          <th>First Appearance</th>
          <th>Character</th>
          <th>Superpowers</th>
        </tr>
      </thead>
      <tbody>
        {superheroData.map((superhero: Superhero, i: number) => {
          console.log(superhero)
          return <tr key={get(superhero, "id", i)}>
            <td>{get(superhero, "id", "")}</td>
            <td>{get(superhero, "superhero", "")}</td>
            <td>{get(superhero, "characters", "")}</td>
            <td>{get(superhero, "alter_ego", "")}</td>
            <td>{get(superhero, "first_appearance", "")}</td>
            <td>{get(superhero, "publisher", "")}</td>
            <td>{get(superhero, "superpowers", "")}</td>
            <td>
            <Button variant="secondary" onClick={() => { 
              setModalShow(true);
              setModalMode("EDIT");
              setSingleSuperheroData(superhero);
            }}
            >
              Edit
            </Button>

            <Button variant="danger" onClick={() => {
              setDeleteModalShow(true);
              setSingleSuperheroData(superhero);
            }}
            >
              Delete
            </Button>
            </td>

          </tr>
        })}
      </tbody>
    </Table>
  }

  return (
    <div className={styles.container}>
      <Head
        title={"Superhero | Comicon"}
        description={"Here are superheros for you!"} 
        ogimage={'https://www.dccomics.com/sites/default/files/Char_Gallery_Batman_DTC1018_6053f2162bdf03.97426416.jpg'}
      ></Head>
      <main className={styles.main}>
        {
          superheroData.length > 0 && TableData()
        }
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add a super hero
        </Button>
        <GenericModal
          show={deleteModalShow}
          modalbody={<p>{"You won't be able to get this superhero back. Are you sure?"}</p>}
          heading={"Are you sure you want to delete?"}
          showPrimaryBtn={true}
          onPrimaryButtonClick={async ()=>{
            setDeleteModalShow(false);
            try {
              await createApiCall("DELETE", `${BASE_SERVER_V1_API}/comicon`,{
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods':'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                'Access-Control-Allow-Headers':'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
              },generateDeleteSuperheroApiRoute(get(singlesuperheroData,"id",-1))).then((response)=>{
                console.log(response);
              })
            } catch(err) {
              console.log(err);
            }
            
            const resp = await axios.get(generateGetAllSuperheroApiRoute(), {});
            setSuperheroData(get(resp, "data.data", []));
          }}
          primaryBtnText={"Confirm"}
          showSecondaryBtn={true}
          onSecondaryButtonClick={()=>{
            setDeleteModalShow(false);

          }}
          secondaryBtnText={"Close"}
        />
        <GenericModal
          modalbody={<FormComponent superheroData={singlesuperheroData} mode={modalMode} superpowerOptions={superpowerData} editId={get(singlesuperheroData,"id",-1)} />}
          show={modalShow}
          showSecondaryBtn={true}
          onSecondaryButtonClick={async () => {
            setModalShow(false);
            const resp = await axios.get(generateGetAllSuperheroApiRoute(), {});
            setSuperheroData(get(resp, "data.data", []));
          }}
          secondaryBtnText={"close"}
          heading='Add a new superhero'
        />
      </main>
    </div>
  )
}
 
export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  console.info(`ssuperhero.tsx -- ${req.headers['user-agent']}  -- ${new Date()}`);
  const superpowerRoute = generateGetAllSuperpowerApiRoute();
  const superheroRoute = generateGetAllSuperheroApiRoute();
  try {
      const resp = await Axios.get(superpowerRoute, {});
      const superheroresp = await Axios.get(superheroRoute, {});
      console.log(superheroresp.data.data);
      return { props: { error: null, superpowerData: get(resp, "data.data", []), superheroData: get(superheroresp, "data.data", []) }  };
  } catch (err) {
      console.error(`${err} -- ${req.headers['user-agent']}  -- ${new Date()}`);
      return { props: { error: get(err, "data.error.message", "There was an error! Please try later."), superpowerData: [], superheroData: [] } };
  }
}