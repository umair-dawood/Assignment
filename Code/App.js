import { SafeAreaView, Text, StatusBar, StyleSheet } from "react-native";
import Navigator from "./Navigator";



export default function App() {
  return (
    <SafeAreaView style={styles.ParentContainer}>
      <Navigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ParentContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})