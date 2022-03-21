import axios from 'axios';
import classnames from 'classnames';
import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './FormComponent.module.scss';
import { generateAddSuperheroApiRoute, generateGetAllSuperpowerApiRoute } from '../../config/ApiRoutes';
import { BASE_SERVER_V1_API } from '../../config/Constants';
import { SuperheroFormStrings } from './constants';
import { Field, Formik, FormikErrors, FormikValues } from 'formik';
import SuperpowerFormComponent from '../SuperpowerFormComponent/FormComponent';
import GenericModal from '../Modals/GenericModal';
import { Superpower } from '../../config/Interfaces';
import { get } from 'lodash';
interface IProps { superpowerOptions: Array<Superpower> }

function FormComponent({ superpowerOptions: sp = [] }: IProps) {
  const [superpowerOptions, setSuperpowerOptions] = useState<Array<Superpower>>(sp);
  const superhero ="";
  const publisher ="";
  const alter_ego = "";
  const first_appearance = "";
  const characters = "";
  const superpowers: any[] = [];

  // POST API CALL STATES
  const [addSuperpower, setAddSuperpower] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);
  const [success, setSuccess] = useState<string|null>(null);

  useEffect(()=>{
    setSuperpowerOptions(sp);
  }, [sp, setSuperpowerOptions]);

  const handleSubmit = (values: FormikValues) => {
    setSubmit(true);
    setError(null);
    setSuccess(null);
    console.log("STArTING...");
    axios({
      method: 'post',
      baseURL: `${BASE_SERVER_V1_API}/comicon`,
      url: generateAddSuperheroApiRoute(),
      data: {
        superhero: values.superhero,
        publisher: values.publisher,
        first_appearance: values.first_appearance,
        alter_ego: values.alter_ego,
        characters: values.characters,
        superpowers: values.superpowers.toString()
      }
    }).then(response => {
      console.log(response);
      setSuccess(SuperheroFormStrings.success);
    })
    .catch(error => {
      setError(error.response?.data?.errorDetails?.ererrorMsg || "Something went wrong. Please try later.");
    }).finally(()=>{
      setSubmit(false);
    });
  }

  return (
    <section className={classnames(styles.formSection)}>
      <GenericModal
        modalbody={<SuperpowerFormComponent />}
        show={addSuperpower}
        onHide={async () => {
          const resp = await axios.get(generateGetAllSuperpowerApiRoute(), {});
          setSuperpowerOptions(get(resp, "data.data", []));
          setAddSuperpower(false)
        }}
        heading='Add a new superpower'
      />
      <Formik
        initialValues={{
          superhero,
          publisher,
          first_appearance,
          alter_ego,
          characters,
          superpowers
        }}
        validate={values => {
          const errors: FormikErrors<typeof values> = {};
          if(values.superhero.trim().length <= 0) errors.superhero = SuperheroFormStrings.errorSuperheroName;
          if(values.publisher.trim().length <= 0) errors.publisher = SuperheroFormStrings.errorPublisherName;
          if(values.alter_ego.trim().length <= 0) errors.alter_ego = SuperheroFormStrings.errorAlterego;
          if(values.first_appearance.trim().length <= 0) errors.first_appearance = SuperheroFormStrings.errorFirstAppearance;
          if(values.characters.trim().length <= 0) errors.characters = SuperheroFormStrings.errorCharacters;
          if(values.superpowers.length <= 0) errors.superpowers = SuperheroFormStrings.errorSuperpowers;
          return errors;
        }}
        onSubmit={handleSubmit}
      >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <form className={classnames("m-auto", "d-flex", "flex-column", "justify-content-center", styles.form)} onSubmit={(e: React.FormEvent<HTMLFormElement>) => { handleSubmit(e) }}>
          <br />
          <input 
            name='superhero' 
            type='text'
            placeholder={"Superhero Name"}
            value={values.superhero}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.superhero && errors.superhero && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.superhero}</div>}
          <br/>
          <input 
            name='publisher'
            type='text'
            placeholder={"publisher"}
            value={values.publisher}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.publisher && errors.publisher && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.publisher}</div>}
          <br />
          <input
            name='first_appearance'
            type='text'
            placeholder={"First Appearance"}
            value={values.first_appearance}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.first_appearance && errors.first_appearance && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.first_appearance}</div>} 
          <br />
          <input
            name='alter_ego'
            type='text'
            placeholder={"Alter Ego of this superhero"}
            value={values.alter_ego}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.alter_ego && errors.alter_ego && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.alter_ego}</div>}
          <br />
          <input 
            name='characters' 
            type='text'
            placeholder={"Characters"}
            value={values.characters}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.characters && errors.characters && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.characters}</div>}
          <br />
          <label style={{ textAlign: "center" }}>Superpower: </label>
          {
            superpowerOptions.length > 0 && 
            <Field
              as="select"
              id='superpowers'
              name='superpowers' 
              placeholder={"Superpowers"}
              value={values.superpowers}
              onChange={handleChange}
              multiple={true}
            >
              {
                superpowerOptions.length > 0 && superpowerOptions.map((so: Superpower, i: number) => {
                  return <option key={so["superpowerId"] || i} value={so["superpowerId"]}>{so["superpower"]}</option>;
                })
              }
            </Field>
          }
          {
            superpowerOptions.length == 0 && <div className={classnames("text-center")}>Please add a superpower to be added to this superhero</div>
          }
          <br />
          <a 
            className={styles.addSuperpowerBtn} 
            onClick={()=>setAddSuperpower(addSuperpower ? false : true)}>
            {addSuperpower?"Adding new superpower":"+ Superpower"}
          </a>
          {touched.superpowers && errors.superpowers && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.superpowers}</div>}
          <br />
          <input 
            type='submit' 
            value={submit ? SuperheroFormStrings.submittingBtnCTA: SuperheroFormStrings.submitBtnCTA }
            disabled={submit} 
          />
        </form>
      )}
     </Formik>
      {
        error && <><br/><p className={classnames("d-flex", "flex-column", "align-items-center")}>{error}</p></>
      }
      {
        success && <div>
        <br/>
        <p className={classnames("d-flex", "flex-column", "align-items-center")}>
          {success}
          <img width={250} src="https://c.tenor.com/7Ypq9_9najcAAAAC/thumbs-up-double-thumbs-up.gif"/>
        </p>
        </div>
      }
    </section>
  )
}

export default FormComponent;