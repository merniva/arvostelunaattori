import React, { useState } from "react";
import { useAddReview } from "../Hooks/CustomHooks";
import Axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

function Rater({ onChange, name }) {
  const [rating, changeRating] = useState(0.0);
  return (
    <StarRatings
      rating={rating}
      starHoverColor="#F6AD55"
      starRatedColor="#F6AD55"
      changeRating={(value) => {
        let result = { target: { value, name }, persist: () => {} };
        console.log(value);
        changeRating(value);
        onChange(result);
      }}
      numberOfStars={5}
      name="rating"
    />
  );
}

const AddReview = () => {
  let history = useHistory();
  const addReview = () => {
    //processedInput.table_users = processedInput.table_users.replace(/\s/g, "").split(",")
    let processedInput = { ...inputs };
    processedInput.item_id = itemId;
    processedInput.table_id = tableId;
    processedInput.user_id = localStorage.getItem("userid");
    Axios.post("http://localhost:80/React/addreview.php", processedInput)
      .then(function (response) {
        console.log(response);
        alert("Arvostelu lisätty!", response);
        history.push(`/tables/table_id/${tableId}`);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        alert("Arvostelun lisääminen ei onnistunut!", error);
      });
  };
  let { itemId, tableId } = useParams();
  const { inputs, handleInputChange, handleSubmit, fieldErrors } = useAddReview(
    addReview
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
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <h1 className="block text-lg tracking-wide font-bold mb-6 py-2 whitespace-no-wrap">
          Lisää uusi arvostelu
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-item_rating"
            >
              Arvostelusi
            </label>
            <Rater name="item_rating" onChange={handleInputChange}/>
            {renderFieldError("item_rating")}
          </div>
          <div class="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-6"
              for="grid-item_comment"
            >
              Kommenttisi
            </label>
            <textarea
              rows={3}
              type="text"
              name="item_comment"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-4"
              id="grid-table_description"
              type="text"
              autocomplete="off"
              placeholder="Esim. Hyvä leffa, mutta aika pitkä"
              onChange={handleInputChange}
              value={inputs.item_comment}
            />
            {renderFieldError("item_comment")}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full mt-2 px-3 lg:w-1/3 xl:w-1/3">
            <button
              disabled={hasErrors}
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Lisää arvostelu
            </button>
          </div>
          <div className="w-full mt-2 px-3 lg:w-2/3 xl:w-2/3">
            <button
              type="back"
              className="bg-white hover:bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-full"
              onClick={()=>history.goBack()}
            >
              Takaisin
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
