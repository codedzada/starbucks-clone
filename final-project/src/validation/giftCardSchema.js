import * as yup from 'yup';

export const giftCardInitialValues = {
  amount: 25,
  customAmount: '',
  isCustomAmount: false,
  recipients: [{ name: '', email: '' }],
  personalNote: '',
  senderName: '',
  senderEmail: '',
};

export const giftCardSchema = yup.object({
  amount: yup.number().required('Please select an amount'),
  isCustomAmount: yup.boolean(),
  customAmount: yup.mixed().when('isCustomAmount', {
    is: true,
    then: (schema) =>
      schema
        .required('Please enter an amount')
        .test('is-number', 'Amount must be a number', (val) => {
          if (!val) return false;
          const parsed = parseFloat(val);
          return !isNaN(parsed);
        })
        .test('min-max', 'Amount must be between $5 and $500', (val) => {
          const parsed = parseFloat(val);
          return parsed >= 5 && parsed <= 500;
        }),
    otherwise: (schema) => schema.notRequired(),
  }),
  recipients: yup
    .array()
    .of(
      yup.object({
        name: yup
          .string()
          .required("Please enter the recipient's name")
          .max(60, "Name must be 60 characters or less"),
        email: yup
          .string()
          .required("Please enter the recipient's email")
          .email("Please enter the recipient's email"),
      })
    )
    .min(1, 'At least one recipient is required')
    .max(10, 'Maximum of 10 recipients'),
  personalNote: yup
    .string()
    .max(160, 'Personal note must be 160 characters or less')
    .optional(),
  senderName: yup
    .string()
    .required("Please enter the sender's name")
    .max(60, 'Name must be 60 characters or less'),
  senderEmail: yup
    .string()
    .required("Please enter the sender's email")
    .email("Please enter a valid email address"),
});
