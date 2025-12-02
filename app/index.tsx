import AddTaskSheet from "@/components/tasks/AddTaskSheet";
import Task from "@/components/tasks/Task";
import Feather from "@expo/vector-icons/Feather";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
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
  const [taskItems, setTaskItems] = useState<TaskItem[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskItem[]>([]);

  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // const handleRemoveTask = () => {};

  const handleCompleteTask = (index: number) => {
    setCompletedTasks([taskItems[index], ...completedTasks]);
    taskItems.splice(index, 1);
    setTaskItems(taskItems);
  };
  const handleIncompleteTask = (index: number) => {
    setTaskItems([completedTasks[index], ...taskItems]);
    completedTasks.splice(index, 1);
    setCompletedTasks(completedTasks);
  };

  const addTask = (task: { title: string; description: string }) => {
    Keyboard.dismiss();
    setTaskItems((prev) => [...prev, { ...task }]);
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
            <Text style={styles.sectionTitle}>Todo ({taskItems.length})</Text>
            {taskItems.map((task, index) => (
              <Task
                key={index}
                task={task}
                onPress={() => handleCompleteTask(index)}
              />
            ))}
          </View>
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>
              Completed ({completedTasks.length})
            </Text>
            {completedTasks.map((task, index) => (
              <Task
                key={index}
                done
                task={task}
                onPress={() => handleIncompleteTask(index)}
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
          <AddTaskSheet onAddTask={addTask} />
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default HomeScreen;
