import React, {FormEvent} from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { resetPassword } from '../services/actions/auth';
import { getCookie } from '../utils/cookie';
import { Loader } from '../ui/loader/loader';
import { useForm } from '../hooks/use-form';
import { useAppDispatch, useAppSelector } from '../services/hooks';

const ResetPasswordPage = () => {
  const { form, handleChange } = useForm({ password: '', token: ''});
  const { resetPasswordRequest } = useAppSelector(state => state.auth);
  const forgotPasswordAction = getCookie('forgotPassword');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const reset = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(resetPassword(form, navigate('/login', { replace: true } )));
  }

  if (!forgotPasswordAction) {
    return <Navigate to={'/forgot-password'} replace/>
  }

  return (
    <main className={`${styles.container}`}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      {resetPasswordRequest ?
       <Loader /> :
        <>
          <form action="#" className={styles.form} onSubmit={reset}>
            <PasswordInput
              onChange={handleChange}
              value={form.password}
              name={'password'}
              placeholder={'Введите новый пароль'}
              extraClass={'mb-6'}
            />
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={handleChange}
              value={form.token}
              name={'token'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="mb-6"
            />
            <Button
              extraClass={'mb-20'}
              htmlType="submit"
              type="primary"
              size="medium">
              Сохранить
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

export default ResetPasswordPage;