import React, {useState} from 'react';
import { Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile-info.module.css';
import {useSelector} from "react-redux";

const ProfileInfo = () => {
  const { user } = useSelector(state => state.auth);
  const [ form, setValue ] = useState({ name: user.name || '', email: user.email || '', password: user.password || ''});

  const onChange = (evt) => {
    setValue({...form, [evt.target.name]: evt.target.value});
  };

  return (
    <section className={styles.container}>
      <form>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          icon={'EditIcon'}
          value={form.name}
          name={'name'}
          error={false}
          // onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass={'mb-6'}
        />
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={'email'}
          placeholder="Логин"
          isIcon={true}
          extraClass={'mb-6'}
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}
          icon="EditIcon"
        />
      </form>
    </section>
  )
}

export default ProfileInfo;