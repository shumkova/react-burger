import { useState } from 'react';

export const useForm = (inputValues) => {
  const [form, setValues] = useState(inputValues);

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({...form, [name]: value});
  }

  return {form, setValues, handleChange};
}