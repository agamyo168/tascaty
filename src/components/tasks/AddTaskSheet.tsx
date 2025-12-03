import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  onAddTask: (task: { title: string; description: string }) => void;
  toggleBottomSheet: () => void;
  visible: boolean;
};

export default function AddTaskContent({
  onAddTask,
  visible,
  toggleBottomSheet,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const snapPoints = useMemo(() => [], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleAdd = () => {
    if (!title.trim()) return;
    onAddTask({ title, description });
    setTitle("");
    setDescription("");
    toggleBottomSheet();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={toggleBottomSheet}
      index={visible ? 0 : -1}
      backgroundStyle={{ backgroundColor: "#181825" }}
      handleIndicatorStyle={{ backgroundColor: "#a6adc8" }}
    >
      <BottomSheetView style={styles.container}>
        <Text style={styles.label}>Title</Text>
        <BottomSheetTextInput
          placeholder="Task title"
          placeholderTextColor="#a6adc8"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <Text style={styles.label}>Description</Text>
        <BottomSheetTextInput
          placeholder="Task description"
          placeholderTextColor="#a6adc8"
          value={description}
          onChangeText={setDescription}
          multiline
          style={[styles.input]}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            handleAdd();
            bottomSheetRef.current?.close();
          }}
        >
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "transparent",
  },

  label: {
    color: "#cdd6f4",
    fontSize: 14,
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    alignSelf: "stretch",
    marginHorizontal: 12,
    backgroundColor: "#313244",
    color: "#cdd6f4",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#45475a",
  },

  buttonContainer: {
    backgroundColor: "#cba6f7",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#1e1e2e",
    fontSize: 16,
    fontWeight: "600",
  },
});
