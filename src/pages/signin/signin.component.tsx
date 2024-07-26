import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useSigninStyles } from './signin.style';
import InputComponent from '../../core/shared/input/input.component';
import ButtonComponent from '../../core/shared/button/button.component';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../core/configs/axios.config';
import { Routes } from '../../router/routes';
import { errorToast, successToast } from '../../core/shared/toast/toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
const validate = (values: any) => {
  const errors: { username?: string; password?: string } = {};

  if (!values.username) {
    errors.username = 'Username is required';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

const SigninComponent = () => {
  const { main, title, buttons, form, forgotSpan, eyeIcon } = useSigninStyles();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const authenticateUser = async (userData: { username: string; password: string }) => {
    try {
      const response = await axiosInstance.get('/users', {
        params: { username: userData.username }
      });

      const user = response.data.find((user: any) =>
        (user.username === userData.username || user.email === userData.username) &&
        user.password === userData.password
      );

      if (user) {
        navigate(Routes.home);
        successToast("Logged in") 

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', user.username)
      } else {
        errorToast('Invalid username or password');
      }
    } catch (error) {
      console.error('An error occurred while trying to sign in:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      authenticateUser(values); 
    }
  });

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={main}>
      <p>Welcome to Site</p>
      <h1 className={title}>Sign in</h1>
      <form className={form} onSubmit={formik.handleSubmit}>
        <InputComponent
          name="username"
          label='Enter your username or email address'
          type="text"
          placeholder="Username or email address"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && formik.errors.username ? formik.errors.username : null}
        />
        <div style={{ position: 'relative' }}>
          <InputComponent
            name="password"
            label='Enter your Password'
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password ? formik.errors.password : null}
          />
          <span 
            onClick={handlePasswordToggle}
            className={eyeIcon}
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <span className={forgotSpan}>Forgot Password</span>
        <div className={buttons}>
          <ButtonComponent
            content="Sign in"
            btnClassName='buttonMain'
            type="submit" 
          />
          <p>OR</p>
          <ButtonComponent
            content="Sign up"
            btnClassName='buttonSecondary'
          />
        </div>
      </form>
    </div>
  );
};

export default SigninComponent;
