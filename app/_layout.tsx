import { Header } from "@/components";
import { SideMenu } from "@/components/ui";
import { store } from "@/store";
import { Stack, useSegments } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";

export default function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const segments = useSegments();

  const isAuth = segments[0] === "auth";

  return (
    <Provider store={store}>
      <View style={{ flex: 1, backgroundColor: "#FCF7FF" }}>
        {!isAuth && <Header onMenuPress={() => setMenuOpen(true)} />}

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#FCF7FF" },
          }}
        />

        {!isAuth && menuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}
      </View>
    </Provider>
  );
}
