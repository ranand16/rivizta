import axios from 'axios';
import classnames from 'classnames';
import React from 'react';
import { useState } from 'react';
import styles from './FormComponent.module.scss';
import { generateLotteryParticipateApiRoute } from '../../config/ApiRoutes';
import { BASE_SERVER_V1_API } from '../../config/Constants';
import { ParticipateFormStrings } from './constants';
import { Formik, FormikErrors, FormikValues } from 'formik';

function FormComponent() {
  const firstname ="";
  const lastname ="";
  const email ="";
  const callingCode1 = "";
  const giveawaycode = "";
  const phone1 = -1;
    
  // POST API CALL STATES
  const [participating, setParticipating] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);
  const [success, setSuccess] = useState<string|null>(null);

  const handleSubmit = (values: FormikValues) => {
    setParticipating(true);
    setError(null);
    setSuccess(null);
    axios({
      method: 'post',
      baseURL: BASE_SERVER_V1_API,
      url: generateLotteryParticipateApiRoute(),
      data: {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        callingCode1: values.callingCode1,
        phone1: values.phone1,
        giveaway_code: values.giveawaycode
      }
    }).then(response => {
      console.log(response);
      setSuccess(ParticipateFormStrings.success);
    })
    .catch(error => {
      setError(error.response?.data?.errorDetails?.ererrorMsg || "Something went wrong. Please try later.");
    }).finally(()=>{
      setParticipating(false);
    })
  }

  return (
    <section className={classnames(styles.formSection)}>
      <Formik
        initialValues={{
          firstname: firstname,
          lastname: lastname,
          email: email,
          callingCode1: callingCode1,
          phone1: phone1,
          giveawaycode: giveawaycode
        }}
        validate={values => {
          const errors: FormikErrors<typeof values> = {};
          if(values.firstname.trim().length <= 0) errors.firstname = ParticipateFormStrings.errorFirstname;
          if(values.email.trim().length <= 0) errors.email = ParticipateFormStrings.errorEmail;
          if(values.phone1 && Number.isInteger(values.phone1)) errors.phone1 = ParticipateFormStrings.errorPhone1;
          if(values.giveawaycode.length <= 0) errors.giveawaycode = ParticipateFormStrings.errorGiveawayCode ;
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
            name='firstname' 
            type='text'
            placeholder={"First Name"}
            value={values.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.firstname && errors.firstname && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.firstname}</div>}
          <br />
          <input 
            name='lastname'
            type='text'
            placeholder={"Last Name"}
            value={values.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <br/>
          <input 
            name='email'
            type='text'
            placeholder={"Email"}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.email}</div>}
          <br/>
          <input 
            name='callingCode1'
            type='text'
            placeholder={"Calling Code"}
            value={values.callingCode1}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <br />
          <input 
            name='phone1'
            type='text'
            placeholder={"Phone"}
            value={values.phone1}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.phone1 && errors.phone1 && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.phone1}</div>}
          <br />
          <input
            name='giveawaycode'
            type='text'
            placeholder={"Giveaway Code"}
            value={values.giveawaycode}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.giveawaycode && errors.giveawaycode && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.giveawaycode}</div>}
          <br />
          <input 
            type='submit' 
            value={participating ? ParticipateFormStrings.participatingBtnCTA: ParticipateFormStrings.participateBtnCTA }
            disabled={participating} 
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
          <img width={250} src="https://c.tenor.com/KWfGAvAWtaQAAAAC/150rupiya-dega-dedsau-rupiya-dega.gif"/>
        </p>
        </div>
      }
    </section>
  )
}

export default FormComponent;