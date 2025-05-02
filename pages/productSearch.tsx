import React, { useState } from "react";
import DrawerComponent from '../Comp/DrawerComp';
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button, DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { searchStr } from '../backEnd/back';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: '100vh',
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
  }
});

const SearchPage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [active, setActive] = useState('search');
  const [text, onChangeText] = useState('');
  const [resultData, setResultData] = useState<string[][]>([]);
  const router = useRouter();

  const handlers = useSwipeable({
    onSwipedLeft: () => setDrawerVisible(false),
    onSwipedRight: () => setDrawerVisible(true),
    delta: 50,
    preventScrollOnSwipe: true, // スクロールと競合しないように
    trackMouse: true,
    trackTouch: true,
  });

  const ProductSearch = async () => {
    const result = await searchStr(text);
    setResultData(result);
  };

  const PageTransition = (code) => {
    sessionStorage.setItem('selectCode', JSON.stringify([code]))
    router.prefetch('/InventoryUpdate')
    router.push('/InventoryUpdate')
  }

  return (
    <View {...handlers} style={styles.container}>
      {drawerVisible && (
        <DrawerComponent active={active} setActive={setActive} />
      )}

      <Text>検索</Text>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Button onPress={ProductSearch}>検索</Button>
      </View>

      <ScrollView style={{ width: '100%' }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 0.5 }}>商品コード</DataTable.Title>
            <DataTable.Title style={{ flex: 2 }}>商品名</DataTable.Title>
          </DataTable.Header>
          {resultData.map((row, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell style={{ flex: 0.5 }} numeric>{row[1]}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }} onPress={() => {
                PageTransition(row[1])
              }}>{row[2]}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default SearchPage;
