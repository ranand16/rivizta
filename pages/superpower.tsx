import type { GetServerSideProps, NextPage } from 'next';
import SuperpowerFormComponent from '../components/SuperpowerFormComponent/FormComponent';
import styles from '../styles/superhero.module.css';
import Head from '../src/seo-head';
import { Button, Table } from 'react-bootstrap';
import { get } from 'lodash';
import { ModalMode, Superpower, SuperPowerModalMode } from '../config/Interfaces';
import GenericModal from '../components/Modals/GenericModal';
import React, { useEffect, useState } from 'react';
import { generateDeleteSuperheroApiRoute, generateDeleteSuperpowerApiRoute, generateGetAllSuperpowerApiRoute } from '../config/ApiRoutes';
import axios from 'axios';
import { BASE_SERVER_V1_API } from '../config/Constants';

const Home: NextPage = ({superpowerData: spd}: any) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState<boolean>(false);
  const [superPowerModalMode, setSuperPowerModalMode] = React.useState<ModalMode>("ADD");
  const [singleSuperPowerModalMode, setSingleSuperPowerModalMode] = React.useState<Superpower|null>(null);
  const [superpowerData, setSuperpowerData] = useState<Array<Superpower>>([]);

  useEffect(()=>{
    setSuperpowerData(spd);
  },[spd, setSuperpowerData]);

  const TableData = (): React.ReactNode => {
    return <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Superpower</th>
        </tr>
      </thead>
      <tbody>
        {superpowerData.map((sp: Superpower, i: number) => {
          console.log(sp)
          return <tr key={get(sp, "id", i)}>
            <td>{get(sp, "id", i)}</td>
            <td>{get(sp, "superpower", "")}</td>
            <td>
              <Button variant="secondary" onClick={() => { 
                setModalShow(true);
                setSuperPowerModalMode("EDIT");
                setSingleSuperPowerModalMode(sp);
              }}
              >
                Edit
              </Button>

              <Button variant="danger" onClick={() => {
                setDeleteModalShow(true);
                setSingleSuperPowerModalMode(sp);
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
          superpowerData.length > 0 && TableData()
        }
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add a super power
        </Button>
        <GenericModal
          show={deleteModalShow}
          modalbody={<p>{"You won't be able to get this superhero back. Are you sure?"}</p>}
          heading={"Are you sure you want to delete?"}
          showPrimaryBtn={true}
          onPrimaryButtonClick={async ()=>{
            setDeleteModalShow(false);
            await axios({
              method: "DELETE",
              baseURL: `${BASE_SERVER_V1_API}/comicon`,
              url:  generateDeleteSuperpowerApiRoute(get(singleSuperPowerModalMode,"id",-1)),
              data: {}
            }).then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            }).finally(()=>{

            });
            const resp = await axios.get(generateGetAllSuperpowerApiRoute(), {});
            setSuperpowerData(get(resp, "data.data", []));
          }}
          primaryBtnText={"Confirm"}
          showSecondaryBtn={true}
          onSecondaryButtonClick={()=>{
            setDeleteModalShow(false);

          }}
          secondaryBtnText={"Close"}
        />
        <GenericModal 
          modalbody={<SuperpowerFormComponent 
            mode={superPowerModalMode}
            superpowerData={singleSuperPowerModalMode}
            editId={get(singleSuperPowerModalMode, "id", -1)}
          />}
          show={modalShow}
          onSecondaryButtonClick={async () => {
            setModalShow(false);
            const resp = await axios.get(generateGetAllSuperpowerApiRoute(), {});
            setSuperpowerData(get(resp, "data.data", []));
          }}
          secondaryBtnText={"Close"}
          showSecondaryBtn={true}
        />
      </main>
    </div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

  console.info(`superpower.tsx -- ${req.headers['user-agent']}  -- ${new Date()}`);
  const superpowerRoute = generateGetAllSuperpowerApiRoute();
  res.setHeader("Access-Control-Allow-Credentials","true");
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods","GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers","X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  try {
      axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
      const resp = await axios.get(superpowerRoute, {});
      console.log(resp.data.data);
      return { props: { error: null, superpowerData: get(resp, "data.data", [])}  };
  } catch (err) {
      console.error(`${err} -- ${req.headers['user-agent']}  -- ${new Date()}`);
      return { props: { error: get(err, "data.error.message", "There was an error! Please try later."), superpowerData: []} };
  }
}