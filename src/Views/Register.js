import React from 'react';
import useRegisterForm from '../Hooks/CustomHooks';


const Register = () => {
    const register = () => {
        alert(`Käyttäjänimi luotu!
               Name: ${inputs.userName}
               Email: ${inputs.email}`);
      }
      const {inputs, handleInputChange, handleSubmit, fieldErrors} = useRegisterForm( register);
      const renderFieldError = field => {
        if (fieldErrors[field]) {
          return <p className="errorMsg">Please enter a valid {field}.</p>;
        }
      };
    return (
      <div className="flex justify-center">
        <form 
          className="w-full max-w-xs pl-3"
          onSubmit={handleSubmit} noValidate>
          <h1 className="block text-lg font-bold leading-relaxed inline-block mb-4 py-2 whitespace-no-wrap">
          Rekisteröidy
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
              {renderFieldError("userName")}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-email">
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input type="email" name="email" 
              className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"  
              onChange={handleInputChange} value={inputs.email} required />
              {renderFieldError("email")}
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password1">
                Salasana
              </label>
            </div>
            <div className="md:w-2/3">
            <input type="password" name="password1" 
            className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"  
            onChange={handleInputChange} value={inputs.password1} />
            {renderFieldError("password1")}
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password2">
                Toista salasana
              </label>
            </div>
            <div className="md:w-2/3">
            <input type="password" name="password2" 
            className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"   
            onChange={handleInputChange} value={inputs.password2} />
            {renderFieldError("password2")}
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
            </div>
            <div className="md:w-2/3">
              <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
              Rekisteröidy</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

export default Register;