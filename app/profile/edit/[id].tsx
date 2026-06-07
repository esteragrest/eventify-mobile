import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
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
import { convertDate } from "@/utils";
import { userDataValidationShema } from "@/validations";

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
      birth_date: convertDate(user?.birthDate) || "",
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
        birth_date: convertDate(user?.birthDate) || "",
      });
    }
  }, [user, reset]);

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
    (errors as any)?.photo?.message ||
    (errors as any)?.first_name?.message ||
    (errors as any)?.last_name?.message ||
    (errors as any)?.birth_date?.message ||
    (errors as any)?.email?.message ||
    (errors as any)?.phone?.message;

  if (!user) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TitleForm>Редактирование профиля</TitleForm>

      <Form>
        <FileInput
          register={null}
          setValue={(name: string, value: any) => setValue(name as any, value)}
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
          value={convertDate(user?.birthDate) || undefined}
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
