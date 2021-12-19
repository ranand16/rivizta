import axios from 'axios';
import classnames from 'classnames';
import React from 'react';
import { useState } from 'react';
import styles from './ProductForm.module.scss';
import { generateAddProductApiRoute } from '../../config/ApiRoutes';
import { BASE_SERVER_V1_API } from '../../config/Constants';
import { AddProductFormStrings } from './constants';

function ProductForm() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [productlink, setProductLink] = useState<string>("");
  const [earnInGiveaway, setEarnInGiveaway] = useState<boolean>(false);
  const [productSeoHandler, setProductSeoHandler] = useState<string>("");
  
  const [winLink, setWinLink] = useState<string>();

  const [giveawayName, setGiveawayName] = useState<string>("");
  const [giveawayRules, setGiveawayRules] = useState<Array<string>>([]);
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
    axios({
      method: 'post',
      baseURL: BASE_SERVER_V1_API,
      url: generateAddProductApiRoute(),
      data: {
        name,
        description,
        image,
        type,
        productlink,
        earnInGiveaway,
        productSeoHandler,
        winLink,
        giveawayName,
        giveawayRules,
        giveawayCode,
        startdate,
        enddate,
        winnerAnnounceDate,
        giveawayPageSeoHandler
      }
    }).then(response => {
      console.log(response);
      setSuccess(AddProductFormStrings.productSuccess(true));
      setProductAdding(false);
    })
    .catch(error => {
      setError(error.response.data.errorDetails.ererrorMsg);
      setProductAdding(false);
    });
  }

  return (
    <section className={classnames(styles.formSection)}>
      <form className={classnames("m-auto", "d-flex", "flex-column", "justify-content-center", styles.form)} onSubmit={(e: React.FormEvent<HTMLFormElement>) => { handleSubmit(e) }}>
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
          placeholder={"Email"}
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
          name='earnInGiveaway'
          type='checkbox'
          checked={earnInGiveaway}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEarnInGiveaway(e.currentTarget.checked)}
        />
        
        <br />
        <input 
          name='winLink'
          type='text'
          value={winLink}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setWinLink(e.currentTarget.value)}
        />
        <br />
        <br />
        <input 
          name='giveawayName'
          type='text'
          value={giveawayName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setGiveawayName(e.currentTarget.value)}
        />
        <br />
        <input 
            name='giveawayRules'
            type='text'
            value={giveawayRules}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                var rules = new Array<string>();
                rules.push(...e.currentTarget.value.split("."));
                setGiveawayRules(rules);
            }}
        />
        <br />
        <input 
          name='giveawayCode'
          type='text'
          value={giveawayCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setGiveawayCode(e.currentTarget.value)}
        />
        <br />
        <input 
          name='startdate'
          type='date'
          value={startdate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setStartdate(e.currentTarget.value)}
        />
        <br />
        <input 
          name='enddate'
          type='date'
          value={enddate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEnddate(e.currentTarget.value)}
        />
        <br />
        <input 
          name='winnerAnnounceDate'
          type='date'
          value={winnerAnnounceDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setWinnerAnnounceDate(e.currentTarget.value)}
        />
        <br />
        <input 
          name='giveawayPageSeoHandler'
          type='text'
          value={giveawayPageSeoHandler}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setGiveawayPageSeoHandler(e.currentTarget.value)}
        />
        <br />
        <input 
          type='submit' 
          value={productAdding ? AddProductFormStrings.productAddingBtnCTA: AddProductFormStrings.participateBtnCTA }
          disabled={productAdding} 
        />
      </form>
      {
        error && <><br/><p>{error}</p></>
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