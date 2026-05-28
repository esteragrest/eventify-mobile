import * as yup from 'yup';
import { emailSchema, firstNameSchema, lastNameSchema } from '../utils';

export const eventRegistrationValidationSchema = yup.object().shape({
	firstName: firstNameSchema,
	lastName: lastNameSchema,
	email: emailSchema,
	phone: yup
		.string()
		.required('Укажите номер телефона')
		.matches(
			/^\+?\d{10,15}$/,
			'Введите корректный номер телефона в международном формате (+1234567890)',
		),
	participants: yup
		.number()
		.transform((value, originalValue) =>
			originalValue.trim() === '' ? undefined : value,
		)
		.required('Укажите количество участников')
		.min(1, 'Минимальное количество участников — 1')
		.max(100, 'Максимальное количество участников — 100'),
});
