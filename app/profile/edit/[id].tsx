// import { yupResolver } from "@hookform/resolvers/yup";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { ScrollView, StyleSheet } from "react-native";

// import {
//   Button,
//   DateTimeInput,
//   ErrorMessage,
//   FileInput,
//   Form,
//   FormRow,
//   Input,
//   TitleForm,
// } from "@/components";

// import { useUpdateUserMutation } from "@/store/api/usersApi";
// import { userDataValidationShema } from "@/validations";

// export default function ProfileEditScreen() {
//   const router = useRouter();
//   const params = useLocalSearchParams();

//   const { id, firstName, lastName, birthDate, email, phone, photo } = params;

//   const [successOpen, setSuccessOpen] = useState(false);
//   const [errorOpen, setErrorOpen] = useState(false);

//   const [updateUser] = useUpdateUserMutation();

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       photo: photo || "",
//       first_name: firstName || "",
//       last_name: lastName || "",
//       email: email || "",
//       phone: phone || "",
//       birth_date: birthDate || "",
//     },
//     resolver: yupResolver(userDataValidationShema),
//   });

//   useEffect(() => {
//     if (birthDate) {
//       setValue("birth_date", birthDate);
//     }
//   }, [birthDate]);

//   const onSubmit = async (form: any) => {
//     try {
//       const payload: any = {
//         first_name: form.first_name,
//         last_name: form.last_name || "",
//         email: form.email,
//         phone: form.phone,
//         birth_date: form.birth_date,
//       };

//       // если фото изменилось
//       if (form.photo && form.photo !== photo) {
//         payload.photo = { uri: form.photo };
//       }

//       await updateUser({
//         id: Number(id),
//         data: payload,
//       }).unwrap();

//       setSuccessOpen(true);
//       reset();

//       setTimeout(() => router.back(), 800);
//     } catch (err) {
//       console.log("Ошибка обновления:", err);
//       setErrorOpen(true);
//     }
//   };

//   const formError =
//     errors?.photo?.message ||
//     errors?.first_name?.message ||
//     errors?.last_name?.message ||
//     errors?.birth_date?.message ||
//     errors?.email?.message ||
//     errors?.phone?.message;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <TitleForm>Редактирование профиля</TitleForm>

//       <Form>
//         <FileInput
//           register={null}
//           setValue={setValue}
//           defaultImage={photo as string}
//         />

//         <FormRow>
//           <Input
//             name="first_name"
//             control={control}
//             placeholder="Ваше имя"
//             width="48%"
//           />
//           <Input
//             name="last_name"
//             control={control}
//             placeholder="Ваша фамилия"
//             width="48%"
//           />
//         </FormRow>

//         <Input name="email" control={control} placeholder="Ваш email" />
//         <Input name="phone" control={control} placeholder="Ваш телефон" />

//         <DateTimeInput
//           type="date"
//           label="Дата рождения"
//           value={birthDate as string}
//           onChange={(date) => {
//             const formatted = date.toISOString().split("T")[0];
//             setValue("birth_date", formatted);
//           }}
//         />

//         {formError && <ErrorMessage>{formError}</ErrorMessage>}

//         <Button backgroundColor="#C0A2E2" onPress={handleSubmit(onSubmit)}>
//           Сохранить
//         </Button>
//       </Form>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     gap: 20,
//   },
// });

import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  DateTimeInput,
  ErrorMessage,
  FileInput,
  Form,
  FormRow,
  Input,
  TitleForm,
} from "@/components";

import { useGetUserProfileQuery, useUpdateUserMutation } from "@/store/api";
import { updateUserData } from "@/store/slices";
import { userDataValidationShema } from "@/validations";
import { View } from "react-native-reanimated/lib/typescript/Animated";

export default function ProfileEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();

  const userId = Number(id);

  const currentUser = useSelector((state: any) => state.user.user);

  const isSelf = currentUser?.id === userId;

  const { data: profileData } = useGetUserProfileQuery(userId, {
    skip: isSelf,
  });

  const user = isSelf ? currentUser : profileData?.user;

  const [updateUser] = useUpdateUserMutation();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      photo: user?.photo || "",
      first_name: user?.firstName || "",
      last_name: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      birth_date: user?.birthDate || "",
    },
    resolver: yupResolver(userDataValidationShema),
  });

  useEffect(() => {
    if (user) {
      reset({
        photo: user.photo || "",
        first_name: user.firstName || "",
        last_name: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        birth_date: user.birthDate || "",
      });
    }
  }, [user]);

  const onSubmit = async (form: any) => {
    try {
      const payload: any = {
        first_name: form.first_name,
        last_name: form.last_name || "",
        email: form.email,
        phone: form.phone,
        birth_date: form.birth_date,
      };

      if (form.photo && form.photo !== user.photo) {
        payload.photo = { uri: form.photo };
      }

      const res = await updateUser({
        id: userId,
        data: payload,
      }).unwrap();

      dispatch(updateUserData(res.user));

      router.back();
    } catch (err) {
      console.log("Ошибка обновления:", err);
    }
  };

  const formError =
    errors?.photo?.message ||
    errors?.first_name?.message ||
    errors?.last_name?.message ||
    errors?.birth_date?.message ||
    errors?.email?.message ||
    errors?.phone?.message;

  if (!user) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TitleForm>Редактирование профиля</TitleForm>

      <Form>
        <FileInput
          register={null}
          setValue={(name, value) => setValue(name as any, value)}
          defaultImage={user.photo}
        />

        <FormRow>
          <Input
            name="first_name"
            control={control}
            placeholder="Ваше имя"
            width="48%"
          />
          <Input
            name="last_name"
            control={control}
            placeholder="Ваша фамилия"
            width="48%"
          />
        </FormRow>

        <Input name="email" control={control} placeholder="Ваш email" />
        <Input name="phone" control={control} placeholder="Ваш телефон" />

        <DateTimeInput
          type="date"
          label="Дата рождения"
          value={user.birthDate || undefined}
          onChange={(date) => {
            const formatted = date.toISOString().split("T")[0];
            setValue("birth_date", formatted);
          }}
        />

        {formError && <ErrorMessage>{formError}</ErrorMessage>}

        <View style={styles.editButton}>
          <Button backgroundColor="#C0A2E2" onPress={handleSubmit(onSubmit)}>
            Сохранить
          </Button>
        </View>
      </Form>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  editButton: {
    marginTop: 12,
  },
});
