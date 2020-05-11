import React from 'react';
import { useLoginForm } from '../Hooks/CustomHooks';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';

const Login = ({ setLoginStatus }) => {
    let history = useHistory();
    const login = (inputs) => {
        console.log(inputs)
      Axios.post('http://localhost:5000/login_json', inputs)
        .then(function (response) {
          if (response.data.status_code !== 200) {
            throw new Error("Virhe!")
          }
          // handle success
          console.log(response);
          alert('Olet kirjautunut sisään!', response);
          setLoginStatus(true);
          history.push("/profile");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          alert('Et ole kirjautunut sisään!', error);
        })
      }
      const {inputs, handleInputChange, handleSubmit} = useLoginForm( login);
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Käyttäjänimi</label>
          <input type="text" name="userName" onChange={handleInputChange} value={inputs.userName} required />
        </div>
        <div>
          <label>Salasana</label>
          <input type="password" name="password1" onChange={handleInputChange} value={inputs.password1} />
        </div>
        <button type="submit">Kirjaudu</button>
      </form>
    )
  }

export default Login;