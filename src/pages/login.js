import React, { useCallback, useState } from 'react';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { signIn } from '../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const LoginPage = () => {
  const [form, setValue] = useState({email: '', password: ''});
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const onChange = (evt) => {
    setValue({...form, [evt.target.name]: evt.target.value});
  }

  const login = useCallback((evt) => {
    evt.preventDefault();
    dispatch(signIn(form, () => { navigate(state[0].path) }));
  }, [dispatch, form, navigate, state]);

  if (user) {
    return (
      <Navigate to={'/'} replace={true} />
    )
  }

  return (
    <main className={`${styles.container}`}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form action="#" className={styles.form} onSubmit={login}>
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
          htmlType="submit"
          type="primary"
          size="medium">
          Войти
        </Button>
      </form>
      <p className={`${styles.option} mb-4`}>
        <span className="text text_type_main-small text_color_inactive">Вы - новый пользователь? </span>
        <Link className={'link'} to={'/register'}>Зарегистрироваться</Link>
      </p>
      <p className={styles.option}>
        <span className="text text_type_main-small text_color_inactive">Забыли пароль? </span>
        <Link className={'link'} to={'/forgot-password'}>Восстановить пароль</Link>
      </p>
    </main>

  )
};

export default LoginPage;