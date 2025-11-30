import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

interface TaskProps {
  text: string;
  done?: boolean;
  onPress?: () => void;
  handleDelete?: () => void;
}
const Task = ({ text, done, onPress, handleDelete }: TaskProps) => {
  const styles = StyleSheet.create({
    item: {
      padding: 15,
      borderRadius: 20,
      backgroundColor: "#313244",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
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
      maxWidth: "80%",
    },
    circle: {
      borderColor: "#838390",
      backgroundColor: done ? "#a6e3a1" : "",
      borderRadius: 100,
      borderWidth: 3,
      marginRight: 15,
      padding: 13,
    },
    deleteAction: {
      backgroundColor: "#f38ba8", // Catppuccin Mocha Red for destruction
      justifyContent: "center",
      alignItems: "flex-end",
      borderRadius: 20,
      marginVertical: 20, // Match marginBottom from item style
      marginTop: 0,
      marginBottom: 20,
      marginLeft: 10, // Separates the item and the swipe action visually
    },
    deleteText: {
      color: "#1E1E2E", // Use a very dark color (Base) for high contrast on Red
      padding: 20,
      fontWeight: "bold",
    },
  });
  const renderRightActions = () => {
    return (
      <View style={{ width: 100 }}>
        {/* Use RectButton for a good native button feel */}
        <RectButton style={styles.deleteAction} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </RectButton>
      </View>
    );
  };
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <TouchableOpacity
            style={styles.circle}
            onPress={onPress}
          ></TouchableOpacity>
          <Text style={styles.itemText}>{text}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default Task;
