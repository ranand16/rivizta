import axios from 'axios';
import classnames from 'classnames';
import React from 'react';
import { useState } from 'react';
import styles from './ProductForm.module.scss';
import { generateAddProductApiRoute } from '../../config/ApiRoutes';
import { BASE_SERVER_V1_API, getTimeStampFromDate } from '../../config/Constants';
import { AddProductFormStrings } from './constants';
import { Formik, FormikErrors, FormikValues } from 'formik';

function ProductForm() {
  const jwt = ""; // compulsory
  const name =""; // compulsory
  const description ="";
  const image ="";
  const type =""; // compulsory
  const productlink =""; // compulsory
  const earnInGiveaway =false;
  const productSeoHandler ="";
  const addGiveaway =false;

  const winLink ="";

  const giveawayName =""; // compulsory
  const giveawayRules ="";
  const giveawayCode =""; // compulsory
  const startdate =""; // compulsory
  const enddate =""; // compulsory
  const winnerAnnounceDate =""; // compulsory
  const giveawayPageSeoHandler =""; // compulsory
  
  // POST API CALL STATES
  const [productAdding, setProductAdding] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);
  const [success, setSuccess] = useState<string|null>(null);

  const handleSubmit = (values: FormikValues) => {
    setProductAdding(true);
    setError(null);
    setSuccess(null);
    const payload = {
      addGiveaway: values.addGiveaway,
      product: {
        name: values.name,
        description: values.description,
        image: values.image,
        type: values.type,
        link: values.productlink,
        earn_in_giveaway: values.earnInGiveaway,
        seo_handler: values.productSeoHandler
      },
      win: values.addGiveaway ? {
        link: values.winLink
      } : null,
      giveaway: values.addGiveaway ? {
        name: values.giveawayName,
        rules: values.giveawayRules,
        gcode: values.giveawayCode,
        startdate: values.startdate ? getTimeStampFromDate(values.startdate.split("-")) : null,
        enddate: values.enddate ? getTimeStampFromDate(values.enddate.split("-")) : null,
        winnerAnnounceDate: values.winnerAnnounceDate ? getTimeStampFromDate(values.winnerAnnounceDate.split("-")) : null,
        seo_handler: values.giveawayPageSeoHandler
      } : null
    };
    console.log(payload);
    axios({
      method: 'post',
      baseURL: BASE_SERVER_V1_API,
      headers: {"Authorization" : `Bearer ${values.jwt}`},
      url: generateAddProductApiRoute(),
      data: payload
    }).then(response => {
      console.log(response);
      setSuccess(AddProductFormStrings.productSuccess(addGiveaway));
    })
    .catch(error => {
      console.log(error);
      setError(error.response?.data?.errorDetails?.ererrorMsg || "Something went wrong. Please try later.");
    }).finally(()=>{
      setProductAdding(false);
    });
  }

  return (
    <section className={classnames(styles.formSection)}>
      <Formik
       initialValues={{ 
        jwt: jwt, 
        name: name, 
        description: description, 
        type: type, 
        productlink: productlink, 
        productSeoHandler: productSeoHandler, 
        addGiveaway: addGiveaway, 
        earnInGiveaway: earnInGiveaway, 
        winLink: winLink,
        giveawayName: giveawayName,
        giveawayRules: giveawayRules,
        giveawayCode: giveawayCode,
        startdate: startdate,
        enddate: enddate,
        winnerAnnounceDate: winnerAnnounceDate,
        giveawayPageSeoHandler: giveawayPageSeoHandler
      }}
       validate={values => {
         console.log(values);        
        const errors: FormikErrors<typeof values> = {};
        if(values.jwt.trim().length <= 0) errors.jwt = "You need JWT for adding a new product";
        if(values.name.trim().length <= 0) errors.name = "Product name field cannot be empty";
        if(values.type.trim().length <= 0) errors.type = "Product type field cannot be empty";
        if(values.productlink.trim().length <= 0) errors.productlink = "Product link field cannot be empty";
        if(values.addGiveaway){
          if(values.productSeoHandler.trim().length <= 0) errors.productSeoHandler = "Product seo handler field cannot be empty";
          if(values.giveawayName.trim().length <= 0) errors.productSeoHandler = "Giveaway name field cannot be empty";
          if(values.giveawayCode.trim().length <= 0) errors.productSeoHandler = "Giveaway code field cannot be empty";
          if(values.startdate.trim().length <= 0) errors.productSeoHandler = "Start date cannot be empty";
          if(values.enddate.trim().length <= 0) errors.productSeoHandler = "End date field cannot be empty";
          if(values.winnerAnnounceDate.trim().length <= 0) errors.productSeoHandler = "Winnerannounce date field cannot be empty";
          if(values.giveawayPageSeoHandler.trim().length <= 0) errors.productSeoHandler = "Giveaway seo handler link field cannot be empty";
        }
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
          name='jwt' 
          type='text'
          placeholder={"ENTER JWT HERE"}
          value={values.jwt}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.jwt && errors.jwt && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.jwt}</div>}
        <br />
        <br />
        <br />
        <br />
        <input 
          name='name' 
          type='text'
          placeholder={"Product Name"}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.name && errors.name && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.name}</div>}
        <br />
        <input 
          name='description'
          type='text'
          placeholder={"Description"}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.description && errors.description && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.description}</div>}
        {/* <br/>
        <input 
          name='image'
          type='text'
          placeholder={"image"}
          value={image}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setImage(e.currentTarget.value)}
        /> */}
        <br/>
        <input 
          name='type'
          type='text'
          placeholder={"Type of Product"}
          value={values.type}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.type && errors.type && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.type}</div>}
        <br />
        <input
          name='productlink'
          type='text'
          placeholder={"Product Link"}
          value={values.productlink}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.productlink && errors.productlink && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.productlink}</div>}
         <br />
        <input 
          name='productSeoHandler'
          type='text'
          placeholder='Product seo-handler'
          value={values.productSeoHandler}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.productSeoHandler && errors.productSeoHandler && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.productSeoHandler}</div>}
        <br />
        <label><span>This product has a giveaway? </span><input 
          name='addGiveaway'
          type='checkbox'
          checked={values.addGiveaway}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        </label>
        {touched.addGiveaway && errors.addGiveaway && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.addGiveaway}</div>}
        {       
          values.addGiveaway && <>
            <br />
            <label><span>This product is itself a giveaway? </span> <input 
              name='earnInGiveaway'
              type='checkbox'
              checked={values.earnInGiveaway}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            </label>
            {touched.productlink && errors.productlink && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.productlink}</div>}
            <br />
            <input 
              name='winLink'
              type='text'
              placeholder={"Win Link"}
              value={values.winLink}
              disabled={earnInGiveaway}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.winLink && errors.winLink && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.winLink}</div>}
            <br />
            <input 
              name='giveawayName'
              type='text'
              placeholder='Giveaway Name'
              value={values.giveawayName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.giveawayName && errors.giveawayName && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.giveawayName}</div>}
            <br />
            <input 
              name='giveawayRules'
              type='text'
              placeholder='Giveaway Rules'
              value={values.giveawayRules}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.giveawayRules && errors.giveawayRules && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.giveawayRules}</div>}
            <br />
            <input 
              name='giveawayCode'
              type='text'
              placeholder='Giveaway Code'
              value={values.giveawayCode}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.giveawayCode && errors.giveawayCode && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.giveawayCode}</div>}
            <br />
            <input 
              name='startdate'
              type='date'
              placeholder='Giveaway start date'
              value={values.startdate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.startdate && errors.startdate && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.startdate}</div>}
            <br />
            <input 
              name='enddate'
              type='date'
              placeholder='Giveaway end date'
              value={values.enddate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.enddate && errors.enddate && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.enddate}</div>}
            <br />
            <input 
              name='winnerAnnounceDate'
              type='date'
              placeholder='Giveaway winner announce date'
              value={values.winnerAnnounceDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.winnerAnnounceDate && errors.winnerAnnounceDate && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.winnerAnnounceDate}</div>}
            <br />
            <input 
              name='giveawayPageSeoHandler'
              type='text'
              placeholder='Giveaway seo-handler'
              value={values.giveawayPageSeoHandler}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.giveawayPageSeoHandler && errors.giveawayPageSeoHandler && <div className={classnames("d-flex justify-content-center", styles.errorText)}>{errors.giveawayPageSeoHandler}</div>}
          </>
        }
        <br />
        <input 
          type='submit' 
          value={productAdding ? AddProductFormStrings.productAddingBtnCTA: AddProductFormStrings.participateBtnCTA }
          disabled={productAdding} 
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

export default ProductForm;