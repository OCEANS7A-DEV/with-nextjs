import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useRouter } from 'next/router';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import DrawerComponent from '../Comp/DrawerComp'
import Animated, { FadeInLeft, FadeOutLeft, Layout } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ListGet } from '../backEnd/server'



export default function App() {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [active, setActive] = useState<string>('');  // active state for Drawer
  const router = useRouter();

  const handleNavigation = (route: string) => {
    // Update active state before navigation
    setActive(route);
    router.push(route); // Navigate programmatically
  };

  const listSet = async() => {
    const result = await ListGet()
    console.log(result)
    sessionStorage.setItem('data', JSON.stringify(result))
  }

  useEffect(() => {
    listSet()
  },[])

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationX > 100 && !drawerVisible) {
        setDrawerVisible(true); // Open Drawer
      } else if (e.translationX < -100 && drawerVisible) {
        setDrawerVisible(false); // Close Drawer
      }
    });

  return (
    <View style={styles.container}>
      {drawerVisible && (
        <DrawerComponent active={active} setActive={setActive} />
      )}
      <Text style={styles.text}>Main Content</Text>
      <Button onPress={() => handleNavigation('/QR-reading')}>Go to QR Reading</Button>
      <Button onPress={() => handleNavigation('/productSearch')}>Product Search</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: hp('5%'),
  },
  box: {
    backgroundColor: "#eee",
    padding: 30,
    margin: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  drawer: {
    position: 'absolute',
    backgroundColor: 'gray',
    zIndex: 10,
    height: hp('100%'),
    width: wp('80%'),
  },
});