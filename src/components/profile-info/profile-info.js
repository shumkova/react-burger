import React, { useState, useRef, useCallback } from 'react';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-info.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUserThunk } from '../../services/actions/auth';
import { useForm } from '../../hooks/use-form';

const ProfileInfo = () => {
  const { user, updateUserRequest } = useSelector(state => state.auth);
  const { form, setValues, handleChange } = useForm({ name: user.name || '', email: user.email || '', password: user.password || ''})
  const [ hasChanged, setChanged ] = useState(false);
  const nameInputRef = useRef();
  const dispatch = useDispatch();

  const onChange = (evt) => {
    const { name, value } = evt.target;
    handleChange(evt);

    if (name === 'password') {
      setChanged(true);
    } else {
      Object.keys(user).forEach((key) => {
        if (user[key] !== value) {
          setChanged(true);
        }
      })
    }
  };

  const resetForm = useCallback((evt) => {
    evt.preventDefault();
    for (const [key, value] of Object.entries(user)) {
      setValues({...form, [key]: value});
    }
    setChanged(false);
  }, [user, form, setValues]);

  const saveChanges = useCallback((evt) => {
    evt.preventDefault();
    dispatch(updateUserThunk(form));
    setChanged(false);
  }, [dispatch, form])


  return (
    <section className={styles.container}>
      <form action={'#'} onSubmit={saveChanges}>
        <Input
          extraClass={'mb-6'}
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          icon={'EditIcon'}
          value={form.name}
          name={'name'}
          // onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          ref={nameInputRef}
        />
        <EmailInput
          extraClass={'mb-6'}
          onChange={onChange}
          value={form.email}
          name={'email'}
          placeholder={'Логин'}
          isIcon={true}
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}
          icon={'EditIcon'}
        />
        {
          hasChanged && (
            <div className={`${styles.controls} mt-6`}>
              <button
                className={`${styles.cancel} text text_type_main-default`}
                type={'reset'}
                onClick={resetForm}
              >
                Отмена
              </button>
              <Button
                htmlType={'submit'}
                type={'primary'}
                size={'medium'}
                extraClass={'ml-7'}
                disabled={updateUserRequest}
              >
                Сохранить
              </Button>
            </div>
          )
        }

      </form>
    </section>
  )
}

export default ProfileInfo;