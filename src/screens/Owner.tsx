import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import api from '../api/api';

interface Owner {
  _id: string;
  name: string;
  phone: string;
  location: string;
}

const Owner: React.FC = () => {
  const [owners, setOwners] = useState<Owner[]>([]);

  useEffect(() => {
    api.get('/owners').then((res) => setOwners(res.data));
  }, []);

  return (
    <FlatList
      data={owners}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1 }}>
          <Text>Name: {item.name}</Text>
          <Text>Phone: {item.phone}</Text>
          <Text>Location: {item.location}</Text>
        </View>
      )}
    />
  );
};

export default Owner;
