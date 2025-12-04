import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native-unistyles";

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
      backgroundStyle={styles.botomSheetStyle}
      handleIndicatorStyle={styles.handleIndicatorStyle}
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

const styles = StyleSheet.create((t) => ({
  container: {
    padding: 18,
    backgroundColor: "transparent",
  },

  label: {
    color: t.colors.text.primary,
    fontSize: 14,
    marginBottom: 6,
    marginTop: 10,
  },
  botomSheetStyle: {
    backgroundColor: t.colors.surface,
  },
  handleIndicatorStyle: {
    backgroundColor: t.colors.highlight,
  },
  input: {
    alignSelf: "stretch",
    marginHorizontal: 12,
    backgroundColor: t.colors.background,
    color: t.colors.text.primary,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: t.colors.border,
  },

  buttonContainer: {
    backgroundColor: t.colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: t.colors.text.white,
    fontSize: 16,
    fontWeight: "600",
  },
}));
