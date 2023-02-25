import axios from 'axios';
import classnames from 'classnames';
import React from 'react';
import { useState } from 'react';
import styles from './FormComponent.module.scss';
import { generateAddSuperpowerApiRoute, generateEditSuperpowerApiRoute } from '../../config/ApiRoutes';
import { BASE_SERVER_V1_API } from '../../config/Constants';
import { SuperpowerFormStrings } from './constants';
import { Formik, FormikErrors, FormikValues } from 'formik';
import { ModalMode, Superpower } from '../../config/Interfaces';
import { get } from 'lodash';
import { createApiCall } from '../../src/utility/functions';

interface IProps { superpowerData?: Superpower | null, mode: ModalMode, editId?: number }

function SuperpowerFormComponent({ superpowerData, mode = "ADD", editId }: IProps) {
  const superpower = get(superpowerData, "superpower", "");
  const [submit, setSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);
  const [success, setSuccess] = useState<string|null>(null);

  const handleSubmit = async (values: FormikValues) => {
    setSubmit(true);
    setError(null);
    setSuccess(null);
    const data: any = {
      superpower: values.superpower
    };
    if(editId && mode == "EDIT") data["id"] = editId; 
    try {
      await createApiCall(mode == "ADD" ? 'post' : 'PUT', `${BASE_SERVER_V1_API}/comicon`, {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods':'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers':'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
      }, mode == "ADD"? generateAddSuperpowerApiRoute() : generateEditSuperpowerApiRoute(editId), data)
      setSuccess(SuperpowerFormStrings.success);
    } catch(err: any) {
      console.log(err)
      setError(err.response?.data?.errorDetails?.ererrorMsg || "Something went wrong. Please try later.");
    } finally {
      setSubmit(false);
    }
  }

  return (
    <section className={classnames(styles.formSection)}>
      <Formik
        initialValues={{
          superpower,
        }}
        validate={values => {
          const errors: FormikErrors<typeof values> = {};
          if(values.superpower.trim().length <= 0) errors.superpower = SuperpowerFormStrings.errorSuperpowerName;
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
            name='superpower' 
            type='text'
            placeholder={"Superpower Name"}
            value={values.superpower}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {
            touched.superpower && 
            errors.superpower &&
            <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.superpower}</div>
          }
          <br />
          <input 
            type='submit' 
            value={submit ? SuperpowerFormStrings.submittingBtnCTA(mode): SuperpowerFormStrings.submitBtnCTA(mode) }
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
          <img width={250} src="https://c.tenor.com/bI3QbGJGyKcAAAAM/haha-funny-batman.gif"/>
        </p>
        </div>
      }
    </section>
  )
}

export default SuperpowerFormComponent;