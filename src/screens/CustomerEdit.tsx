import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import api from "../api/api";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

interface Customer {
  _id: string;
  name: string;
  phone: string;
  price: string;
  location?: string;
  propertyType?: string;
}

type RouteParams = {
  params: {
    customer: Customer;
    onUpdate: (customer: Customer) => void;
  };
};

const CustomerEdit: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const navigation = useNavigation();
  const { customer, onUpdate } = route.params;

  const [form, setForm] = useState({
    name: customer.name,
    phone: customer.phone,
    price: customer.price,
    location: customer.location || "",
    propertyType: customer.propertyType || "",
  });

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await api.put(`/customers/${customer._id}`, form);

      onUpdate(res.data); // update list instantly
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", "Failed to update customer");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Customer</Text>

      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(v) => handleChange("name", v)}
        placeholder="Name"
      />

      <TextInput
        style={styles.input}
        value={form.phone}
        onChangeText={(v) => handleChange("phone", v)}
        placeholder="Phone"
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        value={form.price}
        onChangeText={(v) => handleChange("price", v)}
        placeholder="Price"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        value={form.location}
        onChangeText={(v) => handleChange("location", v)}
        placeholder="Location"
      />

      <TextInput
        style={styles.input}
        value={form.propertyType}
        onChangeText={(v) => handleChange("propertyType", v)}
        placeholder="Property Type"
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CustomerEdit;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#FFF",
  },
  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  saveText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
