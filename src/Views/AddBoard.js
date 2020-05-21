import React from 'react';
import { useAddBoard } from '../Hooks/CustomHooks';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';


const AddBoard = () => {
    let history = useHistory();
    const addBoard = () => {
     let processedInput = {...inputs};
     processedInput.table_users = processedInput.table_users.replace(/\s/g, "").split(",")
     Axios.post('http://localhost:80/React/addboard.php', processedInput)
        .then(function (response) {
          console.log(response);
          alert('Taulu lisätty, voit nyt luoda sisältöä tauluun!', response);
          history.push("/additem");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          alert('Taulun luominen ei onnistunut :(', error);
        })
      }
      const {inputs, handleInputChange, handleSubmit, fieldErrors} = useAddBoard( addBoard);
      const hasErrors = !!Object.keys(fieldErrors).length;
      const renderFieldError = field => {
        if (fieldErrors[field]) {
          return <p className="errorMsg">Please enter a valid {field}.</p>;
        }
      };
    return (
      <div className="flex justify-center">
        <form 
          className="w-full max-w-lg"
          onSubmit={handleSubmit} 
          noValidate>
          <h1 className="block text-lg tracking-wide font-bold mb-6 py-2 whitespace-no-wrap">
          Luo uusi taulu
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="md:w-2/3 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-table_name">
                Taulun nimi *
              </label>
              <input type="text" name="table_name" 
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-table_name" type="text" placeholder="Esim. Leffaklubin elokuva-arvostelut"
                onChange={handleInputChange} value={inputs.table_name} required/>
              {renderFieldError("table_name")}
              <p class="text-gray-600 text-xs justify-left italic">* Pakollinen kenttä.</p>
            </div>
            <div class="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-table_description">
                Taulun kuvaus
              </label>
              <textarea rows={5} type="text" name="table_description" 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-4" id="grid-table_description" type="text" placeholder='Esim. Klassikkoleffoja Itä- ja Kaakkois-Aasiasta'  
              onChange={handleInputChange} value={inputs.table_description} />
              {renderFieldError("table_description")}
            </div>
          <div class="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-users">
                Käyttäjien sähköpostiosoitteet
              </label>
            </div>
            <div class="w-full px-3">
            <input type="text" name="table_users" 
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-users" type="text" placeholder='Esim. ystävä1@taulutiimi.fi, ystävä2@taulutiimi.fi, ystävä3@taulutiimi.fi'  
            onChange={handleInputChange} value={inputs.table_users} />
            {renderFieldError("table_users")}
            <p class="text-gray-600 text-xs italic">Huom! Erotathan käyttäjien sähköpostiosoitteet pilkulla.</p>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-user_id">
                Käyttäjä-id
              </label>
            <input type="text" name="user_id" 
            className= "appearance-none block w-full bg-gray-200 mb-4 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-user_id" type="text" placeholder=""
            onChange={handleInputChange} value={inputs.user_id} />
            {renderFieldError("user_id")}
            </div>
            </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <button disabled={hasErrors} type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
              Luo taulu</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

export default AddBoard;