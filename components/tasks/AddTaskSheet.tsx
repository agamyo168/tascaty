import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
type Props = {
  onAddTask: (task: { title: string; description: string }) => void;
};
export default function AddTaskContent({ onAddTask }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAddTask({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <BottomSheetView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        placeholder="Task title"
        placeholderTextColor="#a6adc8"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Task description"
        placeholderTextColor="#a6adc8"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, { height: 80 }]}
      />

      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText} onPress={handleAdd}>
          Add Task
        </Text>
      </View>
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#1e1e2e",
    flex: 1,
  },

  label: {
    color: "#cdd6f4",
    fontSize: 14,
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
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
