import { Header } from "@/components";
import { SideMenu } from "@/components/ui";
import { useState } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Header onMenuPress={() => setMenuOpen(true)} />

      <View style={{ padding: 20 }}>
        <Text>Главная страница</Text>
      </View>

      {menuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}
    </View>
  );
}
