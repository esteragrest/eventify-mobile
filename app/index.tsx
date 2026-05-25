import { AuthFormContainer, ControlButtons, Header } from "@/components";
import {
  Button,
  CustomCheckbox,
  DateTimeInput,
  EventsCard,
  Input,
  SideMenu,
} from "@/components/ui";
import { DeleteButtons } from "@/components/ui/delete-buttons";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Header onMenuPress={() => setMenuOpen(true)} />

      <View style={{ padding: 20 }}>
        <View style={{ padding: 20 }}>
          <Input
            type="text"
            name="auth_email"
            placeholder="Введите email"
            width="90%"
          />

          <Input
            type="password"
            name="auth_password"
            placeholder="Введите пароль"
            width="90%"
          />
        </View>
      </View>

      <AuthFormContainer>
        <Input placeholder="Email" />
        <Input type="password" placeholder="Пароль" />
        <Button backgroundColor="#C0A2E2">Войти</Button>
        <CustomCheckbox content="Сделать мое мероприятие закрытым" />
      </AuthFormContainer>

      <DateTimeInput
        type="date"
        label="Дата"
        onChange={(d) => console.log("date:", d)}
      />

      <DateTimeInput
        type="time"
        label="Время"
        onChange={(t) => console.log("time:", t)}
      />

      <DeleteButtons onDelete={() => {}} />

      <ControlButtons onEdit={() => {}} onDelete={() => {}} />

      <EventsCard
        eventId={1}
        title="Мастер-класс"
        organizer="Иван Иванов"
        eventDate="12.06.2026"
        description="Описание события..."
        photo={require("../public/img/event1.jpg")}
      />

      {menuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}
    </ScrollView>
  );
}
