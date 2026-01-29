

// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   RefreshControl,
// } from "react-native";
// import api from "../api/api";

// interface Owner {
//   _id: string;
//   name: string;
//   phone: string;
//   location?: string;
//   propertyType?: string;
// }

// const Owner: React.FC = () => {
//   const [owners, setOwners] = useState<Owner[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchOwners();
//   }, []);

//   // 🔄 FETCH OWNERS
//   const fetchOwners = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/owners");
//       setOwners(res.data);
//       console.log('respomnse=======>', res.data);
//     } catch (err) {
//       Alert.alert("Error", "Failed to fetch owners");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🗑️ CONFIRM DELETE
//   const confirmDelete = (id: string) => {
//     Alert.alert(
//       "Delete Owner",
//       "Are you sure you want to delete this owner?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: () => deleteOwner(id),
//         },
//       ]
//     );
//   };

//   // ❌ DELETE OWNER
//   const deleteOwner = async (id: string) => {
//     try {
//       await api.delete(`/owners/${id}`);
//       setOwners((prev) => prev.filter((item) => item._id !== id));
//     } catch (err) {
//       Alert.alert("Error", "Failed to delete owner");
//     }
//   };

//   return (
//     <FlatList
//       data={owners}
//       keyExtractor={(item) => item._id}
//       contentContainerStyle={[
//         styles.list,
//         owners.length === 0 && styles.emptyContainer,
//       ]}
//       refreshControl={
//         <RefreshControl refreshing={loading} onRefresh={fetchOwners} />
//       }
//       ListEmptyComponent={
//         !loading ? (
//           <Text style={styles.emptyText}>No owners found</Text>
//         ) : null
//       }
//       renderItem={({ item }) => (
//         <View style={styles.card}>
//           {/* HEADER */}
//           <View style={styles.header}>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.name}>{item.name}</Text>
//             </View>

//             {/* DELETE */}
//             <TouchableOpacity
//               onPress={() => confirmDelete(item._id)}
//               style={styles.deleteBtn}
//             >
//               <Text style={styles.deleteIcon}>🗑️</Text>
//             </TouchableOpacity>
//           </View>

//           {/* DETAILS */}
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

// export default Owner;


// const styles = StyleSheet.create({
//   list: {
//     padding: 16,
//     paddingBottom: 32,
//   },

//   emptyContainer: {
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   emptyText: {
//     fontSize: 16,
//     color: "#9CA3AF",
//     fontWeight: "500",
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

//   deleteIcon: {
//     fontSize: 22,
//     color: "#EF4444",
//   },

//   name: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#111827",
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

interface Owner {
  _id: string;
  name: string;
  phone: string;
  location?: string;
  address?: string;
  price?: string;
  propertyType?: string;
  propertySize?: string;
  propertyAge?: string;
  notes?: string;
  createdAt: string;
}

const Owner: React.FC = () => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOwners();
  }, []);

  // 🔄 FETCH OWNERS
  const fetchOwners = async () => {
    try {
      setLoading(true);
      const res = await api.get("/owners");
      setOwners(res.data);
    } catch {
      Alert.alert("Error", "Failed to fetch owners");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ DELETE OWNER
  const confirmDelete = (id: string) => {
    Alert.alert(
      "Delete Owner",
      "Are you sure you want to delete this owner?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteOwner(id),
        },
      ]
    );
  };

  const deleteOwner = async (id: string) => {
    try {
      await api.delete(`/owners/${id}`);
      setOwners((prev) => prev.filter((item) => item._id !== id));
    } catch {
      Alert.alert("Error", "Failed to delete owner");
    }
  };

  // 📅 FORMAT DATE
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <FlatList
      data={owners}
      keyExtractor={(item) => item._id}
      contentContainerStyle={[
        styles.list,
        owners.length === 0 && styles.emptyContainer,
      ]}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchOwners} />
      }
      ListEmptyComponent={
        !loading ? (
          <Text style={styles.emptyText}>No owners found</Text>
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

          {item.address && (
            <Text style={styles.label}>
              Address: <Text style={styles.value}>{item.address}</Text>
            </Text>
          )}

          <View style={styles.row}>
            {item.propertyType && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.propertyType}</Text>
              </View>
            )}

            {item.propertySize && (
              <View style={styles.badgeAlt}>
                <Text style={styles.badgeAltText}>
                  {item.propertySize} sqft
                </Text>
              </View>
            )}

            {item.propertyAge && (
              <View style={styles.badgeAlt}>
                <Text style={styles.badgeAltText}>
                  {item.propertyAge} yrs
                </Text>
              </View>
            )}
          </View>

          {item.notes && (
            <Text style={styles.notes}>
              📝 {item.notes}
            </Text>
          )}

          {/* FOOTER */}
          <Text style={styles.date}>
            Created on {formatDate(item.createdAt)}
          </Text>
        </View>
      )}
    />
  );
};

export default Owner;


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
    marginBottom: 8,
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

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },

  badge: {
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

  badgeAlt: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeAltText: {
    fontSize: 12,
    color: "#059669",
    fontWeight: "600",
  },

  notes: {
    marginTop: 10,
    fontSize: 13,
    color: "#374151",
    fontStyle: "italic",
  },

  date: {
    marginTop: 12,
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "right",
  },
});
