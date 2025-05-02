import * as React from 'react';
import { Drawer } from 'react-native-paper';
import { Alert, StyleSheet, Text, View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useRouter } from 'next/router';
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';
import DrawerItem from 'react-native-paper/lib/typescript/components/Drawer/DrawerItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'flex-start',
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    width: wp('40%'),
    fontSize: hp('5%'),
  },
  text: {
    fontSize: hp('3%'),
  },
  label: {
    fontSize: hp('1%'),
  },
  drawer: {
    position: 'absolute',
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10,
    height: hp('100%'),
    width: wp('100%')
  },
});



const DrawerComponent = ({ active, setActive }: { active: string, setActive: (route: string) => void }) => {
  //const [active, setActive] = React.useState('');
  const router = useRouter();

  return (
    <Animated.View key="fede3" entering={FadeInLeft} exiting={FadeOutLeft} style={styles.drawer}>
      <View style={styles.container}>
        <Text style={styles.text}>メニュー</Text>
        <Drawer.Section>
          <Drawer.Item
            label='トップ'
            active={active === 'top'}
            onPress={() => {
              setActive('top')
              router.push('/')
            }}
            style={{ paddingVertical: hp('1%') }}
          />
          <Drawer.Item
            label="QR読み込み"
            active={active === 'QR'}
            onPress={() => {
              setActive('QR')
              router.push('/QR-reading')
            }}
            style={{ paddingVertical: hp('1%') }}
          />
          <Drawer.Item
            label="商品検索"
            active={active === 'search'}
            onPress={() => {
              setActive('search')
              router.push('/productSearch')
            }}
          />
        </Drawer.Section>
      </View>

    </Animated.View>
    
  );
};

export default DrawerComponent;