import React from "react";
import useRegisterForm from "../Hooks/CustomHooks";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  let history = useHistory();
  const register = () => {
    Axios.post("http://localhost:80/React/register.php", inputs)
      .then(function (response) {
        console.log(response);
        alert(
          "Rekisteröityminen onnistui, voit nyt kirjautua sisään!",
          response
        );
        history.push("/login");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        alert("Rekisteröityminen ei onnistunut :(", error);
      });
  };
  const {
    inputs,
    handleInputChange,
    handleSubmit,
    fieldErrors,
  } = useRegisterForm(register);
  const renderFieldError = (field) => {
    if (fieldErrors[field]) {
      return <p className="errorMsg">Please enter a valid {field}.</p>;
    }
  };
  return (
    <div className="flex justify-center">
      <form className="w-full max-w-xs pl-3" onSubmit={handleSubmit} noValidate>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <h1 className="block text-lg font-bold leading-relaxed inline-block mb-2 py-2 whitespace-no-wrap">
              Rekisteröidy
            </h1>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-name"
            >
              {<FontAwesomeIcon icon={faUser} />}
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              name="name"
              className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"
              onChange={handleInputChange}
              autoComplete="off"
              placeholder="Anna käyttäjätunnus"
              value={inputs.name}
              required
            />
            {renderFieldError("name")}
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-name"
            >
              {<FontAwesomeIcon icon={faEnvelope} />}
            </label>
          </div>
          <div className="md:w-3/3">
            <input
              type="email"
              name="email"
              className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"
              onChange={handleInputChange}
              value={inputs.email}
              placeholder="Anna sähköpostiosoite"
              autoComplete="off"
              required
            />
            {renderFieldError("email")}
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-password"
            >
              {<FontAwesomeIcon icon={faLock} />}
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="password"
              name="password"
              className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"
              onChange={handleInputChange}
              placeholder="Anna salasanasi"
              value={inputs.password}
            />
            {renderFieldError("password")}
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-password2"
            >
              {<FontAwesomeIcon icon={faLock} />}
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="password"
              name="password2"
              className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"
              onChange={handleInputChange}
              placeholder="Toista salasana"
              value={inputs.password2}
            />
            {renderFieldError("password2")}
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full"
            >
              Rekisteröidy
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
