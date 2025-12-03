import AddTaskSheet from "@/components/tasks/AddTaskSheet";
import Task from "@/components/tasks/Task";
import * as schema from "@/db/schema";
import useTask from "@/hooks/tasks/useTask";
import Feather from "@expo/vector-icons/Feather";
// no router needed here
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Snackbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface TaskItem {
  title: string;
  description?: string;
}

const HomeScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  const { tasks, fetchTasks, toggleStatus, addTask, deleteTask } = useTask();
  const [addedVisible, setAddedVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [completedVisible, setCompletedVisible] = useState(false);
  const [lastCompletedTask, setLastCompletedTask] =
    useState<schema.Task | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleRemoveTask = (task: schema.Task) => {
    deleteTask(task);
  };

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

  const handleCompleteTask = (task: schema.Task) => {
    toggleStatus(task);
    if (task.done === 0) {
      setLastCompletedTask(task);
      setCompletedVisible(true);
    }
  };

  const handleAddTask = (task: { title: string; description: string }) => {
    Keyboard.dismiss();
    addTask({ title: task.title, description: task.description });
    setAddedVisible(true);
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
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1e1e2e",
      paddingBottom: bottom,
    },

    header: {
      backgroundColor: "#6c4ab6",
      paddingHorizontal: 20,
      paddingTop: 72,
      paddingBottom: 12,
    },
    headerDate: {
      color: "#ede9fe",
      opacity: 0.9,
      fontSize: 14,
      marginBottom: 6,
    },
    headerTitle: {
      color: "#ffffff",
      fontSize: 24,
      fontWeight: "bold",
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
      backgroundColor: "#313244",
      color: "#cdd6f4",
      borderRadius: 12,
      padding: 12,
      fontSize: 16,
      marginTop: 16,
      borderWidth: 1,
      borderColor: "#45475a",
    },
    scrollContainer: {
      paddingBottom: 30,
    },
    tasksWrapper: {
      paddingHorizontal: 20,
      marginTop: 20,
    },
    sectionTitle: {
      color: "#cdd6f4",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    addBtnWrapper: {
      position: "absolute",
      right: 10,
      bottom: 20,
    },
    addBtn: {
      borderColor: "#838390",
      backgroundColor: "#cba6f7",
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
  });
  return (
    <View style={styles.container}>
      {/* Snackbars */}
      <Snackbar
        visible={addedVisible}
        style={{ backgroundColor: "#cba6f7" }}
        onDismiss={() => setAddedVisible(false)}
        duration={2000}
      >
        <Text style={{ color: "#1e1e2e" }}>Task added</Text>
      </Snackbar>
      <Snackbar
        visible={completedVisible}
        style={{ backgroundColor: "#cba6f7" }}
        onDismiss={() => setCompletedVisible(false)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#1e1e2e" }}>Task completed</Text>
          <TouchableOpacity
            onPress={() => {
              console.log(lastCompletedTask);
              if (lastCompletedTask) {
                toggleStatus(lastCompletedTask);
                setCompletedVisible(false);
              }
            }}
          >
            <Text> Undo</Text>
          </TouchableOpacity>
        </View>
      </Snackbar>
      {/* Header outside SafeArea to extend under status bar */}
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
        {/* Tasks */}
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

export default HomeScreen;
