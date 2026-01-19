// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Customer from '../screens/Customer';
// import Owner from '../screens/Owner';
// import HomeScreen from '../screens/HomeScreen';



// const Tab = createBottomTabNavigator();

// export default function BottomTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: '#1976d2',
//       }}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Owner" component={Owner} />
//       <Tab.Screen name="Customer" component={Customer} />
//     </Tab.Navigator>
//   );
// }

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Owner from '../screens/Owner';
import Customer from '../screens/Customer';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Owner" component={Owner} />
      <Tab.Screen name="Customer" component={Customer} />
    </Tab.Navigator>
  );
}

