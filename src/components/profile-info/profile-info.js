import React, {useState, useRef, useCallback} from 'react';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-info.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../../services/actions/auth';

const ProfileInfo = () => {
  const { user } = useSelector(state => state.auth);
  const [ form, setValue ] = useState({ name: user.name || '', email: user.email || '', password: user.password || ''});
  const nameInputRef = useRef();
  const dispatch = useDispatch();

  const onChange = (evt) => {
    setValue({...form, [evt.target.name]: evt.target.value});
  };

  const resetForm = useCallback((evt) => {
    evt.preventDefault();
    for (const [key, value] of Object.entries(user)) {
      setValue({...form, [key]: value});
    }
  }, [user, form]);

  const saveChanges = useCallback((evt) => {
    evt.preventDefault();
    dispatch(updateUser(form));
  }, [dispatch, form])

  // useEffect(() => {
  //   const nameInput = nameInputRef.current;
  //   const nameInputWrapper = nameInput.closest('.input');
  //   const nameIcon = nameInputWrapper.querySelector('.input__icon');
  //   nameIcon.classList.remove('input__icon-disabled');
  //   nameIcon.classList.add('input__icon-action');
  //
  //   nameIcon.addEventListener('click', () => {
  //     nameInputWrapper.classList.remove('input_status_disabled');
  //     if (!nameInputWrapper.classList.contains('input_status_active')) {
  //       nameInputWrapper.classList.add('input_status_active');
  //     }
  //   })
  // }, [])

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
          >
            Сохранить
          </Button>
        </div>
      </form>
    </section>
  )
}

export default ProfileInfo;