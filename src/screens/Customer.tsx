


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
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Users } from "lucide-react-native";
import api from "../api/api";
import { useNavigation } from "@react-navigation/native";

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

  const navigation = useNavigation()

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
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <Users size={32} color="#fff" strokeWidth={2} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Customers</Text>
            <Text style={styles.headerSubtitle}>Total: {customers.length}</Text>
          </View>
        </View>
      </View>

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
            <View style={styles.emptyStateContainer}>
              <Users size={48} color="#d1d5db" strokeWidth={1.5} />
              <Text style={styles.emptyText}>No customers found</Text>
            </View>
          ) : null
        }
      renderItem={({ item }) => (
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.headerCard}>
            <View style={styles.nameSection}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>₹ {item.price}</Text>
            </View>

            {/* DELETE AND EDIT BUTTONS */}
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                onPress={() => confirmDelete(item._id)}
                style={styles.deleteBtn}
              >
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  (navigation as any).navigate("CustomerEdit", {
                    customer: item,
                    onUpdate: (updatedCustomer: any) => {
                      setCustomers(prev =>
                        prev.map(c =>
                          c._id === updatedCustomer._id ? updatedCustomer : c
                        )
                      );
                    },
                  })
                }
                style={styles.editBtn}
              >
                <Text style={styles.editIcon}>✏️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* DIVIDER */}
          <View style={styles.divider} />

          {/* DETAILS */}
          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>📱</Text>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Phone</Text>
                <Text style={styles.detailValue}>{item.phone}</Text>
              </View>
            </View>

            {item.location && (
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>📍</Text>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Location</Text>
                  <Text style={styles.detailValue}>{item.location}</Text>
                </View>
              </View>
            )}
          </View>

          {item.propertyType && (
            <View style={styles.badgesSection}>
              <View style={[styles.badge, styles.badgePink]}>
                <Text style={styles.badgeText}>{item.propertyType}</Text>
              </View>
            </View>
          )}
        </View>
      )}
    />
    </SafeAreaView>
  );
};

export default Customer;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f0f9ff",
  },
  headerBanner: {
    backgroundColor: "#ec4899",
    paddingVertical: 24,
    paddingHorizontal: 16,
     paddingTop: 60,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  emptyStateContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
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
    marginTop: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#ec4899",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    backgroundColor: "#fce7f3",
  },

  nameSection: {
    flex: 1,
  },

  buttonGroup: {
    flexDirection: "row",
    gap: 8,
  },

  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#fee2e2",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteIcon: {
    fontSize: 18,
  },

  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#fce7f3",
    justifyContent: "center",
    alignItems: "center",
  },

  editIcon: {
    fontSize: 18,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
  },

  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16A34A",
  },

  divider: {
    height: 1,
    backgroundColor: "#fbcfe8",
  },

  detailsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  detailIcon: {
    fontSize: 18,
    marginRight: 10,
    marginTop: 2,
  },

  detailContent: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "600",
    marginBottom: 2,
  },

  detailValue: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },

  badgesSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  badgePink: {
    backgroundColor: "#fbcfe8",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#be185d",
  },
});

