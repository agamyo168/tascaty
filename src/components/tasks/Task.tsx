import { TaskItem } from "@/src/app";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

interface TaskProps {
  task: TaskItem;
  description?: string;
  done?: number;
  onPress?: () => void;
  handleDelete?: () => void;
}
const Task = ({ task, done, onPress, handleDelete }: TaskProps) => {
  const [expanded, setExpanded] = useState(false);
  const styles = StyleSheet.create({
    itemWrapper: {
      padding: 15,
      borderRadius: 20,
      backgroundColor: "#313244",
      marginBottom: 20,
      justifyContent: "center",
    },
    itemLeft: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    itemText: {
      color: "#cdd6f4",
      fontWeight: 600,
      textDecorationLine: done ? "line-through" : "none",
      fontSize: 16,
    },
    itemDescription: {
      color: "#bac2de",
      fontWeight: 600,
      fontSize: 12,
    },
    itemTextWrapper: {
      flexDirection: "column",
      maxWidth: "80%",
    },
    circle: {
      borderColor: "#838390",
      backgroundColor: done ? "#a6e3a1" : "transparent",
      borderRadius: 100,
      borderWidth: 3,
      marginRight: 15,
      padding: 13,
    },
    deleteAction: {
      backgroundColor: "#f38ba8",
      borderRadius: 20,
      padding: 10,
      marginBottom: 20,
      marginRight: 15,
    },
    deleteText: {
      color: "#1E1E2E",
    },
  });
  const renderRightActions = () => {
    return (
      <View
        style={{ width: 50, justifyContent: "center", alignItems: "center" }}
      >
        {/* Use RectButton for a good native button feel */}
        <RectButton style={styles.deleteAction} onPress={handleDelete}>
          <Feather name="trash" style={styles.deleteText} />
        </RectButton>
      </View>
    );
  };
  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootRight={false}
      friction={2}
      containerStyle={{
        borderRadius: 20,
      }}
    >
      <View style={styles.itemWrapper}>
        <View style={styles.itemLeft}>
          <TouchableOpacity
            style={styles.circle}
            onPress={onPress}
          ></TouchableOpacity>
          <View style={styles.itemTextWrapper}>
            <TouchableOpacity onPress={() => setExpanded((e) => !e)}>
              <Text style={styles.itemText}>{task.title}</Text>
              <Text
                style={styles.itemDescription}
                numberOfLines={expanded ? undefined : 3}
                ellipsizeMode="tail"
              >
                {task.description}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default Task;
