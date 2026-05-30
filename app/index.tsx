import { Capabilities, Manual, WeeklyEvents, Welcome } from "@/components";
import { Banner } from "@/components/main/banner";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          backgroundColor: "#FCF7FF",
        }}
      >
        <Welcome />
        <Capabilities />
        <WeeklyEvents />
        <Manual />
        <Banner />
      </ScrollView>
    </>
  );
}
