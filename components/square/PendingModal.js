import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';

export default function PendingModal() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Processing...</Text>
      </View>
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" color="#24988D" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityContainer: {
    height: '10%',
    margin: '10%',
  },
  container: {
    width: '100%',
  },
  title: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '3%',
  },
});
