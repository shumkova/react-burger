import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import { resetPasswordRequest } from '../services/auth-api';

const ResetPasswordPage = () => {
  const [form, setValue] = useState({ password: '', code: ''});
  const navigate = useNavigate();

  const onChange = (evt) => {
    setValue({...form, [evt.target.name]: evt.target.value});
  }

  const reset = (evt) => {
    evt.preventDefault();
    resetPasswordRequest(form)
      .then(() => {
        navigate('/login', { replace: true });
      })
  }

  return (
    <main className={`${styles.container}`}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <form action="#" className={styles.form} onSubmit={reset}>
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}
          placeholder={'Введите новый пароль'}
          extraClass={'mb-6'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChange}
          value={form.code}
          name={'code'}
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
    </main>

  )
};

export default ResetPasswordPage;