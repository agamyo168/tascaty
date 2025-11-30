import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text>Today's tasks</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tasksWrapper: {},
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Home;
