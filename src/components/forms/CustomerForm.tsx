// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert } from 'react-native';
// import api from '../../api/api';


// interface Customer {
//   name: string;
//   phone: string;
//   propertyType: string;
//   location: string;
//   price: string;
//   notes: string;
// }

// const CustomerForm: React.FC = () => {
//   const [form, setForm] = useState<Customer>({
//     name: '',
//     phone: '',
//     propertyType: '',
//     location: '',
//     price: '',
//     notes: '',
//   });

//   const handleChange = (key: keyof Customer, value: string) => {
//     setForm({ ...form, [key]: value });
//   };

//   const submitCustomer = async () => {
//     console.log('Submitting customer:', form);
//     try {
//       await api.post('/customers', form);
//       Alert.alert('Success', 'Customer created');
//       setForm({
//         name: '',
//         phone: '',
//         propertyType: '',
//         location: '',
//         price: '',
//         notes: '',
//       });
//     } catch(error) {
//       Alert.alert('Error', 'Failed to create customer');
//       console.error('Error submitting customer:', error);
//     }
//   };

//   return (
//     <View>
//       {Object.keys(form).map((key) => (
//         <TextInput
//           key={key}
//           placeholder={key}
//           value={form[key as keyof Customer]}
//           onChangeText={(text) =>
//             handleChange(key as keyof Customer, text)
//           }
//           style={{
//             borderWidth: 1,
//             padding: 8,
//             marginVertical: 6,
//             borderRadius: 5,
//           }}
//         />
//       ))}

//       <Button title="Submit Customer" onPress={submitCustomer} />
//     </View>
//   );
// };

// export default CustomerForm;


import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import api from "../../api/api";

interface Customer {
  name: string;
  phone: string;
  propertyType: string;
  location: string;
  price: string;
  notes: string;
}

const FIELD_CONFIG: Record<keyof Customer, any> = {
  name: { label: "Customer Name" },
  phone: { label: "Phone Number", keyboardType: "phone-pad" },
  propertyType: { label: "Property Type" },
  location: { label: "Preferred Location" },
  price: { label: "Budget", keyboardType: "numeric" },
  notes: { label: "Notes", multiline: true },
};

const CustomerForm: React.FC = () => {
  const [form, setForm] = useState<Customer>({
    name: "",
    phone: "",
    propertyType: "",
    location: "",
    price: "",
    notes: "",
  });

  const submitCustomer = async () => {
    try {
      await api.post("/customers", form);
      Alert.alert("Success", "Customer created");
      setForm({
        name: "",
        phone: "",
        propertyType: "",
        location: "",
        price: "",
        notes: "",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to create customer");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Customer Requirements</Text>

      {Object.keys(form).map((key) => {
        const config = FIELD_CONFIG[key as keyof Customer];

        return (
          <View key={key} style={styles.field}>
            <Text style={styles.label}>{config.label}</Text>

            <TextInput
              style={[
                styles.input,
                config.multiline && styles.textArea,
              ]}
              placeholder={config.label}
              keyboardType={config.keyboardType || "default"}
              multiline={config.multiline}
              value={form[key as keyof Customer]}
              onChangeText={(text) =>
                setForm({ ...form, [key]: text })
              }
            />
          </View>
        );
      })}

      <TouchableOpacity style={styles.button} onPress={submitCustomer}>
        <Text style={styles.buttonText}>Submit Customer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CustomerForm;


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
