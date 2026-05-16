import React, { useState } from 'react';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { formContainsEmptyValues } from '../../utils/validation';
import { parseError } from '../../utils/helperMethods';
import { notifyError } from '../../utils/toastMethods';
import { TOAST_POSITIONS } from '../../utils/constants';
import * as api from '../../api/authentication';

const { BOTTOM_CENTER } = TOAST_POSITIONS;

const Login = ({ isLoading, setIsLoading }) => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })

  const handleSubmit = () => {
    if(!formContainsEmptyValues(loginForm)) {
      setIsLoading(true)
      api.login(loginForm)
        .then(() => window.location.reload())
          .catch((err) => notifyError(parseError(err), BOTTOM_CENTER))
            .finally(() => setIsLoading(false));
    }
  }

  const handleChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  return (
    <Form id='login-form'>
      <Input 
        type="text"
        placeholder='Username'
        name='username'
        change={handleChange}
        animate
        preventSpaces
      />
      <Input
        type='password'
        placeholder='Password'
        name='password'
        change={handleChange}
        animate
        preventSpaces
      />
      <Button
        text='Login'
        id='login-button'
        click={handleSubmit}
        isPrimary
        isLoading={isLoading}
      />
    </Form>
  )
}

export default Login;