import React, { useState, useRef, useCallback, FormEventHandler, ChangeEvent, MouseEventHandler } from 'react';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-info.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../../services/actions/auth';
import { useForm } from '../../hooks/use-form';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { TUser } from '../../services/types/data';

const emptyUser: TUser = { name: '', email: ''};

const ProfileInfo = () => {
  const user = useAppSelector(state => state.auth.user) || emptyUser;
  const { updateUserRequest } = useAppSelector(state => state.auth);
  const { form, setValues, handleChange } = useForm<TUser & { password: string}>({ ...user, password: ''});
  const [ hasChanged, setChanged ] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    handleChange(evt);

    if (user[name as keyof TUser] !== value) {
      setChanged(true);
    }
  };

  const resetForm: MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();
    setValues({...user, password: ''});
    setChanged(false);
  }, [user, setValues]);

  const saveChanges: FormEventHandler<HTMLFormElement> = useCallback((evt) => {
    evt.preventDefault();
    dispatch(updateUser(form));
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