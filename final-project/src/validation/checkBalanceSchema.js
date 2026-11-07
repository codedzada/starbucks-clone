import * as yup from 'yup';

export const checkBalanceInitialValues = {
  cardNumber: '',
  securityCode: '',
};

export const checkBalanceSchema = yup.object({
  cardNumber: yup
    .string()
    .length(16, 'Card number must be 16 characters long')
    .required('Please enter a card number'),

  securityCode: yup
    .string()
    .min(3, 'Please enter a valid security code')
    .max(8, 'Please enter a valid security code')
    .required('Please enter a security code'),
});