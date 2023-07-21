import * as yup from 'yup';

export const participantValidationSchema = yup.object().shape({
  joined_at: yup.date().required(),
  left_at: yup.date(),
  user_id: yup.string().nullable(),
  quiz_id: yup.string().nullable(),
});
