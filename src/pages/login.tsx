import React, { FormEvent, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { signIn } from '../services/actions/auth';
import { useForm } from '../hooks/use-form';
import { useAppDispatch } from '../services/hooks';

const LoginPage = () => {
  const { form, handleChange } = useForm({email: '', password: ''});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const login = useCallback((evt: FormEvent) => {
    evt.preventDefault();
    dispatch(signIn(form, () => { navigate(state.from, { replace: true }) }));
  }, [dispatch, form, navigate, state]);

  return (
    <main className={`${styles.container}`}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form action="#" className={styles.form} onSubmit={login}>
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