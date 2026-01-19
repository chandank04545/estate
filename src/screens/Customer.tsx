// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function Customer() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Customer Screen</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: '600',
//   },
// });


import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import api from '../api/api';


interface Customer {
  _id: string;
  name: string;
  phone: string;
  price: string;
}

const Customer: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    api.get('/customers').then((res) => setCustomers(res.data));
  }, []);

  return (
    <FlatList
      data={customers}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1 }}>
          <Text>Name: {item.name}</Text>
          <Text>Phone: {item.phone}</Text>
          <Text>Budget: {item.price}</Text>
        </View>
      )}
    />
  );
};

export default Customer;
