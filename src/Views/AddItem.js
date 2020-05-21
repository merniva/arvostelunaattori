import React from 'react';
import { useAddItem } from '../Hooks/CustomHooks';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';


const AddItem = () => {
    let history = useHistory();
    const addItem = () => {
     //processedInput.table_users = processedInput.table_users.replace(/\s/g, "").split(",")
     Axios.post('http://localhost:80/React/additem.php', inputs)
        .then(function (response) {
          console.log(response);
          alert('Uusi kohde lisätty, voit nyt arvostella kohteen!', response);
          history.push("/addreview");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          alert('Kohteen lisäys ei onnistunut :(', error);
        })
      }
      const {inputs, handleInputChange, handleSubmit, fieldErrors} = useAddItem( addItem);
      const hasErrors = !!Object.keys(fieldErrors).length;
      const renderFieldError = field => {
        if (fieldErrors[field]) {
          return <p className="errorMsg">Seuraavissa kohteissa oli virhe: {field}.</p>;
        }
      };
    return (
      <div className="flex justify-center">
        <form 
          className="w-full max-w-lg"
          onSubmit={handleSubmit} 
          noValidate>
          <h1 className="block text-lg tracking-wide font-bold mb-6 py-2 whitespace-no-wrap">
          Lisää arvosteltava kohde
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="md:w-2/3 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-item_name">
                Kohteen nimi *
              </label>
              <input type="text" name="item_name" 
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-item_name" type="text" placeholder="Esim. Seitsemän samuraita"
                onChange={handleInputChange} value={inputs.item_name} required/>
              {renderFieldError("item_name")}
              <p class="text-gray-600 text-xs justify-left italic">* Pakollinen kenttä.</p>
            </div>
            <div class="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-item_description">
                Kohteen kuvaus
              </label>
              <textarea rows={3} type="text" name="item_description" 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-4" id="grid-table_description" type="text" placeholder='Esim. Elokuva kertoo seitsemän samurain seikkailuista 1500-luvun japanilaiskylässä. Ohjannut Kurosawa Akira (1954)'  
              onChange={handleInputChange} value={inputs.item_description} />
              {renderFieldError("item_description")}
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-table_id">
                Taulu-id
              </label>
            <input type="text" name="table_id" 
            className= "appearance-none block w-full bg-gray-200 mb-4 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-table_id" type="text" placeholder="Esim. 24"
            onChange={handleInputChange} value={inputs.table_id} />
            {renderFieldError("table_id")}
            </div>
            </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <button disabled={hasErrors} type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
              Lisää kohde</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

export default AddItem;