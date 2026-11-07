import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Please enter your username or email address.'),
  password: yup
    .string()
    .required('Please enter your password.'),
});

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required('Please enter your first name.'),
  lastName: yup
    .string()
    .trim()
    .required('Please enter your last name.'),
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Please enter a username or email address.'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters.')
    .required('Please create a password.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match.')
    .required('Please confirm your password.'),
  agreeToTerms: yup
    .boolean()
    .oneOf([true], 'You must agree to the terms of use to create an account.')
    .required('You must agree to the terms of use to create an account.'),
});