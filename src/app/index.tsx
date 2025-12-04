import AddTaskSheet from "@/src/components/tasks/AddTaskSheet";
import Task from "@/src/components/tasks/Task";
import * as schema from "@/src/db/schema";
import useTask from "@/src/hooks/tasks/useTask";
import { useSnackbar } from "@/src/hooks/useSnackbar";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

export interface TaskItem {
  title: string;
  description?: string;
}

const HomeScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  const { tasks, fetchTasks, toggleStatus, addTask, deleteTask } = useTask();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleRemoveTask = (task: schema.Task) => {
    deleteTask(task);
    showSnackbar("Task removed", {
      backgroundColor: "#f38ba8",
      textColor: "#1e1e2e",
    });
  };

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

  const handleCompleteTask = (task: schema.Task) => {
    toggleStatus(task);
    if (task.done === 0) {
      showSnackbar("Task completed", {
        backgroundColor: "#cba6f7",
        textColor: "#1e1e2e",
      });
    }
  };

  const handleAddTask = (task: { title: string; description: string }) => {
    Keyboard.dismiss();
    addTask({ title: task.title, description: task.description });
    showSnackbar("Task added", {
      duration: 2000,
      backgroundColor: "#cba6f7",
      textColor: "#1e1e2e",
    });
  };

  const filtered = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      (t.description?.toLowerCase().includes(query.toLowerCase()) ?? false)
  );
  const todoTasks = filtered.filter((t) => t.done === 0);
  const completedTasks = filtered.filter((t) => t.done === 1);
  const formattedDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const { theme } = useUnistyles();
  return (
    <View style={styles.container(bottom)}>
      <StatusBar
        style={theme.colors.background === "#1e1e2e" ? "light" : "dark"}
      />
      <View style={styles.header}>
        <Text style={styles.headerDate}>{formattedDate}</Text>
        <View style={styles.headerTitleRow}>
          <Text style={styles.headerTitle}>My Todo List</Text>
          <TouchableOpacity onPress={() => router.push("/settings")}>
            <Feather name="settings" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Search tasks..."
          placeholderTextColor="#a6adc8"
          selectionColor="#cba6f7"
          style={[styles.searchInput, { marginHorizontal: 0, marginTop: 4 }]}
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <GestureHandlerRootView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Todo ({todoTasks.length})</Text>
            {todoTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                handleDelete={() => handleRemoveTask(task)}
                done={task.done}
                onPress={() => handleCompleteTask(task)}
              />
            ))}
            <Text style={[styles.sectionTitle, { marginTop: 10 }]}>
              Completed ({completedTasks.length})
            </Text>
            {completedTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                handleDelete={() => handleRemoveTask(task)}
                done={task.done}
                onPress={() => handleCompleteTask(task)}
              />
            ))}
          </View>
        </ScrollView>
        <View style={styles.addBtnWrapper}>
          <TouchableOpacity style={styles.addBtn} onPress={toggleBottomSheet}>
            <Feather name="plus" size={26} color="#1e1e2e" />
          </TouchableOpacity>
        </View>

        <AddTaskSheet
          visible={bottomSheetVisible}
          toggleBottomSheet={toggleBottomSheet}
          onAddTask={handleAddTask}
        />
      </GestureHandlerRootView>
    </View>
  );
};
const styles = StyleSheet.create((theme) => ({
  container: (bottom: number) => ({
    flex: 1,
    paddingBottom: bottom,
    backgroundColor: theme.colors.background,
  }),

  header: {
    backgroundColor: theme.colors.header,
    paddingHorizontal: 20,
    paddingTop: 72,
    paddingBottom: 12,
  },
  headerDate: {
    color: theme.colors.text.inverse,
    ...theme.typography.caption,
    opacity: 0.9,
    marginBottom: 6,
  },
  headerTitle: {
    color: theme.colors.text.inverse,
    ...theme.typography.h2,
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  searchInput: {
    alignSelf: "stretch",
    marginHorizontal: 20,
    backgroundColor: theme.colors.background,
    color: theme.colors.text.primary,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginTop: 16,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  tasksWrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    color: theme.colors.text.primary,
    ...theme.typography.h2,
    marginBottom: 20,
  },
  addBtnWrapper: {
    position: "absolute",
    right: 10,
    bottom: 20,
  },
  addBtn: {
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.primary,
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
}));
export default HomeScreen;
