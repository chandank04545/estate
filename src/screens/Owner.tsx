


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
import { Building2, Users } from "lucide-react-native";
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
            <Building2 size={32} color="#fff" strokeWidth={2} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Property Owners</Text>
            <Text style={styles.headerSubtitle}>Total: {owners.length}</Text>
          </View>
        </View>
      </View>

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
            <View style={styles.emptyStateContainer}>
              <Building2 size={48} color="#d1d5db" strokeWidth={1.5} />
              <Text style={styles.emptyText}>No owners found</Text>
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

              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  onPress={() => confirmDelete(item._id)}
                  style={styles.deleteBtn}
                >
                  <Text style={styles.deleteIcon}>🗑️</Text>
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

              {item.address && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>🏠</Text>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Address</Text>
                    <Text style={styles.detailValue}>{item.address}</Text>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.badgesSection}>
              {item.propertyType && (
                <View style={[styles.badge, styles.badgePurple]}>
                  <Text style={styles.badgeText}>{item.propertyType}</Text>
                </View>
              )}

              {item.propertySize && (
                <View style={[styles.badge, styles.badgeGreen]}>
                  <Text style={styles.badgeText}>{item.propertySize} sqft</Text>
                </View>
              )}

              {item.propertyAge && (
                <View style={[styles.badge, styles.badgeOrange]}>
                  <Text style={styles.badgeText}>{item.propertyAge} yrs</Text>
                </View>
              )}
            </View>

            {item.notes && (
              <View style={styles.notesSection}>
                <Text style={styles.notesLabel}>📝 Notes</Text>
                <Text style={styles.notesText}>{item.notes}</Text>
              </View>
            )}

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={styles.date}>
                Created: {formatDate(item.createdAt)}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Owner;


const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#faf5ff",
  },
  headerBanner: {
    backgroundColor: "#8b5cf6",
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
    shadowColor: "#8b5cf6",
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
    backgroundColor: "#faf5ff",
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
    backgroundColor: "#f3e8ff",
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

  badgePurple: {
    backgroundColor: "#ede9fe",
  },

  badgeGreen: {
    backgroundColor: "#dcfce7",
  },

  badgeOrange: {
    backgroundColor: "#fed7aa",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },

  notesSection: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f9fafb",
    borderLeftWidth: 3,
    borderLeftColor: "#8b5cf6",
  },

  notesLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8b5cf6",
    marginBottom: 4,
  },

  notesText: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 18,
  },

  footer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f3f4f6",
  },

  date: {
    fontSize: 11,
    color: "#9ca3af",
  },
});
