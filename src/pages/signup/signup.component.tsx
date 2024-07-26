import { useFormik, FormikErrors } from 'formik';
import axiosInstance from '../../core/configs/axios.config';
import { useSignupStyles } from './signup.style';
import InputComponent from '../../core/shared/input/input.component';
import ButtonComponent from '../../core/shared/button/button.component';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../router/routes';
import { errorToast, successToast } from '../../core/shared/toast/toast';
import { SignupFormValues } from './signup';



const validate = (values: SignupFormValues) => {
  const errors: FormikErrors<SignupFormValues> = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.username) {
    errors.username = 'Username is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  if (!values.contactNumber) {
    errors.contactNumber = 'Contact Number is required';
  }

  return errors;
};

const SignupComponent = () => {
  const classes = useSignupStyles();

  const addUser = async (userData: SignupFormValues) => {
    try {
      const response = await axiosInstance.get('/users');
      const users = response.data;
      const emailExists = users.some((user: SignupFormValues) => user.email === userData.email);

      if (emailExists) {
        errorToast('User already exists with this email!');
      }

      await axiosInstance.post('/users', userData);
      formik.resetForm();
    successToast('Signup successful!');
    } catch (error) {
      errorToast('An error occurred during signup.');
    }
  };

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      email: '',
      username: '',
      password: '',
      contactNumber: ''
    },
    validate,
    onSubmit: (values) => {
      addUser(values); 
    }
  });

  return (
    <div className={classes.main}>
      <div className={classes.signUpHeader}>
        <p>Welcome to Site</p>
        <div>
          <p>Have an Account?</p>
          <NavLink className={classes.signUptoSingIn} to={'/'+Routes.signin}>Sign in</NavLink>
        </div>
      </div>
      <h1 className={classes.title}>Sign up</h1>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <InputComponent
          name="email"
          label="Enter your email address here"
          type="text"
          placeholder="Email address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email ? formik.errors.email : null}
        />
        <div className={classes.signUpAdditionalFormItem}>
          <InputComponent
            name="username"
            label="Enter username"
            type="text"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && formik.errors.username ? formik.errors.username : null}
          />
          <InputComponent
            name="contactNumber"
            label="Contact Number"
            type="text"
            placeholder="Contact Number"
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.contactNumber && formik.errors.contactNumber ? formik.errors.contactNumber : null}
          />
        </div>
        <InputComponent
          name="password"
          label="Enter your Password"
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password ? formik.errors.password : null}
        />
        <div className={classes.buttons}>
          <ButtonComponent type='submit' content="Sign up" btnClassName="buttonMain" />
        </div>
      </form>
    </div>
  );
};

export default SignupComponent;
