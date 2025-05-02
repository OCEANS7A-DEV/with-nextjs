
import React, { useState, useEffect } from "react";
import DrawerComponent from '../Comp/DrawerComp';
import { StyleSheet, Text, View } from "react-native";
import { Button, DataTable, TextInput } from 'react-native-paper';
import { ListGet } from '../backEnd/server'
import { useSwipeable } from 'react-swipeable';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: '100dvh',
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
    display: 'flex',
    boxShadow: ' 0 10px 25px 0 rgba(0, 0, 0, .8)',
    bottom: 0,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  }
});


const InsertPage = () => {
  const [data, setData] = useState([])
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [active, setActive] = useState('');

  const [insertData, setInsertData] = useState([])

  const handlers = useSwipeable({
    onSwipedLeft: () => setDrawerVisible(false),
    onSwipedRight: () => setDrawerVisible(true),
    delta: 50,
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
  });

  const DataGet = async() => {
    const inventoryData = await ListGet()
    const searchData = JSON.parse(sessionStorage.getItem('selectCode') ?? '')
    //console.log(searchData)
    const searchResult = searchData.map(item => inventoryData.find(row => row[1] == item))
    //console.log(searchResult)
    setData(searchResult)
    const insert = searchResult.map(item => {
      const result = [item[1], item[2], item[12], item[13]]
      return result
    })
    setInsertData(insert)
  }

  const handlechange = (index, data) => {
    const newData = insertData.map(item => {
      return item[0] == index ? [item[0], item[1], item[2], data] : [item[0], item[1], item[2], item[3]]
    })
    setData(newData)
  }

  const UpdateButton = async () => {
    console.log(insertData)
  }

  useEffect(() => {
    DataGet()
  },[])

  return (
    <View {...handlers} style={styles.container}>
      {drawerVisible && (
        <DrawerComponent active={active} setActive={setActive} />
      )}
      <Text>在庫数入力</Text>
      <View style={styles.table}>
        <DataTable style={{padding: 0}}>
          <DataTable.Header style={{padding: 2}}>
            <DataTable.Title textStyle={{ fontSize: wp('3%') }} style={{flex: 2, paddingRight: 10, borderRightWidth: 1, borderColor: '#ccc' }}>商品コード</DataTable.Title>
            <DataTable.Title textStyle={{ fontSize: wp('3%') }} style={{flex: 4, paddingLeft: 10, borderRightWidth: 1, borderColor: '#ccc' }}>商品名</DataTable.Title>
            <DataTable.Title textStyle={{ fontSize: wp('3%') }} style={{flex: 2, paddingLeft: 10, borderRightWidth: 1, borderColor: '#ccc' }}>データ上</DataTable.Title>
            <DataTable.Title textStyle={{ fontSize: wp('3%') }} style={{flex: 2, paddingLeft: 10}}>入力</DataTable.Title>
          </DataTable.Header>
          {insertData.map((row,index) => (
            <DataTable.Row key={index} style={{padding: 2, height: 30}}>
              <DataTable.Cell textStyle={{ fontSize: wp('3%') }} style={{flex: 2, paddingRight: 10, borderRightWidth: 1, borderColor: '#ccc' }} numeric>{row[0]}</DataTable.Cell>
              <DataTable.Cell textStyle={{ fontSize: wp('3%') }} style={{flex: 4, paddingLeft: 10, borderRightWidth: 1, borderColor: '#ccc' }}>{row[1]}</DataTable.Cell>
              <DataTable.Cell textStyle={{ fontSize: wp('3%') }} style={{flex: 2, paddingRight: 10, borderRightWidth: 1, borderColor: '#ccc' }} numeric>{row[2]}</DataTable.Cell>
              <DataTable.Cell textStyle={{ fontSize: wp('3%') }} style={{flex: 2, paddingLeft: 10}}>
                <TextInput
                  mode="flat"
                  value={row[3]}
                  contentStyle={{ padding: 0 }}
                  style={{fontSize: wp('4%'), width: '100%', height: 30}}
                  onChange={(e) => handlechange(row[1],e.target.value)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
      <View style={styles.button}>
        <Button mode='elevated' onPress={UpdateButton}>入力</Button>
      </View>
    </View>
  )
}

export default InsertPage