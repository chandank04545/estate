


// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   View,
//   Text,
//   StyleSheet,
// } from "react-native";
// import api from "../api/api";

// interface Customer {
//   _id: string;
//   name: string;
//   phone: string;
//   price: string;
//   location?: string;
//   propertyType?: string;
// }

// const Customer: React.FC = () => {
//   const [customers, setCustomers] = useState<Customer[]>([]);

//   useEffect(() => {
//     api.get("/customers").then((res) => setCustomers(res.data));
//   }, []);

//   return (
//     <FlatList
//       data={customers}
//       keyExtractor={(item) => item._id}
//       contentContainerStyle={styles.list}
//       renderItem={({ item }) => (
//         <View style={styles.card}>
//           {/* Header */}
//           <View style={styles.header}>
//             <Text style={styles.name}>{item.name}</Text>
//             <Text style={styles.price}>₹ {item.price}</Text>
//           </View>

//           {/* Details */}
//           <Text style={styles.label}>
//             Phone: <Text style={styles.value}>{item.phone}</Text>
//           </Text>

//           {item.location && (
//             <Text style={styles.label}>
//               Location: <Text style={styles.value}>{item.location}</Text>
//             </Text>
//           )}

//           {item.propertyType && (
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>{item.propertyType}</Text>
//             </View>
//           )}
//         </View>
//       )}
//     />
//   );
// };

// export default Customer;


// const styles = StyleSheet.create({
//   list: {
//     padding: 16,
//     paddingBottom: 32,
//   },

//   card: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 14,

//     // iOS shadow
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },

//     // Android shadow
//     elevation: 5,
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },

//   name: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#111827",
//     flex: 1,
//   },

//   price: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#16A34A", // green highlight
//   },

//   label: {
//     fontSize: 13,
//     color: "#6B7280",
//     marginTop: 4,
//   },

//   value: {
//     color: "#111827",
//     fontWeight: "500",
//   },

//   badge: {
//     alignSelf: "flex-start",
//     marginTop: 10,
//     backgroundColor: "#EFF6FF",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 20,
//   },

//   badgeText: {
//     fontSize: 12,
//     color: "#2563EB",
//     fontWeight: "600",
//   },
// });


// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import api from "../api/api";
// // import { MaterialIcons } from "@expo/vector-icons";


// interface Customer {
//   _id: string;
//   name: string;
//   phone: string;
//   price: string;
//   location?: string;
//   propertyType?: string;
// }

// const Customer: React.FC = () => {
//   const [customers, setCustomers] = useState<Customer[]>([]);

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       const res = await api.get("/customers");
//       setCustomers(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // 🔥 DELETE HANDLER
//   const confirmDelete = (id: string) => {
//     Alert.alert(
//       "Delete Customer",
//       "Are you sure you want to delete this customer?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: () => deleteCustomer(id),
//         },
//       ]
//     );
//   };

//   const deleteCustomer = async (id: string) => {
//     try {
//       await api.delete(`/customers/${id}`);
//       setCustomers((prev) => prev.filter((item) => item._id !== id));
//     } catch (err) {
//       Alert.alert("Error", "Failed to delete customer");
//     }
//   };

//   return (
//     <FlatList
//       data={customers}
//       keyExtractor={(item) => item._id}
//       contentContainerStyle={styles.list}
//       renderItem={({ item }) => (
//         <View style={styles.card}>
//           {/* Header */}
//           <View style={styles.header}>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.price}>₹ {item.price}</Text>
//             </View>

//             {/* 🗑️ DELETE ICON */}
//             <TouchableOpacity
//               onPress={() => confirmDelete(item._id)}
//               style={styles.deleteBtn}
//             >
//             {/* <MaterialIcons name="delete-outline" size={22} color="#EF4444" /> */}
//             <Text style={{fontSize:22, color:"#EF4444"}}>🗑️</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Details */}
//           <Text style={styles.label}>
//             Phone: <Text style={styles.value}>{item.phone}</Text>
//           </Text>

//           {item.location && (
//             <Text style={styles.label}>
//               Location: <Text style={styles.value}>{item.location}</Text>
//             </Text>
//           )}

//           {item.propertyType && (
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>{item.propertyType}</Text>
//             </View>
//           )}
//         </View>
//       )}
//     />
//   );
// };

// export default Customer;


// const styles = StyleSheet.create({
//   list: {
//     padding: 16,
//     paddingBottom: 32,
//   },

//   card: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 14,
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 5,
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 10,
//   },

//   deleteBtn: {
//     padding: 6,
//   },

//   name: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#111827",
//   },

//   price: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#16A34A",
//     marginTop: 2,
//   },

//   label: {
//     fontSize: 13,
//     color: "#6B7280",
//     marginTop: 4,
//   },

//   value: {
//     color: "#111827",
//     fontWeight: "500",
//   },

//   badge: {
//     alignSelf: "flex-start",
//     marginTop: 10,
//     backgroundColor: "#EFF6FF",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 20,
//   },

//   badgeText: {
//     fontSize: 12,
//     color: "#2563EB",
//     fontWeight: "600",
//   },
// });


import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import api from "../api/api";

interface Customer {
  _id: string;
  name: string;
  phone: string;
  price: string;
  location?: string;
  propertyType?: string;
}

const Customer: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  // 🔄 FETCH CUSTOMERS
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      Alert.alert("Error", "Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ CONFIRM DELETE
  const confirmDelete = (id: string) => {
     console.log('deleteCustomer called with id:', id);

      deleteCustomer(id)

    // Alert.alert(
    //   "Delete Customer",
    //   "Are you sure you want to delete this customer?",
    //   [
    //     { text: "Cancel", style: "cancel" },
    //     {
    //       text: "Delete",
    //       style: "destructive",
    //       onPress: () => deleteCustomer(id),
    //     },
    //   ]
    // );
  };

  // ❌ DELETE CUSTOMER
  const deleteCustomer = async (id: string) => {
    console.log('deleteCustomer called with id:', id);
    try {
      await api.delete(`/customers/${id}`);

      // Optimistic UI update
      setCustomers((prev) => prev.filter((item) => item._id !== id));


      // Alert.alert("Success", "Customer deleted successfully");
    } catch (err) {
      // Alert.alert("Error", "Failed to delete customer");
    }
  };

  return (
    <FlatList
      data={customers}
      keyExtractor={(item) => item._id}
      contentContainerStyle={[
        styles.list,
        customers.length === 0 && styles.emptyContainer,
      ]}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchCustomers} />
      }
      ListEmptyComponent={
        !loading ? (
          <Text style={styles.emptyText}>No customers found</Text>
        ) : null
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>₹ {item.price}</Text>
            </View>

            {/* DELETE BUTTON */}
            <TouchableOpacity
              onPress={() => confirmDelete(item._id)}
              style={styles.deleteBtn}
            >
              <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>

          {/* DETAILS */}
          <Text style={styles.label}>
            Phone: <Text style={styles.value}>{item.phone}</Text>
          </Text>

          {item.location && (
            <Text style={styles.label}>
              Location: <Text style={styles.value}>{item.location}</Text>
            </Text>
          )}

          {item.propertyType && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.propertyType}</Text>
            </View>
          )}
        </View>
      )}
    />
  );
};

export default Customer;

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 32,
  },

  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#9CA3AF",
    fontWeight: "500",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  deleteBtn: {
    padding: 6,
  },

  deleteIcon: {
    fontSize: 22,
    color: "#EF4444",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#16A34A",
    marginTop: 2,
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  value: {
    color: "#111827",
    fontWeight: "500",
  },

  badge: {
    alignSelf: "flex-start",
    marginTop: 10,
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 12,
    color: "#2563EB",
    fontWeight: "600",
  },
});
