import { EventsFiltersState } from "@/app/events";
import { PAYMENT_TYPE } from "@/constants";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DateTimeInput, FormRow, SelectableMenu } from "../ui";
import { Button } from "../ui/button";
import { SimpleInput } from "./simple-input";

export interface EventsFiltersProps {
  filters: EventsFiltersState;
  setFilters: (value: EventsFiltersState) => void;
  onReset: () => void;
}

export const EventsFilters = ({
  filters,
  setFilters,
  onReset,
}: EventsFiltersProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.toggle} onPress={() => setOpen(!open)}>
        <Text style={styles.toggleText}>Фильтры</Text>
        <Image
          source={require("@/assets/img/filter1.png")}
          style={styles.arrow}
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.container}>
          <FormRow>
            <DateTimeInput
              type="date"
              label="Дата с"
              value={filters.dateFrom}
              onChange={(d) => {
                const y = d.getFullYear();
                const m = String(d.getMonth() + 1).padStart(2, "0");
                const day = String(d.getDate()).padStart(2, "0");
                setFilters({ ...filters, dateFrom: `${y}-${m}-${day}` });
              }}
            />

            <DateTimeInput
              type="date"
              label="Дата по"
              value={filters.dateTo}
              onChange={(d) => {
                const y = d.getFullYear();
                const m = String(d.getMonth() + 1).padStart(2, "0");
                const day = String(d.getDate()).padStart(2, "0");
                setFilters({ ...filters, dateTo: `${y}-${m}-${day}` });
              }}
            />
          </FormRow>

          <SimpleInput
            value={filters.address}
            onChangeText={(text) => setFilters({ ...filters, address: text })}
            placeholder="Адрес"
          />

          <SelectableMenu
            title="Тип оплаты"
            options={PAYMENT_TYPE}
            selectedValue={filters.payment}
            setValue={(value) =>
              setFilters({
                ...filters,
                payment: value as EventsFiltersState["payment"],
              })
            }
          />

          <View style={styles.buttonsRow}>
            <Button width={56} onPress={onReset}>
              <Image
                source={require("@/assets/img/reset.png")}
                style={styles.icon}
              />
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
  },
  arrow: {
    width: 22,
    height: 18,
  },
  container: {
    marginTop: 10,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  icon: {
    width: 18,
    height: 18,
  },
});
