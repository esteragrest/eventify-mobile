import {
  Capabilities,
  Header,
  Manual,
  WeeklyEvents,
  Welcome,
} from "@/components";
import { Banner } from "@/components/main/banner";
import { SideMenu } from "@/components/ui";
import { useState } from "react";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Header onMenuPress={() => setMenuOpen(true)} />
      <Welcome />
      <Capabilities />
      <WeeklyEvents />
      <Manual />
      <Banner />
      {menuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}
    </ScrollView>
  );
}
