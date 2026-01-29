// import React, { useState } from 'react';
// import { View, Button, ScrollView } from 'react-native';
// import OwnerForm from '../components/forms/OwnerForm';
// import CustomerForm from '../components/forms/CustomerForm';


// const HomeScreen: React.FC = () => {
//   const [showOwner, setShowOwner] = useState(false);
//   const [showCustomer, setShowCustomer] = useState(false);

//   return (
//     <ScrollView contentContainerStyle={{ padding: 16 }}>
//       <Button
//         title="Create Owner"
//         onPress={() => {
//           setShowOwner(true);
//           setShowCustomer(false);
//         }}
//       />

//       <View style={{ marginVertical: 10 }} />

//       <Button
//         title="Create Customer"
//         onPress={() => {
//           setShowCustomer(true);
//           setShowOwner(false);
//         }}
//       />

//       {showOwner && <OwnerForm />}
//       {showCustomer && <CustomerForm />}
//     </ScrollView>
//   );
// };

// export default HomeScreen;


import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Users, UserCheck } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <Text style={styles.bannerTitle}>Welcome Back!</Text>
        <Text style={styles.bannerSubtitle}>Manage your business with ease</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Owners</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Customers</Text>
        </View>
      </View>

      {/* Main Action Buttons */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      {/* Create Owner Button */}
      <TouchableOpacity
        style={[styles.actionButton, styles.ownerButton]}
        onPress={() => navigation.navigate('OwnerForm')}
        activeOpacity={0.8}
      >
        <View style={styles.buttonIconContainer}>
          <UserCheck size={28} color="#fff" strokeWidth={2.5} />
        </View>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonTitle}>Create Owner</Text>
          <Text style={styles.buttonDescription}>Add a new property owner</Text>
        </View>
      </TouchableOpacity>

      {/* Create Customer Button */}
      <TouchableOpacity
        style={[styles.actionButton, styles.customerButton]}
        onPress={() => navigation.navigate('CustomerForm')}
        activeOpacity={0.8}
      >
        <View style={styles.buttonIconContainer}>
          <Users size={28} color="#fff" strokeWidth={2.5} />
        </View>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonTitle}>Create Customer</Text>
          <Text style={styles.buttonDescription}>Register a new customer</Text>
        </View>
      </TouchableOpacity>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <Text style={styles.infoBannerText}>
          📊 Keep track of all your owners and customers in one place
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: '#f8f9fa',
  },
  headerBanner: {
    backgroundColor: '#6366f1',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 30,
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: (width - 48) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginLeft: 16,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  ownerButton: {
    backgroundColor: '#8b5cf6',
  },
  customerButton: {
    backgroundColor: '#ec4899',
  },
  buttonIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  buttonDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  infoBanner: {
    backgroundColor: '#dbeafe',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  infoBannerText: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '500',
  },
});

export default HomeScreen;
