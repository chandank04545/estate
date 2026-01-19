// import React, { useState } from 'react';
// import { View, Button, ScrollView } from 'react-native';
// import OwnerForm from '../components/forms/OwnerForm';
// import CustomerForm from '../components/forms/CustomerForm';


// const HomeScreen: React.FC = () => {
//   const [showOwner, setShowOwner] = useState(false);
//   const [showCustomer, setShowCustomer] = useState(false);

//   return (
//     <ScrollView contentContainerStyle={{ padding: 16 }}>
//       <Button
//         title="Create Owner"
//         onPress={() => {
//           setShowOwner(true);
//           setShowCustomer(false);
//         }}
//       />

//       <View style={{ marginVertical: 10 }} />

//       <Button
//         title="Create Customer"
//         onPress={() => {
//           setShowCustomer(true);
//           setShowOwner(false);
//         }}
//       />

//       {showOwner && <OwnerForm />}
//       {showCustomer && <CustomerForm />}
//     </ScrollView>
//   );
// };

// export default HomeScreen;


import React from 'react';
import { View, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Button
        title="Create Owner"
        onPress={() => navigation.navigate('OwnerForm')}
      />

      <View style={{ marginVertical: 10 }} />

      <Button
        title="Create Customer"
        onPress={() => navigation.navigate('CustomerForm')}
      />
    </ScrollView>
  );
};

export default HomeScreen;
