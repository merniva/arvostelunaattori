import React, {useState} from 'react';


const validationRules = {
    name: val => val && val.length >3,
    email: val => val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    password: val => val && val.length >5,
    message: val => !!val,
  };

const boardValidationRules = {
  table_name: val => val && val.length >5,
  message: val => !!val
}

const checkPassword = (password, password2) => {
    return password === password2;
}


const useRegisterForm = (callback) => {
    const [inputs, setInputs] = useState({});
    const [fieldErrors, setFieldErrors] = useState({});

    const validate = () => {
        let errors = {};
        let hasErrors = false;
        for (let key of Object.keys(inputs)) {
            if(validationRules[key]) {
                errors[key] = !validationRules[key](inputs[key]);
                hasErrors |= errors[key];
            }
        }
        const {
            password, password2
        } = inputs;
        const passwordsAreValid = checkPassword(password, password2);
        if (!passwordsAreValid) {
            errors.password2 = true;
            hasErrors |= errors.password2;
        }
        setFieldErrors(prev => ({ ...prev, ...errors }));
        return !hasErrors;
        };
    
    const handleServerResponse = (ok, msg) => {
        // ... 
        if (ok) {
            setFieldErrors({});
            setInputs({
            email: "",
            message: ""
            });
        }
        };

    const handleSubmit = (event) => {
        if (event) {
          event.preventDefault();
        }
        if(!validate()) {
            return;
        }

        callback(inputs);
      }
      const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
      }
      return {
        handleSubmit,
        handleInputChange,
        inputs,
        fieldErrors
      };
  }


export const useLoginForm = (callback) => {
    const [inputs, setInputs] = useState({});
    const handleSubmit = (event) => {
        if (event) {
          event.preventDefault();
        }
        callback(inputs);
      }
      const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
      }
      return {
        handleSubmit,
        handleInputChange,
        inputs
      };
  }

export const useAddBoard = (callback) => {
  const [inputs, setInputs] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
      let errors = {};
      let hasErrors = false;
      for (let key of Object.keys(inputs)) {
          if(boardValidationRules[key]) {
              errors[key] = !boardValidationRules[key](inputs[key]);
              hasErrors |= errors[key];
          }
      }
      setFieldErrors(prev => ({ ...prev, ...errors }));
      return !hasErrors;
      };
  
  const handleServerResponse = (ok, msg) => {
      // ... 
      if (ok) {
          setFieldErrors({});
          setInputs({
          email: "",
          message: ""
          });
      }
      };

  const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }
      if(!validate()) {
          return;
      }

      callback(inputs);
    }
    const handleInputChange = (event) => {
      event.persist();
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }
    return {
      handleSubmit,
      handleInputChange,
      inputs,
      fieldErrors
    };
}




export default useRegisterForm;