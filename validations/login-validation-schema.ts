import * as yup from 'yup';
import { emailSchema, passwordSchema } from '../utils';

export const loginValidationSchema = yup.object().shape({
	email: emailSchema,
	password: passwordSchema,
});
