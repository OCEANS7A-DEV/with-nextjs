import Head from "next/head";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App({ Component, pageProps }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SafeAreaProvider>
        <Component {...pageProps} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}