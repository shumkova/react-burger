import React, {useCallback, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import { EmailInput, PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../services/actions/auth';
import {SWITCH_APP_SECTION} from "../services/actions/app";
import {APP_SECTION} from "../utils/consts";

const RegisterPage = () => {
  const { user } = useSelector(state => state.auth);
  const [form, setValue] = useState(null);
  const dispatch = useDispatch();

  const onChange = (evt) => {
    evt.preventDefault();
    console.log(evt.target.value);
    setValue({...form, [evt.target.name]: evt.target.value});
  }

  const createUser = useCallback((evt) => {
    evt.preventDefault();
    dispatch(register(form));
  }, [dispatch, form]);

  if (user) {
    dispatch({
      type: SWITCH_APP_SECTION,
      section: APP_SECTION.MAIN
    })
    return <Navigate to={'/'} replace={true} />
  }

  return (
    <main className={`${styles.container}`}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <form action="#" className={styles.form} onSubmit={createUser}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={form.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass={'mb-6'}
        />
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={'email'}
          isIcon={false}
          placeholder={'E-mail'}
          extraClass={'mb-6'}
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}
          placeholder={'Пароль'}
          extraClass={'mb-6'}
        />
        <Button
          extraClass={'mb-20'}
          htmlType="button"
          type="submit"
          size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className={`${styles.option} mb-4`}>
        <span className="text text_type_main-small text_color_inactive">Уже зарегистрированы? </span>
        <Link className={'link'} to={'/login'}>Войти</Link>
      </p>
    </main>

  )
};

export default RegisterPage;