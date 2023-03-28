import { ChangeEvent, useState } from 'react';

export function useForm<T>(inputValues: T) {
  const [form, setValues] = useState<T>(inputValues);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setValues({...form, [name]: value});
  }

  return {form, setValues, handleChange};
}