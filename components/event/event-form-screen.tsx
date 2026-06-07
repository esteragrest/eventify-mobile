// components/event/event-form-screen.tsx

import { yupResolver } from "@hookform/resolvers/yup";
import { skipToken } from "@reduxjs/toolkit/query";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";

import {
  useCreateEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "@/store/api/eventsApi";

// import { Button } from "@/components/ui/button";
// import { CustomCheckbox } from "@/components/ui/custom-checkbox";
// import { DateTimeInput } from "@/components/ui/date-time-input";
// import { FileInput } from "@/components/ui/file-input";
// import { Input } from "@/components/ui/input";
// import { SelectableMenu } from "@/components/ui/selectable-menu";
import { Textarea } from "@/components/ui/textarea";

import { AGE_LIMIT_TYPE, PAYMENT_TYPE } from "@/constants";
import { convertDate, convertTime } from "@/utils";
import { eventValidationSchema } from "@/validations";
import {
  ErrorMessage,
  FormRow,
  Button,
  CustomCheckbox,
  DateTimeInput,
  FileInput,
  Input,
  SelectableMenu,
} from "../ui";

type EventFormValues = {
  photo: string;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  age_limit: string;
  payment: string;
  address: string;
  type: boolean;
  max_participants: string;
};

export const EventFormScreen = () => {
  const { id } = useLocalSearchParams();
  const numericId = id ? Number(id) : undefined;
  const isEditing = !!numericId;

  const { data } = useGetEventByIdQuery(
    numericId !== undefined ? numericId : skipToken,
  );

  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<EventFormValues>({
    defaultValues: {
      photo: "",
      title: "",
      description: "",
      event_date: "",
      event_time: "",
      age_limit: "",
      payment: "",
      address: "",
      type: false,
      max_participants: "",
    },
    resolver: yupResolver(eventValidationSchema),
  });

  useEffect(() => {
    if (!isEditing) {
      reset();
      return;
    }

    if (data?.event) {
      const e = data.event;

      reset({
        photo: e.photo || "",
        title: e.title || "",
        description: e.description || "",
        event_date: convertDate(e.eventDate),
        event_time: convertTime(e.eventTime),
        age_limit: e.ageLimit || "",
        payment: e.payment || "",
        address: e.address || "",
        type: e.type === "closed",
        max_participants: e.maxParticipants ? String(e.maxParticipants) : "",
      });
    }
  }, [data, isEditing, reset]);

  const onSubmit = async (form: EventFormValues) => {
    const payload = {
      ...form,
      type: form.type ? "closed" : "open",
    };

    if (isEditing) {
      await updateEvent({ id: numericId, body: payload }).unwrap();
      router.replace(`/events/${numericId}`);
    } else {
      const res = await createEvent(payload).unwrap();
      router.replace(`/events/${res.event.id}`);
    }
  };

  const descriptionValue = watch("description");

  const errorMessage =
    errors.photo?.message ||
    errors.title?.message ||
    errors.event_date?.message ||
    errors.event_time?.message ||
    errors.address?.message ||
    errors.description?.message ||
    errors.payment?.message ||
    errors.age_limit?.message ||
    errors.max_participants?.message;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FileInput
        register={register}
        setValue={(name, value) =>
          setValue(name as keyof EventFormValues, value)
        }
        defaultImage={isEditing ? (data?.event.photo ?? undefined) : undefined}
      />

      <Input
        name="title"
        control={control}
        placeholder="Название мероприятия"
      />

      <FormRow>
        <DateTimeInput
          type="date"
          label="Дата проведения"
          value={watch("event_date")}
          onChange={(date) => {
            const iso = date.toISOString().slice(0, 10);
            setValue("event_date", iso);
          }}
        />

        <DateTimeInput
          type="time"
          label="Время проведения"
          value={watch("event_time")}
          onChange={(date) => {
            const time = date.toTimeString().slice(0, 5);
            setValue("event_time", time);
          }}
        />
      </FormRow>

      <Input
        name="address"
        control={control}
        placeholder="Полный адрес мероприятия"
      />

      <Textarea
        name="description"
        id="description"
        placeholder="Опишите Ваше мероприятие"
        value={descriptionValue}
        onChangeText={(text) => setValue("description", text)}
      />

      <FormRow>
        <SelectableMenu
          title="Тип оплаты"
          options={PAYMENT_TYPE}
          selectedValue={watch("payment")}
          setValue={(value) => setValue("payment", value as string)}
        />

        <SelectableMenu
          title="Возраст"
          options={AGE_LIMIT_TYPE}
          selectedValue={watch("age_limit")}
          setValue={(value) => setValue("age_limit", value as string)}
        />
      </FormRow>

      <Input
        name="max_participants"
        control={control}
        placeholder="Максимальное количество участников"
        keyboardType="numeric"
      />

      {!isEditing && (
        // <CustomCheckbox content="Сделать мое мероприятие закрытым" />
        <CustomCheckbox
          content="Сделать мое мероприятие закрытым"
          defaultChecked={watch("type")}
          onChange={(checked) => setValue("type", checked)}
        />
        // если нужно связать с формой:
        // onChange раскомментировать в CustomCheckbox и тут:
        // <CustomCheckbox
        //   content="Сделать мое мероприятие закрытым"
        //   defaultChecked={watch("type")}
        //   onChange={(checked) => setValue("type", checked)}
        // />
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Button backgroundColor="#C0A2E2" onPress={handleSubmit(onSubmit)}>
        {isEditing ? "Сохранить изменения" : "Создать мероприятие"}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 14,
    paddingBottom: 20,
  },
  error: {
    color: "red",
    marginTop: 8,
  },
});
