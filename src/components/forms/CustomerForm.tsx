

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import api from "../../api/api";

// interface Customer {
//   name: string;
//   phone: string;
//   propertyType: string;
//   location: string;
//   price: string;
//   notes: string;
// }

// const FIELD_CONFIG: Record<keyof Customer, any> = {
//   name: { label: "Customer Name" },
//   phone: { label: "Phone Number", keyboardType: "phone-pad" },
//   propertyType: { label: "Property Type" },
//   location: { label: "Preferred Location" },
//   price: { label: "Budget", keyboardType: "numeric" },
//   notes: { label: "Notes", multiline: true },
// };

// const CustomerForm: React.FC = () => {
//   const [form, setForm] = useState<Customer>({
//     name: "",
//     phone: "",
//     propertyType: "",
//     location: "",
//     price: "",
//     notes: "",
//   });

//   const submitCustomer = async () => {
//     try {
//       await api.post("/customers", form);
//       Alert.alert("Success", "Customer created");
//       setForm({
//         name: "",
//         phone: "",
//         propertyType: "",
//         location: "",
//         price: "",
//         notes: "",
//       });
//     } catch (error) {
//       Alert.alert("Error", "Failed to create customer");
//       console.error(error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Customer Requirements</Text>

//       {Object.keys(form).map((key) => {
//         const config = FIELD_CONFIG[key as keyof Customer];

//         return (
//           <View key={key} style={styles.field}>
//             <Text style={styles.label}>{config.label}</Text>

//             <TextInput
//               style={[
//                 styles.input,
//                 config.multiline && styles.textArea,
//               ]}
//               placeholder={config.label}
//               keyboardType={config.keyboardType || "default"}
//               multiline={config.multiline}
//               value={form[key as keyof Customer]}
//               onChangeText={(text) =>
//                 setForm({ ...form, [key]: text })
//               }
//             />
//           </View>
//         );
//       })}

//       <TouchableOpacity style={styles.button} onPress={submitCustomer}>
//         <Text style={styles.buttonText}>Submit Customer</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default CustomerForm;


// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#F3F4F6",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 16,
//     color: "#111827",
//   },
//   field: {
//     marginBottom: 12,
//   },
//   label: {
//     fontSize: 13,
//     color: "#374151",
//     marginBottom: 6,
//     fontWeight: "500",
//   },
//   input: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     padding: 14,
//     fontSize: 15,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//   },
//   textArea: {
//     height: 90,
//     textAlignVertical: "top",
//   },
//   button: {
//     backgroundColor: "#2563EB",
//     padding: 16,
//     borderRadius: 14,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });


import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../api/api";
import { Users, User, Phone, Home, MapPin, DollarSign, MessageSquare, ArrowLeft } from "lucide-react-native";

interface Customer {
  name: string;
  phone: string;
  propertyType: string;
  location: string;
  price: string;
  notes: string;
}

const FIELD_CONFIG: Record<keyof Customer, any> = {
  name: { label: "Customer Name", icon: "User", color: "#ec4899" },
  phone: { label: "Phone Number", keyboardType: "phone-pad", icon: "Phone", color: "#f59e0b" },
  propertyType: { label: "Property Type", icon: "Home", color: "#8b5cf6" },
  location: { label: "Preferred Location", icon: "MapPin", color: "#06b6d4" },
  price: { label: "Budget", keyboardType: "numeric", icon: "DollarSign", color: "#10b981" },
  notes: { label: "Notes", multiline: true, icon: "MessageSquare", color: "#3b82f6" },
};

const CustomerForm: React.FC = () => {
  const navigation = useNavigation<any>();
  const [form, setForm] = useState<Customer>({
    name: "",
    phone: "",
    propertyType: "",
    location: "",
    price: "",
    notes: "",
  });

  /* ------------------ VALIDATIONS ------------------ */

  const isFormValid = useMemo(() => {
    const allFieldsFilled = Object.values(form).every(
      (value) => value.trim().length > 0
    );

    const isPhoneValid = /^\d{10}$/.test(form.phone);

    return allFieldsFilled && isPhoneValid;
  }, [form]);

  const submitCustomer = async () => {
    if (!isFormValid) {
      Alert.alert(
        "Invalid Form",
        "Please fill all fields and enter a valid 10-digit phone number."
      );
      return;
    }

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

  /* ------------------ INPUT HANDLERS ------------------ */

  const handleChange = (key: keyof Customer, value: string) => {
    if (key === "phone") {
      // Allow ONLY digits & max 10 chars
      const cleaned = value.replace(/[^0-9]/g, "").slice(0, 10);
      setForm({ ...form, phone: cleaned });
      return;
    }

    setForm({ ...form, [key]: value });
  };

  /* ------------------ UI ------------------ */

  const getIcon = (fieldKey: keyof Customer) => {
    const iconProps = { size: 20, color: FIELD_CONFIG[fieldKey].color, strokeWidth: 2 };

    switch (fieldKey) {
      case "name":
        return <User {...iconProps} />;
      case "phone":
        return <Phone {...iconProps} />;
      case "propertyType":
        return <Home {...iconProps} />;
      case "location":
        return <MapPin {...iconProps} />;
      case "price":
        return <DollarSign {...iconProps} />;
      case "notes":
        return <MessageSquare {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Banner - Sticky */}
      <View style={styles.headerBanner}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#fff" strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create New Customer</Text>
        </View>

      </View>

      {/* Scrollable Form */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Form Fields */}
        <View style={styles.formCard}>
          {Object.keys(form).map((key) => {
            const fieldKey = key as keyof Customer;
            const config = FIELD_CONFIG[fieldKey];
            const bgColor = config.color + "15";

            return (
              <View key={key} style={styles.fieldContainer}>
                <View style={styles.labelRow}>
                  <View style={[styles.colorDot, { backgroundColor: config.color }]} />
                  <Text style={styles.label}>{config.label}</Text>
                </View>

                <View style={[styles.inputWrapper, { backgroundColor: bgColor }]}>
                  <View style={[styles.iconContainer, { backgroundColor: config.color + "25" }]}>
                    {getIcon(fieldKey)}
                  </View>

                  <TextInput
                    style={[
                      styles.input,
                      config.multiline && styles.textArea,
                      fieldKey === "phone" &&
                      form.phone.length > 0 &&
                      form.phone.length < 10 && {
                        borderColor: "#EF4444",
                      },
                    ]}
                    placeholder={`Enter ${config.label.toLowerCase()}`}
                    placeholderTextColor="#999"
                    keyboardType={config.keyboardType || "default"}
                    multiline={config.multiline}
                    value={form[fieldKey]}
                    onChangeText={(text) => handleChange(fieldKey, text)}
                    maxLength={fieldKey === "phone" ? 10 : undefined}
                  />
                </View>

                {fieldKey === "phone" &&
                  form.phone.length > 0 &&
                  form.phone.length < 10 && (
                    <Text style={styles.errorText}>
                      ⚠️ Phone number must be 10 digits
                    </Text>
                  )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Submit Button - Sticky */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            !isFormValid && styles.buttonDisabled,
          ]}
          onPress={submitCustomer}
          disabled={!isFormValid}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>✓ Submit Customer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomerForm;

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
  },
  scrollContent: {
    // paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 100,
  },
  headerBanner: {
    // backgroundColor: "linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)",
    backgroundColor: '#ec4899',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
    width: '80%'
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  formCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 14,
    paddingLeft: 12,
    paddingRight: 12,
    paddingVertical: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: "#1f2937",
    borderWidth: 2,
    borderColor: "transparent",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  errorText: {
    marginTop: 8,
    marginLeft: 40,
    fontSize: 12,
    color: "#EF4444",
    fontWeight: "500",
  },
  buttonContainer: {
    backgroundColor: "#f0f9ff",
    borderTopWidth: 1,
    borderTopColor: "#bfdbfe",
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: "#ec4899",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "#fbcfe8",
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
