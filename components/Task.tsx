import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

interface TaskProps {
  text: string;
  description?: string;
  done?: boolean;
  onPress?: () => void;
  handleDelete?: () => void;
}
const Task = ({ text, done, onPress, handleDelete }: TaskProps) => {
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
      overflow: "scroll", //TODO: Should I change this to ellipses better?

      maxWidth: "80%",
      maxHeight: 90,
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
      backgroundColor: "#f38ba8",
      borderRadius: 20,
      padding: 20,
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
        style={{ width: 40, justifyContent: "center", alignItems: "center" }}
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
      containerStyle={{
        padding: 15,
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
            <Text style={styles.itemText}>{text}</Text>
            <Text style={styles.itemDescription}>
              This is a long text This is a long text This is a long text This
              is a long text This is a long text This is a long text This is a
              long text This is a long text This is a long text
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default Task;
