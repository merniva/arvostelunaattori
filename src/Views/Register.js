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
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Käyttäjänimi</label>
          <input type="text" name="userName" onChange={handleInputChange} value={inputs.userName} required />
          {renderFieldError("userName")}
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
          {renderFieldError("email")}
        </div>
        <div>
          <label>Salasana</label>
          <input type="password" name="password1" onChange={handleInputChange} value={inputs.password1} />
          {renderFieldError("password1")}
        </div>
        <div>
          <label>Toista salasana</label>
          <input type="password" name="password2" onChange={handleInputChange} value={inputs.password2} />
          {renderFieldError("password2")}
        </div>
        <button type="submit">Rekisteröidy</button>
      </form>
    )
  }

export default Register;