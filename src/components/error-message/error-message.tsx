import React from 'react';

const ErrorMessage = () => {
  return (
    <main className={'container'} style={{textAlign: 'center'}}>
      <h1>Что-то пошло не так :(</h1>
      <p>
        В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
      </p>
    </main>
  )
}

export default ErrorMessage;