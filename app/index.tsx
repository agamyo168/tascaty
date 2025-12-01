import Task from "@/components/Task";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
interface TaskItem {
  title: string;
}
const HomeScreen = () => {
  const [task, setTask] = useState<TaskItem>({ title: "" });
  const [taskItems, setTaskItems] = useState<TaskItem[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskItem[]>([
    { title: "Completed" },
  ]);
  const handleCompleteTask = (index: number) => {
    setCompletedTasks([...completedTasks, taskItems[index]]);
    taskItems.splice(index, 1);
    setTaskItems(taskItems);
  };
  const handleIncompleteTask = (index: number) => {
    setTaskItems([...taskItems, completedTasks[index]]);
    completedTasks.splice(index, 1);
    setCompletedTasks(completedTasks);
  };
  // const handleRemoveTask = () => {};
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask({ title: "" });
  };
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    header: {
      paddingBottom: 60,
      paddingTop: 10,
      alignItems: "center",
    },
    scrollContainer: {
      marginBottom: 60,
    },
    plusText: {
      fontSize: 64,
    },
    plusWrapper: {
      width: 60,
      height: 60,
      backgroundColor: "#cba6f7",
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
    },

    writeTaskWrapper: {
      position: "absolute",
      bottom: 0,
      padding: 10,
      borderTopEndRadius: 15,
      borderTopStartRadius: 15,

      backgroundColor: "#313244",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    input: {
      padding: 15,
      backgroundColor: "#45475a",
      color: "#cdd6f4",
      borderRadius: 60,
      borderColor: "#9399b2",
      borderWidth: 1,
      width: 250,
    },

    tasksWrapper: {
      paddingBottom: 30,
      paddingHorizontal: 20,
    },
    container: {
      flex: 1,
      backgroundColor: "#1e1e2e",
      paddingBottom: insets.bottom,
    },
    items: {},
    //TODO: Make section title a header/navbar instead
    headerTitle: {
      color: "#cdd6f4",
      fontSize: 24,
      fontWeight: "bold",
    },
    sectionTitle: {
      color: "#cdd6f4",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Page title</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Todo ({taskItems.length})</Text>
            <View style={styles.items}>
              {taskItems.map((task, index) => (
                <Task
                  key={index}
                  text={task.title}
                  onPress={() => handleCompleteTask(index)}
                />
              ))}
            </View>
          </View>
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>
              Completed ({completedTasks.length})
            </Text>
            <View style={styles.items}>
              {completedTasks.map((task, index) => (
                <Task
                  key={index}
                  done
                  text={task.title}
                  onPress={() => handleIncompleteTask(index)}
                />
              ))}
            </View>
          </View>
        </ScrollView>
        {/* Replace it with Bottom Sheet!! */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder="Write a task"
            value={task.title}
            onChangeText={(text) => setTask({ title: text })}
          />
          <TouchableOpacity onPress={handleAddTask}>
            <View style={styles.plusWrapper}>
              <Text style={styles.plusText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
