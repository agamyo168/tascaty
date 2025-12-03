import migrations from "@/drizzle/migrations";
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
          <View style={styles.container}>
            <Slot />
          </View>
        </PaperProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
