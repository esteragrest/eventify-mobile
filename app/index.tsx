import { AuthFormContainer, Header } from "@/components";
import { Button, Input, SideMenu } from "@/components/ui";
import { useState } from "react";
import { View } from "react-native";

export default function HomeScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
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
      </AuthFormContainer>

      {menuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}
    </View>
  );
}
