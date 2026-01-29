

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

// const FIELD_CONFIG: any = {
//   name: { label: "Owner Name" },
//   phone: { label: "Phone Number", keyboardType: "phone-pad" },
//   address: { label: "Address", multiline: true },
//   propertyType: { label: "Property Type" },
//   propertySize: { label: "Property Size (sq ft)" },
//   location: { label: "Location" },
//   propertyAge: { label: "Property Age" },
//   price: { label: "Expected Price", keyboardType: "numeric" },
//   notes: { label: "Notes", multiline: true },
// };

// const OwnerForm = () => {
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     propertyType: "",
//     propertySize: "",
//     location: "",
//     propertyAge: "",
//     price: "",
//     notes: "",
//   });

//   const submitOwner = async () => {
//     try {
//       await api.post("/api/owners", form);
//       Alert.alert("Success", "Owner created");
//     } catch {
//       Alert.alert("Error", "Failed to create owner");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Owner Details</Text>

//       {Object.keys(form).map((key) => {
//         const config = FIELD_CONFIG[key];

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
//               value={form[key as keyof typeof form]}
//               onChangeText={(v) =>
//                 setForm({ ...form, [key]: v })
//               }
//             />
//           </View>
//         );
//       })}

//       <TouchableOpacity style={styles.button} onPress={submitOwner}>
//         <Text style={styles.buttonText}>Submit Owner</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default OwnerForm;

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#F3F4F6",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 16,
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


import React, { useMemo, useState } from "react";
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
import { User, Phone, MapPin, Home, Ruler, MapIcon, Calendar, DollarSign, MessageSquare, ArrowLeft } from "lucide-react-native";

interface OwnerFormData {
  name: string;
  phone: string;
  address: string;
  propertyType: string;
  propertySize: string;
  location: string;
  propertyAge: string;
  price: string;
  notes: string;
}

const FIELD_CONFIG: Record<keyof OwnerFormData, any> = {
  name: { label: "Owner Name", icon: "User", color: "#8b5cf6" },
  phone: { label: "Phone Number", keyboardType: "phone-pad", icon: "Phone", color: "#f59e0b" },
  address: { label: "Address", multiline: true, icon: "MapPin", color: "#06b6d4" },
  propertyType: { label: "Property Type", icon: "Home", color: "#10b981" },
  propertySize: { label: "Property Size (sq ft)", icon: "Ruler", color: "#ec4899" },
  location: { label: "Location", icon: "MapIcon", color: "#3b82f6" },
  propertyAge: { label: "Property Age", icon: "Calendar", color: "#f97316" },
  price: { label: "Expected Price", keyboardType: "numeric", icon: "DollarSign", color: "#14b8a6" },
  notes: { label: "Notes", multiline: true, icon: "MessageSquare", color: "#a855f7" },
};

const OwnerForm = () => {
  const navigation = useNavigation<any>();
  const [form, setForm] = useState<OwnerFormData>({
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

  /* ---------------- VALIDATION ---------------- */

  const isFormValid = useMemo(() => {
    const allFilled = Object.values(form).every(
      (value) => value.trim().length > 0
    );

    const isPhoneValid = /^\d{10}$/.test(form.phone);

    return allFilled && isPhoneValid;
  }, [form]);

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (key: keyof OwnerFormData, value: string) => {
    if (key === "phone") {
      const digitsOnly = value.replace(/[^0-9]/g, "").slice(0, 10);
      setForm({ ...form, phone: digitsOnly });
      return;
    }

    setForm({ ...form, [key]: value });
  };

  const submitOwner = async () => {
    if (!isFormValid) {
      Alert.alert(
        "Invalid Form",
        "Please fill all fields and enter a valid 10-digit phone number."
      );
      return;
    }

    try {
      await api.post("/owners", form);
      Alert.alert("Success", "Owner created");

      setForm({
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
    } catch (error) {
      Alert.alert("Error", "Failed to create owner");
      console.error(error);
    }
  };

  /* ---------------- UI ---------------- */

  const getIcon = (fieldKey: keyof OwnerFormData) => {
    const iconProps = { size: 20, color: FIELD_CONFIG[fieldKey].color, strokeWidth: 2 };
    
    switch (fieldKey) {
      case "name":
        return <User {...iconProps} />;
      case "phone":
        return <Phone {...iconProps} />;
      case "address":
        return <MapPin {...iconProps} />;
      case "propertyType":
        return <Home {...iconProps} />;
      case "propertySize":
        return <Ruler {...iconProps} />;
      case "location":
        return <MapIcon {...iconProps} />;
      case "propertyAge":
        return <Calendar {...iconProps} />;
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
        <View style={{flexDirection: 'row', alignItems: 'center'}} >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#fff" strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Owner Profile</Text>
         </View>
        
      </View>

      {/* Scrollable Form */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Form Card */}
        <View style={styles.formCard}>
          {Object.keys(form).map((key) => {
            const fieldKey = key as keyof OwnerFormData;
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
                    onChangeText={(text) =>
                      handleChange(fieldKey, text)
                    }
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
          onPress={submitOwner}
          disabled={!isFormValid}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>✓ Submit Owner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OwnerForm;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf5ff",
  },
  scrollContent: {
    // paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 100,
  },
  headerBanner: {
    backgroundColor: "#8b5cf6",
    paddingTop: 10,
    paddingHorizontal: 20,
    // borderBottomLeftRadius: 24,
    // borderBottomRightRadius: 24,
   
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
    marginTop: 4,
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
    backgroundColor: "#faf5ff",
    borderTopWidth: 1,
    borderTopColor: "#e9d5ff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: "#8b5cf6",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#8b5cf6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "#ddd6fe",
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
