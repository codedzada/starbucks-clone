import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useAuth } from '../features/auth/AuthContext';

const resolvePendingOrder = (navigate) => {
  if (sessionStorage.getItem('pending_order')) {
    sessionStorage.removeItem('pending_order');
    navigate('/menu');
    setTimeout(() => {
      window.dispatchEvent(new Event('order-confirmed'));
    }, 300);
    return true;
  }
  return false;
};

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values.email, values.password);
      message.success('Welcome back! You have successfully signed in.');
      if (!resolvePendingOrder(navigate)) {
        navigate('/');
      }
    } catch (error) {
      message.error(error.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    initialValues,
    handleSubmit,
    keepSignedIn,
    setKeepSignedIn,
  };
};

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { register, login } = useAuth();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });

      await login(values.email, values.password);

      message.success('Account successfully created! Welcome to Starbucks.');
      resetForm();

      if (!resolvePendingOrder(navigate)) {
        navigate('/');
      }
    } catch (error) {
      message.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    initialValues,
    handleSubmit,
  };
};