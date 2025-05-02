import React, { useState, useRef, useEffect } from "react";
import DrawerComponent from '../Comp/DrawerComp'
import { StyleSheet, Text, View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Html5Qrcode } from 'html5-qrcode';
import { useSwipeable } from 'react-swipeable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  camera: {
    width: wp('80%'),
    height: wp('80%')
  }
});



const QRReadingPage = () => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [active, setActive] = React.useState('QR')

  const handlers = useSwipeable({
    onSwipedLeft: () => setDrawerVisible(false),
    onSwipedRight: () => setDrawerVisible(true),
    delta: 50,
    preventScrollOnSwipe: true, // スクロールと競合しないように
    trackMouse: true,
    trackTouch: true,
  });


  useEffect(() => {
    // 副作用（例: QRコードスキャナの初期化）
    const scanner = new Html5Qrcode("qr-reader");
    scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        alert(`読み取り成功: ${decodedText}`);
        //scanner.stop();
      },
      (err) => {
        console.warn("読み取りエラー", err);
      }
    );
  
    // コンポーネントがアンマウントされた時のクリーンアップ関数
    return () => {
      scanner.stop().catch(() => {});
    };
  }, []);

  return (
    <View {...handlers} style={styles.container}>
      {drawerVisible ? <>
        <DrawerComponent active={active} setActive={setActive}/>
      </> : undefined}
      {/* <Text>読み取りページ</Text> */}
      <View>
        <View id="qr-reader" style={styles.camera}></View>
      </View>
      {/* <div>
        <div id="qr-reader" style={{ width: '300px', height: '300px' }}></div>
      </div> */}
    </View>
    
  );
}





export default QRReadingPage