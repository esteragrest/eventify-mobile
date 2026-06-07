import * as yup from "yup";
import { emailSchema, firstNameSchema, lastNameSchema } from "../utils";

export const userDataValidationShema = yup.object().shape({
  photo: yup
    .string()
    .nullable()
    .test(
      "isValidFileOrUrl",
      "Файл должен быть изображением (jpg, jpeg, png) или ссылкой",
      (value) => {
        if (!value) return false;

        if (value.startsWith("http://") || value.startsWith("https://")) {
          return true;
        }

        return /\.(jpg|jpeg|png|webp)$/i.test(value);
      },
    ),
  birth_date: yup
    .string()
    .test("isValidDate", "Дата должна быть в формате YYYY-MM-DD", (value) => {
      if (!value) return true;
      return /^\d{4}-\d{2}-\d{2}$/.test(value);
    })
    .test("isPastDate", "Дата рождения не может быть в будущем", (value) => {
      if (!value) return true;
      const selectedDate = new Date(value);
      const today = new Date();
      return selectedDate <= today;
    }),
  first_name: firstNameSchema,
  last_name: lastNameSchema,
  email: emailSchema,
  phone: yup
    .string()
    .nullable()
    .test(
      "isValidPhone",
      "Введите корректный номер телефона в международном формате (+1234567890)",
      (value) => {
        if (!value) return true;
        return /^\+?\d{10,15}$/.test(value);
      },
    ),
});
