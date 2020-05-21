import React from 'react';
import { useLoginForm } from '../Hooks/CustomHooks';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

const Login = ({ setLoginStatus }) => {
    let history = useHistory();
    const login = (inputs) => {
        console.log(inputs)
      Axios.post('http://localhost:80/React/login.php', inputs)
        .then(function (response) {
          // handle success
          console.log(response);
          alert('Olet kirjautunut sisään!', response);
          setLoginStatus(true);
          history.push("/profile");
          let jwt = response.data.jwt;
          let expire_at = response.data.expireAt;

          localStorage.setItem("access_token", jwt);
          localStorage.setItem("expire_at", expire_at);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          alert('Et ole kirjautunut sisään :(', error);
        })
      }
      const {inputs, handleInputChange, handleSubmit} = useLoginForm( login);

    return (
      <div className="flex justify-center">
        <form 
          className="w-full max-w-xs pl-3"
          onSubmit={handleSubmit}>
          <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
          </div>
          <div className="md:w-2/3">
            <h1 className="block text-lg font-bold leading-relaxed inline-block mb-2 py-2 whitespace-no-wrap">
              Kirjaudu sisään
            </h1>
          </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-name">
              {<FontAwesomeIcon 
                    icon={faUser}
                />}
              </label>
            </div>
            <div className="md:w-2/3">
              <input type="text" name="name" 
                className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"
                placeholder="Kirjoita käyttäjänimesi" 
                onChange={handleInputChange} value={inputs.name} required />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
            <label className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            {<FontAwesomeIcon 
                    icon={faLock}
                />}
            </label>
            </div>
            <div className="md:w-2/3">
              <input type="password" name="password" 
              className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"
              placeholder="Kirjoita salasanasi" 
              onChange={handleInputChange} value={inputs.password} />
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
            </div>
            <div className="md:w-2/3">
              <button type="submit" className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full">Kirjaudu</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

export default Login;