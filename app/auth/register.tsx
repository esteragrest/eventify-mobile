import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, ScrollView, StyleSheet } from "react-native";

import {
  AuthFormContainer,
  AuthLink,
  Button,
  ErrorMessage,
  Form,
  FormRow,
  Input,
  Loader,
  TitleForm,
} from "@/components";

import { registerValidationSchema } from "../../validations";

export default function RegistrationScreen() {
  const [serverError, setServerError] = useState("");
  const [isLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit = (data: any) => {
    console.log("REGISTER DATA:", data);
  };

  const errorMessage =
    errors?.firstName?.message ||
    errors?.lastName?.message ||
    errors?.email?.message ||
    errors?.password?.message ||
    errors?.confirmPassword?.message ||
    serverError;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <AuthFormContainer>
            <TitleForm>Добро пожаловать в Eventify!</TitleForm>

            <AuthLink
              text="Уже есть аккаунт?"
              linkText="Войдите в него!"
              to="/auth/login"
            />

            <Form>
              <FormRow>
                <Input
                  name="firstName"
                  control={control}
                  placeholder="Введите имя"
                  width="48%"
                />

                <Input
                  name="lastName"
                  control={control}
                  placeholder="Введите фамилию"
                  width="48%"
                />
              </FormRow>

              <Input
                name="email"
                control={control}
                placeholder="Введите email"
              />

              <FormRow>
                <Input
                  name="password"
                  control={control}
                  placeholder="Введите пароль"
                  secureTextEntry
                  width="48%"
                />

                <Input
                  name="confirmPassword"
                  control={control}
                  placeholder="Повторите пароль"
                  secureTextEntry
                  width="48%"
                />
              </FormRow>

              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

              <Button
                backgroundColor="#C0A2E2"
                onPress={handleSubmit(onSubmit)}
              >
                Зарегистрироваться
              </Button>
            </Form>
          </AuthFormContainer>

          <Image
            source={require("../../assets/img/register.png")}
            style={styles.miniBanner}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 64,
    alignItems: "center",
    gap: 20,
    marginTop: 64,
  },

  miniBanner: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.6,
    resizeMode: "contain",
    marginTop: 10,
  },
});
