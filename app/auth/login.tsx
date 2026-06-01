import { useLoginMutation } from "@/store/api/authApi";
import { setToken, setUser } from "@/store/slices/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, ScrollView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import {
  AuthFormContainer,
  AuthLink,
  Button,
  ErrorMessage,
  Form,
  Input,
  Loader,
  TitleForm,
} from "@/components";

import { loginValidationSchema } from "../../validations";

export default function AuthorizationScreen() {
  const [serverError, setServerError] = useState("");

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async ({ email, password }: any) => {
    setServerError("");

    try {
      const res = await login({ email, password }).unwrap();

      if (res.error) {
        setServerError(res.error);
        return;
      }

      dispatch(setUser(res.user));
      dispatch(setToken(res.token));

      await AsyncStorage.setItem("token", res.token);

      router.replace("/");
    } catch (err) {
      setServerError(`Ошибка сервера: ${err}`);
    }
  };

  const errorMessage =
    errors?.email?.message || errors?.password?.message || serverError;

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
            <TitleForm>Войдите в свой аккаунт на Eventify</TitleForm>

            <AuthLink
              text="Ещё нет аккаунта?"
              linkText="Зарегистрируйтесь!"
              to="/auth/register"
            />

            <Form>
              <Input
                name="email"
                control={control}
                placeholder="Введите email"
              />

              <Input
                name="password"
                control={control}
                placeholder="Введите пароль"
                secureTextEntry
              />

              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

              <Button
                backgroundColor="#C0A2E2"
                onPress={handleSubmit(onSubmit)}
              >
                Войти в аккаунт
              </Button>
            </Form>
          </AuthFormContainer>
          <Image
            source={require("../../assets/img/login.png")}
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
  },

  miniBanner: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.6,
    resizeMode: "contain",
    marginTop: 10,
  },
});
