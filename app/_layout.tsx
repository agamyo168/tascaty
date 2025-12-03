import GlobalSnackbar from "@/components/common/GlobalSnackbar";
import migrations from "@/drizzle/migrations";
import { SnackbarProvider } from "@/hooks/useSnackbar";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Slot } from "expo-router";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

export const DATABASE_NAME = "tasks";

export default function RootLayout() {
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  useMigrations(db, migrations);

  const styles = StyleSheet.create({
    container: { flex: 1 },
  });

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <PaperProvider>
          <SnackbarProvider>
            <View style={styles.container}>
              <Slot />
              <GlobalSnackbar />
            </View>
          </SnackbarProvider>
        </PaperProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
