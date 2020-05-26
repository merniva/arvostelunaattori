import React from "react";
import { useAddItem } from "../Hooks/CustomHooks";
import Axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const AddItem = () => {
  let history = useHistory();
  const addItem = () => {
    //processedInput.table_users = processedInput.table_users.replace(/\s/g, "").split(",")
    let processedInput = { ...inputs };
    processedInput.table_id = tableId;
    Axios.post("http://localhost:80/React/additem.php", processedInput)
      .then(function (response) {
        console.log(response);
        alert("Uusi kohde lisätty, voit nyt arvostella kohteen!");
        history.push(`/tables/table_id/${tableId}`);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        alert("Kohteen lisäys ei onnistunut :(", error);
      });
  };
  let { tableId } = useParams();
  const { inputs, handleInputChange, handleSubmit, fieldErrors } = useAddItem(
    addItem
  );
  const hasErrors = !!Object.keys(fieldErrors).length;
  const renderFieldError = (field) => {
    if (fieldErrors[field]) {
      return (
        <p className="errorMsg">Seuraavissa kohteissa oli virhe: {field}.</p>
      );
    }
  };
  return (
    <div className="flex justify-center">
      <form className="w-full max-w-lg" onSubmit={handleSubmit} noValidate>
        <h1 className="block text-lg tracking-wide font-bold mb-6 py-2 whitespace-no-wrap">
          Lisää arvosteltava kohde
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="md:w-2/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-item_name"
            >
              Kohteen nimi *
            </label>
            <input
              type="text"
              name="item_name"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-item_name"
              type="text"
              autoComplete="off"
              placeholder="Esim. Seitsemän samuraita"
              onChange={handleInputChange}
              value={inputs.item_name}
              required
            />
            {renderFieldError("item_name")}
            <p class="text-gray-600 text-xs justify-left italic">
              * Pakollinen kenttä.
            </p>
          </div>
          <div class="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-item_description"
            >
              Kohteen kuvaus
            </label>
            <textarea
              rows={3}
              type="text"
              name="item_description"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-4"
              id="grid-table_description"
              type="text"
              placeholder="Esim. Elokuva kertoo seitsemän samurain seikkailuista 1500-luvun japanilaiskylässä. Ohjannut Kurosawa Akira (1954)"
              onChange={handleInputChange}
              value={inputs.item_description}
            />
            {renderFieldError("item_description")}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <button
              disabled={hasErrors}
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Lisää kohde
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
