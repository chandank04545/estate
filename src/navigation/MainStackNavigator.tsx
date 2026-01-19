import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import OwnerForm from '../components/forms/OwnerForm';
import CustomerForm from '../components/forms/CustomerForm';


const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      {/* Tabs */}
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />

      {/* Global Form Screens */}
      <Stack.Screen
        name="OwnerForm"
        component={OwnerForm}
        options={{ title: 'Create Owner' }}
      />

      <Stack.Screen
        name="CustomerForm"
        component={CustomerForm}
        options={{ title: 'Create Customer' }}
      />
    </Stack.Navigator>
  );
}
