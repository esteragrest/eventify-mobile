import { yupResolver } from "@hookform/resolvers/yup";
import * as Clipboard from "expo-clipboard";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  useCreateEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "@/store/api/eventsApi";

import { Textarea } from "@/components/ui/textarea";

import { AGE_LIMIT_TYPE, PAYMENT_TYPE } from "@/constants";
import { convertDate, convertTime, generateEventAccessLink } from "@/utils";
import { eventValidationSchema } from "@/validations";
import { skipToken } from "@reduxjs/toolkit/query";
import { Modal } from "../modal";
import {
  Button,
  CustomCheckbox,
  DateTimeInput,
  ErrorMessage,
  FileInput,
  FormRow,
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
  const [closedModalOpen, setClosedModalOpen] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  const { id } = useLocalSearchParams();
  const numericId = Number(id);
  const isEditing = !!numericId;

  const { data } = useGetEventByIdQuery(
    numericId ? { id: numericId } : skipToken,
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
      max_participants: Number(form.max_participants),
      type: form.type ? "closed" : "open",
    };

    try {
      if (isEditing) {
        await updateEvent({ id: numericId, body: payload }).unwrap();
        router.replace(`/events/${numericId}`);
        return;
      }

      const res = await createEvent(payload).unwrap();

      if (payload.type === "closed" && res.link) {
        const link = generateEventAccessLink(res.event.id, res.link);
        setGeneratedLink(link);
        setClosedModalOpen(true);
        return;
      }

      router.replace(`/events/${res.event.id}`);
    } catch (err) {
      console.log("Ошибка создания:", err);
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <FileInput
          register={register}
          setValue={(name, value) =>
            setValue(name as keyof EventFormValues, value)
          }
          defaultImage={
            isEditing ? (data?.event.photo ?? undefined) : undefined
          }
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
          <CustomCheckbox
            content="Сделать мое мероприятие закрытым"
            defaultChecked={watch("type")}
            onChange={(checked) => setValue("type", checked)}
          />
        )}

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Button backgroundColor="#C0A2E2" onPress={handleSubmit(onSubmit)}>
          {isEditing ? "Сохранить изменения" : "Создать мероприятие"}
        </Button>

        <Modal
          isOpen={closedModalOpen}
          image={require("@/assets/img/closed-event.png")}
          title="Вы создали закрытое мероприятие!"
          text="Ваша ссылка для приглашения:"
          bannerColor="#C0A2E2"
          onClose={() => {
            setClosedModalOpen(false);
            router.replace(`/events/${numericId}`);
          }}
        >
          <View style={{ gap: 12 }}>
            <Text selectable style={{ fontSize: 14, textAlign: "center" }}>
              {generatedLink}
            </Text>

            <Button
              backgroundColor="#C0A2E2"
              onPress={() => {
                Clipboard.setStringAsync(generatedLink);
              }}
            >
              Скопировать ссылку
            </Button>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 14,
    paddingBottom: 40,
  },
  error: {
    color: "red",
    marginTop: 8,
  },
});
