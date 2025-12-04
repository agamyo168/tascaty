import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, Menu, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from "react-native-unistyles";

export default function SettingsScreen() {
  const router = useRouter();
  const { theme } = useUnistyles();
  const [isDark, setIsDark] = useState(
    () => theme.colors.background === "#1e1e2e"
  );
  const [menuVisible, setMenuVisible] = useState(false);
  const selectedThemeLabel = "Catpuccini";

  const setLight = () => UnistylesRuntime.setTheme("light");
  const setDark = () => UnistylesRuntime.setTheme("dark");

  const onSwitchChange = (value: boolean) => {
    setIsDark(value);
    value ? setDark() : setLight();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather
            name="arrow-left"
            size={20}
            color={theme.colors.text.white}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 32 }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Text style={styles.subtitle}>Configure your preferences here.</Text>

        <View style={styles.card}>
          <View style={styles.optionRow}>
            <Text style={styles.optionLabel}>Dark mode</Text>
            <Switch
              value={isDark}
              onValueChange={onSwitchChange}
              color={theme.colors.primary}
            />
          </View>
          <View style={styles.optionRow}>
            <Text style={styles.optionLabel}>Theme</Text>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button mode="outlined" onPress={() => setMenuVisible(true)}>
                  {selectedThemeLabel}
                </Button>
              }
              contentStyle={{ backgroundColor: theme.colors.card }}
            >
              <Menu.Item
                title="Catpuccini"
                onPress={() => setMenuVisible(false)}
                titleStyle={{ color: theme.colors.text.primary }}
              />
            </Menu>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((t) => ({
  container: {
    flex: 1,
    backgroundColor: t.colors.background,
  },
  header: {
    backgroundColor: t.colors.header,
    paddingTop: t.spacing.md,
    paddingBottom: t.spacing.md,
    paddingHorizontal: t.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: t.colors.highlight,
  },
  headerTitle: {
    color: t.colors.text.white,
    ...t.typography.h2,
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    padding: t.spacing.lg,
    gap: t.spacing.lg,
  },
  sectionTitle: {
    color: t.colors.text.primary,
    ...t.typography.h2,
    marginBottom: t.spacing.xs,
  },
  subtitle: {
    color: t.colors.text.secondary,
    ...t.typography.caption,
  },
  card: {
    backgroundColor: t.colors.card,
    borderRadius: t.borderRadius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: t.spacing.md,
    gap: t.spacing.sm,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: t.spacing.sm,
  },
  optionLabel: {
    color: t.colors.text.primary,
    ...t.typography.body,
  },
  optionPill: {
    borderRadius: t.borderRadius.full,
    paddingHorizontal: t.spacing.md,
    paddingVertical: t.spacing.xs,
    backgroundColor: t.colors.button.primary,
    borderWidth: 1,
    borderColor: t.colors.button.border,
  },
  optionPillText: {
    color: t.colors.button.text,
    fontWeight: "600",
  },
}));
