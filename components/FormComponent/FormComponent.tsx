import axios from 'axios';
import classnames from 'classnames';
import React from 'react';
import { useState } from 'react';
import styles from './FormComponent.module.scss';
import { generateDetailsApiRoute } from '../../config/ApiRoutes';
import { BASE_SERVER_V1_API } from '../../config/Constants';
import { ParticipateFormStrings } from './constants';

function FormComponent() {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pronoun, setPronoun] = useState<string>("");
  const [phone1, setPhone1] = useState<number>();
  const [gender, setGender] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [callingCode1, setCallingCode1] = useState<number>();
  const [participating, setParticipating] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);
  const [success, setSuccess] = useState<string|null>(null);
  // const [bio, setBio] = useState<string>("");
  // const [picture, setPicture] = useState<string>("");
  // const [username, setUsername] = useState<string>("");
  // const [dob, setDob] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    setParticipating(true);
    e.preventDefault();
    setError(null);
    setSuccess(null);
    axios({
      method: 'post',
      baseURL: BASE_SERVER_V1_API,
      url: generateDetailsApiRoute(),
      data: {
        firstname,
        lastname,
        email
      }
    }).then(response => {
      console.log(response);
      setSuccess(ParticipateFormStrings.success);
      setParticipating(false);
    })
    .catch(error => {
      setError(error.response.data.errorDetails.ererrorMsg);
      setParticipating(false);
    });
  }

  return (
    <section className={classnames(styles.formSection)}>
      <form className={classnames("m-auto", "d-flex", "flex-column", "justify-content-center", styles.form)} onSubmit={(e: React.FormEvent<HTMLFormElement>) => { handleSubmit(e) }}>
        <br />
        <select id="pronoun" name="pronoun" placeholder={"Pronoun"} onChange={(e)=>{
            setPronoun(e.currentTarget.value.split("+")[1] || "He/His/Mr.");
            setGender(e.currentTarget.value.split("+")[0] || "Male");
          }}>
          <option value="female+She/Her/Ms./Mrs.">She/Her/Ms./Mrs.</option>
          <option value="male+He/His/Mr.">He/His/Mr.</option>
        </select>
        <br />
        <input 
          name='name' 
          type='text'
          placeholder={"First Name"}
          value={firstname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void  => setFirstname(e.target.value)}
        />
        <br />
        <input 
          name='lastname'
          type='text'
          placeholder={"Last Name"}
          value={lastname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>  setLastname(e.currentTarget.value)}
        />
        <br/>
        {/* <input 
          name='username'
          type='text'
          placeholder={"UserName"}
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setUsername(e.currentTarget.value)}
        />
        <br/> */}
        <input 
          name='email'
          type='text'
          placeholder={"Email"}
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.currentTarget.value)}
        />
        <br/>
        <input 
          name='callingCode1'
          type='text'
          placeholder={"Calling Code"}
          value={callingCode1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setCallingCode1(parseInt(e.currentTarget.value))}
        />
        <br />
        <input 
          name='phone1'
          type='text'
          placeholder={"Phone"}
          value={phone1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPhone1(parseInt(e.currentTarget.value))}
        />
        <br />
        {/* <input 
          name='bio'
          type='text'
          placeholder={"Bio"}
          value={bio}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setBio(e.currentTarget.value)}
        />
        <br/> */}
        <input 
          name='city'
          type='text'
          placeholder={"City"}
          value={city}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setCity(e.currentTarget.value)}
        />
        <br/>
        <input 
          name='country'
          type='text'
          placeholder={"Country"}
          value={country}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setCountry(e.currentTarget.value)}
        />
        <br/>
        <input 
          name='address'
          type='text'
          placeholder={"Address"}
          value={address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setAddress(e.currentTarget.value)}
        />
        <br/>
        <input 
          name='state'
          type='text'
          placeholder={"State"}
          value={state}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setState(e.currentTarget.value)}
        />
        <br/>
        {/* <input 
          name='picture'
          type='text'
          placeholder={"Picture"}
          value={picture}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPicture(e.currentTarget.value)}
        />
        <br/> */}
        {/* <input
          name='dob' 
          type='date'
          placeholder={"Date Of Birth"}
          value={dob}
          onChange={e => setDob(e.target.value)}
        />
        <br/> */}
        <input 
          type='submit' 
          value={participating ? ParticipateFormStrings.participatingBtnCTA: ParticipateFormStrings.participateBtnCTA }
          disabled={participating} 
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
          <img src="https://c.tenor.com/KWfGAvAWtaQAAAAC/150rupiya-dega-dedsau-rupiya-dega.gif"/>
        </p>
        </div>
      }
    </section>
  )
}

export default FormComponent;