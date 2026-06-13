// import { Button, ErrorMessage, FormRow, Input } from "@/components";
// import { eventRegistrationValidationSchema } from "@/validations";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { StyleSheet, Text, View } from "react-native";
// import { useSelector } from "react-redux";

// import { useRegisterForEventMutation } from "@/store/api/registrationsApi";
// import { ErrorModal, SuccessModal } from "./modals";

// interface EventRegistrationFormProps {
//   eventId: number;
// }

// export const EventRegistrationForm = ({
//   eventId,
// }: EventRegistrationFormProps) => {
//   const user = useSelector((state: any) => state.user.user);
//   const userId = user?.id;

//   const [serverError, setServerError] = useState("");
//   const [successOpen, setSuccessOpen] = useState(false);
//   const [errorOpen, setErrorOpen] = useState(false);

//   const [registerForEvent] = useRegisterForEventMutation();

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       participants: 1,
//     },
//     resolver: yupResolver(eventRegistrationValidationSchema),
//   });

//   const onSubmit = async (form: any) => {
//     try {
//       const res = await registerForEvent({
//         eventId,
//         userId,
//         firstName: form.firstName,
//         lastName: form.lastName || null,
//         email: form.email,
//         phone: form.phone,
//         participants: Number(form.participants),
//       }).unwrap();

//       if (res.error) {
//         setErrorOpen(true);
//         return;
//       }

//       setSuccessOpen(true);
//       reset();
//     } catch (err) {
//       setErrorOpen(true);
//     }
//   };

//   const formError =
//     errors?.firstName?.message ||
//     errors?.lastName?.message ||
//     errors?.email?.message ||
//     errors?.phone?.message ||
//     errors?.participants?.message;

//   const errorMessage = formError || serverError;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Заполните форму, чтобы принять участие:</Text>

//       <View style={styles.form}>
//         <FormRow>
//           <Input
//             name="firstName"
//             control={control}
//             placeholder="Ваше имя"
//             width="50%"
//           />

//           <Input
//             name="lastName"
//             control={control}
//             placeholder="Ваша фамилия"
//             width="50%"
//           />
//         </FormRow>

//         <Input name="email" control={control} placeholder="Ваш email" />
//         <Input name="phone" control={control} placeholder="Ваш телефон" />

//         <Input
//           name="participants"
//           control={control}
//           placeholder="Количество участников"
//           keyboardType="numeric"
//         />

//         {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

//         <Button backgroundColor="#E8FF59" onPress={handleSubmit(onSubmit)}>
//           Принять участие
//         </Button>
//       </View>

//       <SuccessModal
//         isOpen={successOpen}
//         onClose={() => setSuccessOpen(false)}
//       />
//       <ErrorModal isOpen={errorOpen} onClose={() => setErrorOpen(false)} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     marginTop: 20,
//     flexDirection: "column",
//     gap: 15,
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: "600",
//   },

//   form: {
//     width: "100%",
//     flexDirection: "column",
//   },
// });

import { Button, ErrorMessage, FormRow, Input } from "@/components";
import { eventRegistrationValidationSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useRegisterForEventMutation } from "@/store/api/registrationsApi";

interface EventRegistrationFormProps {
  eventId: number;
  onSuccess: () => void;
  onError: () => void;
}

export const EventRegistrationForm = ({
  eventId,
  onSuccess,
  onError,
}: EventRegistrationFormProps) => {
  const user = useSelector((state: any) => state.user.user);
  const userId = user?.id;

  const [registerForEvent] = useRegisterForEventMutation();

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

  const onSubmit = async (form: any) => {
    try {
      await registerForEvent({
        eventId,
        userId,
        firstName: form.firstName,
        lastName: form.lastName || null,
        email: form.email,
        phone: form.phone,
        participants: Number(form.participants),
      }).unwrap();

      onSuccess();
      reset();
    } catch {
      onError();
    }
  };

  const formError =
    errors?.firstName?.message ||
    errors?.lastName?.message ||
    errors?.email?.message ||
    errors?.phone?.message ||
    errors?.participants?.message;

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

        {formError && <ErrorMessage>{formError}</ErrorMessage>}

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
  },
});

