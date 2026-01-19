// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert } from 'react-native';
// // import api from '../../api/api';
// import api from '../../api/api'


// interface Owner {
//   name: string;
//   phone: string;
//   address: string;
//   propertyType: string;
//   propertySize: string;
//   location: string;
//   propertyAge: string;
//   price: string;
//   notes: string;
// }

// const OwnerForm: React.FC = () => {
//   const [form, setForm] = useState<Owner>({
//     name: '',
//     phone: '',
//     address: '',
//     propertyType: '',
//     propertySize: '',
//     location: '',
//     propertyAge: '',
//     price: '',
//     notes: '',
//   });

//   const handleChange = (key: keyof Owner, value: string) => {
//     setForm({ ...form, [key]: value });
//   };

//   const submitOwner = async () => {
//     try {
//       // await api.post('/owners', form);
//       await api.post('/api/owners', form);
//       Alert.alert('Success', 'Owner created');
//       setForm({
//         name: '',
//         phone: '',
//         address: '',
//         propertyType: '',
//         propertySize: '',
//         location: '',
//         propertyAge: '',
//         price: '',
//         notes: '',
//       });
//     } catch(err) {
//       Alert.alert('Error', 'Failed to create owner');
//       console.error('Error creating owner:', err);

//     }
//   };

//   return (
//     <View>
//       {Object.keys(form).map((key) => (
//         <TextInput
//           key={key}
//           placeholder={key}
//           value={form[key as keyof Owner]}
//           onChangeText={(text) =>
//             handleChange(key as keyof Owner, text)
//           }
//           style={{
//             borderWidth: 1,
//             padding: 8,
//             marginVertical: 6,
//             borderRadius: 5,
//           }}
//         />
//       ))}

//       <Button title="Submit Owner" onPress={submitOwner} />
//     </View>
//   );
// };

// export default OwnerForm;

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

const FIELD_CONFIG: any = {
  name: { label: "Owner Name" },
  phone: { label: "Phone Number", keyboardType: "phone-pad" },
  address: { label: "Address", multiline: true },
  propertyType: { label: "Property Type" },
  propertySize: { label: "Property Size (sq ft)" },
  location: { label: "Location" },
  propertyAge: { label: "Property Age" },
  price: { label: "Expected Price", keyboardType: "numeric" },
  notes: { label: "Notes", multiline: true },
};

const OwnerForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    propertyType: "",
    propertySize: "",
    location: "",
    propertyAge: "",
    price: "",
    notes: "",
  });

  const submitOwner = async () => {
    try {
      await api.post("/api/owners", form);
      Alert.alert("Success", "Owner created");
    } catch {
      Alert.alert("Error", "Failed to create owner");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Owner Details</Text>

      {Object.keys(form).map((key) => {
        const config = FIELD_CONFIG[key];

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
              value={form[key as keyof typeof form]}
              onChangeText={(v) =>
                setForm({ ...form, [key]: v })
              }
            />
          </View>
        );
      })}

      <TouchableOpacity style={styles.button} onPress={submitOwner}>
        <Text style={styles.buttonText}>Submit Owner</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OwnerForm;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
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
