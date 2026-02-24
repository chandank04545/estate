// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import MainStackNavigator from './src/navigation/MainStackNavigator';


// export default function App() {
//   return (
//     <NavigationContainer>
//       <MainStackNavigator />
//     </NavigationContainer>
//   );
// }


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import MainStackNavigator from './src/navigation/MainStackNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}