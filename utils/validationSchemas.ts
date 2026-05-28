import * as yup from 'yup';

export const firstNameSchema = yup
	.string()
	.required('Заполните имя пользователя')
	.matches(
		/^[А-Яа-яЁёA-Za-z]+$/,
		'Имя может содержать только русские или латинские буквы',
	)
	.min(2, 'Имя должно содержать минимум 2 символа')
	.max(20, 'Имя может содержать максимум 20 символов');

export const lastNameSchema = yup
	.string()
	.matches(
		/^[А-Яа-яЁёA-Za-z]+$|^$/,
		'Фамилия может содержать только русские или латинские буквы',
	)
	.max(20, 'Фамилия может содержать максимум 20 символов');

export const emailSchema = yup
	.string()
	.required('Заполните email')
	.email('Введите корректный email');

export const passwordSchema = yup
	.string()
	.required('Введите пароль')
	.min(6, 'Пароль должен быть не менее 6 символов')
	.max(32, 'Пароль должен быть не более 32 символов');
