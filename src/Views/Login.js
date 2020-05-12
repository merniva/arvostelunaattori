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
          alert('Et ole kirjautunut sisään :(', error);
        })
      }
      const {inputs, handleInputChange, handleSubmit} = useLoginForm( login);

    return (
      <div className="flex justify-center">
        <form 
          className="w-full max-w-xs pl-3"
          onSubmit={handleSubmit}>
          <h1 className="block text-lg font-bold leading-relaxed inline-block mb-4 py-2 whitespace-no-wrap">
            Kirjaudu sisään
          </h1>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-userName">
                Käyttäjänimi
              </label>
            </div>
            <div className="md:w-2/3">
              <input type="text" name="userName" 
                className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple" 
                onChange={handleInputChange} value={inputs.userName} required />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
            <label className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Salasana
            </label>
            </div>
            <div className="md:w-2/3">
              <input type="password" name="password1" 
              className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"
              onChange={handleInputChange} value={inputs.password1} />
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
            </div>
            <div className="md:w-2/3">
              <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">Kirjaudu</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

export default Login;