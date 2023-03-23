import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../services/actions/auth';
import { Loader } from '../ui/loader/loader';
import {useForm} from "../hooks/use-form";

const RegisterPage = () => {
  const { form, handleChange } = useForm({name: '', email: '', password: ''});
  const { registerRequest } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const createUser = useCallback((evt) => {
    evt.preventDefault();
    dispatch(registerThunk(form));
  }, [dispatch, form]);

  return (
    <main className={`${styles.container}`}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      {
        registerRequest ?
          <Loader /> :
          (
            <>
              <form action="#" className={styles.form} onSubmit={createUser}>
                <Input
                  type={'text'}
                  placeholder={'Имя'}
                  onChange={handleChange}
                  value={form.name}
                  name={'name'}
                  error={false}
                  errorText={'Ошибка'}
                  size={'default'}
                  extraClass={'mb-6'}
                />
                <EmailInput
                  onChange={handleChange}
                  value={form.email}
                  name={'email'}
                  isIcon={false}
                  placeholder={'E-mail'}
                  extraClass={'mb-6'}
                />
                <PasswordInput
                  onChange={handleChange}
                  value={form.password}
                  name={'password'}
                  placeholder={'Пароль'}
                  extraClass={'mb-6'}
                />
                <Button
                  extraClass={'mb-20'}
                  htmlType={'submit'}
                  type={'primary'}
                  size={'medium'}>
                  Зарегистрироваться
                </Button>
              </form>
              <p className={`${styles.option} mb-4`}>
                <span className="text text_type_main-small text_color_inactive">Уже зарегистрированы? </span>
                <Link className={'link'} to={'/login'}>Войти</Link>
              </p>
            </>
          )
      }
    </main>

  )
};

export default RegisterPage;