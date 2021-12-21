import axios from 'axios';
import classnames from 'classnames';
import React from 'react';
import { useState } from 'react';
import styles from './ProductForm.module.scss';
import { generateAddProductApiRoute } from '../../config/ApiRoutes';
import { BASE_SERVER_V1_API, getTimeStampFromDate } from '../../config/Constants';
import { AddProductFormStrings } from './constants';

function ProductForm() {
  const [jwt, setJWT] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [productlink, setProductLink] = useState<string>("");
  const [earnInGiveaway, setEarnInGiveaway] = useState<boolean>(false);
  const [productSeoHandler, setProductSeoHandler] = useState<string>("");
  const [addGiveaway, setAddGiveaway] = useState<boolean>(false);

  const [winLink, setWinLink] = useState<string>();

  const [giveawayName, setGiveawayName] = useState<string>("");
  const [giveawayRules, setGiveawayRules] = useState<string>("");
  const [giveawayCode, setGiveawayCode] = useState<string>("");
  const [startdate, setStartdate] = useState<string>("");
  const [enddate, setEnddate] = useState<string>("");
  const [winnerAnnounceDate, setWinnerAnnounceDate] = useState<string>("");
  const [giveawayPageSeoHandler, setGiveawayPageSeoHandler] = useState<string>("");
  
  // POST API CALL STATES
  const [productAdding, setProductAdding] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);
  const [success, setSuccess] = useState<string|null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    setProductAdding(true);
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const payload = {
      addGiveaway,
      product: {
        name,
        description,
        image,
        type,
        link: productlink,
        earn_in_giveaway: earnInGiveaway,
        seo_handler: productSeoHandler
      },
      win: addGiveaway ? {
        link: winLink
      } : null,
      giveaway: addGiveaway ? {
        name: giveawayName,
        rules: giveawayRules,
        gcode: giveawayCode,
        startdate: getTimeStampFromDate(startdate.split("-")),
        enddate: getTimeStampFromDate(enddate.split("-")),
        winnerAnnounceDate: getTimeStampFromDate(winnerAnnounceDate.split("-")),
        seo_handler: giveawayPageSeoHandler
      } : null
    };
    console.log(payload);
    axios({
      method: 'post',
      baseURL: BASE_SERVER_V1_API,
      headers: {"Authorization" : `Bearer ${jwt}`},
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
      <form className={classnames("m-auto", "d-flex", "flex-column", "justify-content-center", styles.form)} onSubmit={(e: React.FormEvent<HTMLFormElement>) => { handleSubmit(e) }}>
        <br />
        <input 
          name='jwt' 
          type='text'
          placeholder={"ENTER JWT HERE"}
          value={jwt}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void  => setJWT(e.target.value)}
        />
        <br />
        <br />
        <br />
        <br />
        <input 
          name='name' 
          type='text'
          placeholder={"Product Name"}
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void  => setName(e.target.value)}
        />
        <br />
        <input 
          name='description'
          type='text'
          placeholder={"Description"}
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>  setDescription(e.currentTarget.value)}
        />
        <br/>
        <input 
          name='image'
          type='text'
          placeholder={"image"}
          value={image}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setImage(e.currentTarget.value)}
        />
        <br/>
        <input 
          name='type'
          type='text'
          placeholder={"Type of Product"}
          value={type}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setType(e.currentTarget.value)}
        />
        <br />
        <input
          name='productlink'
          type='text'
          placeholder={"Product Link"}
          value={productlink}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setProductLink(e.currentTarget.value)}
        />
        <br />
        <input 
          name='productSeoHandler'
          type='text'
          placeholder='Product seo-handler'
          value={productSeoHandler}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setProductSeoHandler(e.currentTarget.value)}
        />

        <br />
        <label><span>This product has a giveaway? </span><input 
          name='addGiveaway'
          type='checkbox'
          checked={addGiveaway}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setAddGiveaway(e.currentTarget.checked)}
        />
        </label>

        {       
          addGiveaway && <>
            <br />
            <label><span>This product is itself a giveaway? </span> <input 
              name='earnInGiveaway'
              type='checkbox'
              checked={earnInGiveaway}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEarnInGiveaway(e.currentTarget.checked)}
            />
            </label>        
            <br />
            <input 
              name='winLink'
              type='text'
              placeholder={"Win Link"}
              value={winLink}
              disabled={earnInGiveaway}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setWinLink(e.currentTarget.value)}
            />
            <br />
            <input 
              name='giveawayName'
              type='text'
              placeholder='Giveaway Name'
              value={giveawayName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setGiveawayName(e.currentTarget.value)}
            />
            <br />
            <input 
              name='giveawayRules'
              type='text'
              placeholder='Giveaway Rules'
              value={giveawayRules}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setGiveawayRules(e.currentTarget.value)}
            />
            <br />
            <input 
              name='giveawayCode'
              type='text'
              placeholder='Giveaway Code'
              value={giveawayCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setGiveawayCode(e.currentTarget.value)}
            />
            <br />
            <input 
              name='startdate'
              type='date'
              placeholder='Giveaway start date'
              value={startdate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setStartdate(e.currentTarget.value)}
            />
            <br />
            <input 
              name='enddate'
              type='date'
              placeholder='Giveaway end date'
              value={enddate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEnddate(e.currentTarget.value)}
            />
            <br />
            <input 
              name='winnerAnnounceDate'
              type='date'
              placeholder='Giveaway winner announce date'
              value={winnerAnnounceDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setWinnerAnnounceDate(e.currentTarget.value)}
            />
            <br />
            <input 
              name='giveawayPageSeoHandler'
              type='text'
              placeholder='Giveaway seo-handler'
              value={giveawayPageSeoHandler}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setGiveawayPageSeoHandler(e.currentTarget.value)}
            /> 
          </>
        }
        <br />
        <input 
          type='submit' 
          value={productAdding ? AddProductFormStrings.productAddingBtnCTA: AddProductFormStrings.participateBtnCTA }
          disabled={productAdding} 
        />
      </form>
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