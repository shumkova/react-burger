import React, { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { forgotPassword } from '../services/actions/auth';
import { Loader } from '../ui/loader/loader';
import { useAppDispatch, useAppSelector } from '../services/hooks';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const { forgotPasswordRequest } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useRef<HTMLFormElement>(null);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  }

  const restore = useCallback((evt: FormEvent) => {
    evt.preventDefault();
    dispatch(forgotPassword(email, () => { navigate('/reset-password', {replace: true}) }));
  }, [email, dispatch, navigate]);

  return (
    <main className={`${styles.container}`}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      {forgotPasswordRequest ?
        <Loader /> :
        <>
          <form className={styles.form} onSubmit={restore} ref={form}>
            <EmailInput
              onChange={onChange}
              value={email}
              name={'email'}
              isIcon={false}
              placeholder={'E-mail'}
              extraClass={'mb-6'}
            />
            <Button
              extraClass={'mb-20'}
              htmlType="submit"
              type="primary"
              size="medium">
              Восстановить
            </Button>
          </form>

          <p className={`${styles.option} mb-4`}>
            <span className="text text_type_main-small text_color_inactive">Вспомнили пароль? </span>
            <Link className={'link'} to={'/login'}>Войти</Link>
          </p>
        </>
      }
    </main>
  )
};

export default ForgotPasswordPage;