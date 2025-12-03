import Feather from "@expo/vector-icons/Feather";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isHome = pathname === "/" || pathname === "/index";
  const isSettings = pathname?.startsWith("/settings");

  return (
    <View style={[styles.bar, { paddingBottom: 10 + insets.bottom }]}>
      <TouchableOpacity
        style={[styles.tab, isHome && styles.tabActive]}
        onPress={() => router.replace("/")}
      >
        <Feather name="home" size={20} color={isHome ? "#1e1e2e" : "#cdd6f4"} />
        <Text style={[styles.tabText, isHome && styles.tabActiveText]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, isSettings && styles.tabActive]}
        onPress={() => router.push("/settings")}
      >
        <Feather
          name="settings"
          size={20}
          color={isSettings ? "#1e1e2e" : "#cdd6f4"}
        />
        <Text style={[styles.tabText, isSettings && styles.tabActiveText]}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#1e1e2e", // base
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#313244", // surface0 border
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tabText: {
    color: "#a6adc8", // subtext0
    fontSize: 14,
    fontWeight: "600",
  },
  tabActive: {
    backgroundColor: "#cba6f7", // mauve
  },
  tabActiveText: {
    color: "#1e1e2e", // base text on mauve
  },
});
