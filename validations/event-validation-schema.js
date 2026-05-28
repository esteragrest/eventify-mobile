import * as yup from 'yup';

export const eventValidationSchema = yup.object().shape({
	photo: yup
		.mixed()
		.required('Фото обязательно')
		.test(
			'isValidFileOrUrl',
			'Файл должен быть изображением (jpg, jpeg, png) или ссылкой',
			(value) => {
				if (!value) return false;

				if (typeof value === 'string') {
					return value.startsWith('http://') || value.startsWith('https://');
				}

				return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
			},
		),
	title: yup
		.string()
		.required('Название мероприятия обязательно')
		.min(3, 'Название должно содержать минимум 3 символа')
		.max(50, 'Название должно содержать не более 50 символов'),
	description: yup
		.string()
		.required('Описание мероприятия обязательно')
		.max(1000, 'Описание не должно превышать 1000 символов'),
	age_limit: yup
		.string()
		.required('Возрастное ограничение обязательно')
		.oneOf(
			['no_limit', '14+', '16+', '18+'],
			'Недопустимое значение возрастного ограничения',
		),
	payment: yup
		.string()
		.required('Тип оплаты обязателен')
		.oneOf(['free', 'paid'], 'Недопустимое значение типа оплаты'),
	event_date: yup
		.string()
		.required('Дата обязательна')
		.matches(/^\d{4}-\d{2}-\d{2}$/, 'Дата должна быть в формате YYYY-MM-DD')
		.test('isValidDate', 'Дата не может быть меньше текущей', (value) => {
			if (!value) return false;
			return new Date(value) >= new Date();
		}),
	event_time: yup.string().required('Время обязательно'),
	address: yup.string().required('Адрес обязателен'),
	type: yup.boolean(),
	max_participants: yup
		.number()
		.transform((value, originalValue) => {
			if (typeof originalValue === 'string') {
				return originalValue.trim() === '' ? undefined : Number(originalValue);
			}
			return originalValue;
		})
		.min(1, 'Минимальное количество участников — 1'),
});
