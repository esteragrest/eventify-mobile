import * as yup from 'yup';
import { emailSchema, firstNameSchema, lastNameSchema, passwordSchema } from '../utils';

export const registerValidationSchema = yup.object().shape({
	firstName: firstNameSchema,
	lastName: lastNameSchema,
	email: emailSchema,
	password: passwordSchema,
	confirmPassword: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});
