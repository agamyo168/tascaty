import AddTaskSheet from "@/components/tasks/AddTaskSheet";
import Task from "@/components/tasks/Task";
import * as schema from "@/db/schema";
import useTask from "@/hooks/tasks/useTask";
import Feather from "@expo/vector-icons/Feather";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useEffect, useMemo, useRef } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
export interface TaskItem {
  title: string;
  description?: string;
}
const HomeScreen = () => {
  const { tasks, fetchTasks, toggleStatus, addTask, deleteTask } = useTask();
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  useEffect(() => {
    fetchTasks();
  }, []);
  const handleRemoveTask = (task: schema.Task) => {
    deleteTask(task);
    fetchTasks();
  };

  const handleCompleteTask = (task: schema.Task) => {
    toggleStatus(task);
    fetchTasks();
  };

  const handleAddTask = (task: { title: string; description: string }) => {
    Keyboard.dismiss();
    addTask({ title: task.title, description: task.description });
    bottomSheetRef.current?.close();
  };
  const styles = StyleSheet.create({
    scrollContainer: {
      marginBottom: 60,
    },
    tasksWrapper: {
      paddingBottom: 30,
      paddingHorizontal: 20,
    },
    container: {
      flex: 1,
      backgroundColor: "#1e1e2e",
    },

    sectionTitle: {
      color: "#cdd6f4",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    addBtnWrapper: {
      position: "absolute",
      right: 30,
      bottom: 60,
    },
    addBtn: {
      borderColor: "#838390",
      backgroundColor: "#cba6f7",
      borderRadius: 100,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Todo ({tasks.length})</Text>
            {tasks.map((task) => (
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
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              console.log("clicked");
              bottomSheetRef.current?.expand();
            }}
          >
            <Feather name="plus" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          index={-1}
          backgroundStyle={{ backgroundColor: "#181825" }}
          handleIndicatorStyle={{ backgroundColor: "#a6adc8" }}
        >
          <AddTaskSheet onAddTask={handleAddTask} />
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default HomeScreen;
