import React, { useState, useEffect } from "react";
import DrawerComponent from '../Comp/DrawerComp';
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Button, DataTable, TextInput } from 'react-native-paper';
import { ListGet } from '../backEnd/server';
import { useSwipeable } from 'react-swipeable';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: screenHeight,
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    width: '100%'
  },
  button: {
    position: 'absolute',
    height: 70,
    width: '100%',
    bottom: 0,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 5,
  }
});

const InsertPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [insertData, setInsertData] = useState<any[]>([]);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [active, setActive] = useState<string>('');

  const { ref, ...swipeHandlers } = useSwipeable({
    onSwipedLeft: () => setDrawerVisible(false),
    onSwipedRight: () => setDrawerVisible(true),
    delta: 50,
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
  });

  const DataGet = async () => {
    const inventoryData = await ListGet();
    const searchData = JSON.parse(sessionStorage.getItem('selectCode') ?? '[]');
    const searchResult = searchData.map((item: string) =>
      inventoryData.find((row: any[]) => row[1] === item)
    );
    setData(searchResult);
    const insert = searchResult.map(item => [item[1], item[2], item[12], item[13]]);
    setInsertData(insert);
  };

  const handleChange = (code: string, value: string) => {
    const newData = insertData.map(item =>
      item[0] === code ? [item[0], item[1], item[2], value] : item
    );
    setInsertData(newData);
  };

  const UpdateButton = async () => {
    console.log(insertData);
    // TODO: サーバー送信処理など
  };

  useEffect(() => {
    DataGet();
  }, []);

  return (
    <View {...swipeHandlers} style={styles.container}>
      {drawerVisible && (
        <DrawerComponent active={active} setActive={setActive} />
      )}
      <Text>在庫数入力</Text>
      <View style={styles.table}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title textStyle={{ fontSize: wp('3%') }} style={{ flex: 2, borderRightWidth: 1, borderColor: '#ccc' }}>商品コード</DataTable.Title>
            <DataTable.Title textStyle={{ fontSize: wp('3%') }} style={{ flex: 4, borderRightWidth: 1, borderColor: '#ccc' }}>商品名</DataTable.Title>
            <DataTable.Title textStyle={{ fontSize: wp('3%') }} style={{ flex: 2, borderRightWidth: 1, borderColor: '#ccc' }}>データ上</DataTable.Title>
            <DataTable.Title textStyle={{ fontSize: wp('3%') }} style={{ flex: 2 }}>入力</DataTable.Title>
          </DataTable.Header>
          {insertData.map((row, index) => (
            <DataTable.Row key={index} style={{ height: 40 }}>
              <DataTable.Cell style={{ flex: 2, borderRightWidth: 1, borderColor: '#ccc' }} numeric>{row[0]}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 4, borderRightWidth: 1, borderColor: '#ccc' }}>{row[1]}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 2, borderRightWidth: 1, borderColor: '#ccc' }} numeric>{row[2]}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>
                <TextInput
                  mode="flat"
                  value={row[3]}
                  style={{ fontSize: wp('4%'), height: 30, backgroundColor: 'transparent' }}
                  contentStyle={{ paddingVertical: 0 }}
                  onChangeText={(text) => handleChange(row[0], text)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
      <View style={styles.button}>
        <Button mode='contained' onPress={UpdateButton}>入力</Button>
      </View>
    </View>
  );
};

export default InsertPage;
