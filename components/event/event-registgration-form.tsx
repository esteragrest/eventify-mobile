import { Button, ErrorMessage, FormRow, Input } from "@/components";
import { eventRegistrationValidationSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

interface EventRegistrationFormProps {
  eventId: number;
}

export const EventRegistrationForm = ({
  eventId,
}: EventRegistrationFormProps) => {
  const [serverError, setServerError] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      participants: 1,
    },
    resolver: yupResolver(eventRegistrationValidationSchema),
  });

  const fakeSubmit = (data: any) => {
    console.log("FAKE REGISTRATION:", { eventId, ...data });
    reset();
  };

  const onSubmit = (form: any) => {
    const newRegistration = {
      first_name: form.firstName,
      last_name: form.lastName || null,
      email: form.email,
      phone: form.phone,
      participants_count: Number(form.participants),
    };

    fakeSubmit(newRegistration);
  };

  const formError =
    (errors as any)?.firstName?.message ||
    (errors as any)?.lastName?.message ||
    (errors as any)?.email?.message ||
    (errors as any)?.phone?.message ||
    (errors as any)?.participants?.message;

  const errorMessage = formError || serverError;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Заполните форму, чтобы принять участие:</Text>

      <View style={styles.form}>
        <FormRow>
          <Input
            name="firstName"
            control={control}
            placeholder="Ваше имя"
            width="50%"
          />

          <Input
            name="lastName"
            control={control}
            placeholder="Ваша фамилия"
            width="50%"
          />
        </FormRow>

        <Input name="email" control={control} placeholder="Ваш email" />

        <Input name="phone" control={control} placeholder="Ваш телефон" />

        <Input
          name="participants"
          control={control}
          placeholder="Количество участников"
          keyboardType="numeric"
        />

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Button backgroundColor="#E8FF59" onPress={handleSubmit(onSubmit)}>
          Принять участие
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
    flexDirection: "column",
    gap: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  form: {
    width: "100%",
    flexDirection: "column",
    gap: 12,
  },
});
