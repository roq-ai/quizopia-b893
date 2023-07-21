import * as yup from 'yup';

export const quizValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  organization_id: yup.string().nullable(),
});
