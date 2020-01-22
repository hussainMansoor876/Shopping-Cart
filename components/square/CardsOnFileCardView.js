import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';

CardsOnFileCardView.propTypes = {
  cardOnFile: PropTypes.object.isRequired,
  onSelectCardOnFile: PropTypes.func.isRequired,
};

function showConfirmation(cardOnFile, onConfirm) {
  Alert.alert('Confirm',
    `Purchase a cookie for $1 using your ${cardOnFile.card_brand} ${cardOnFile.last_4} card`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Purchase',
        onPress: onConfirm,
      },
    ]);
}

export default function CardsOnFileCardView({ cardOnFile, onSelectCardOnFile }) {
  return (
    <>
      <View style={styles.titleColumn}>
        <Text style={styles.titleText}>💳</Text>
      </View>
      <View style={styles.descriptionColumn}>
        <Text style={styles.cardInfo}>
          {cardOnFile.card_brand}
          {cardOnFile.last_4}
        </Text>
        <Text style={styles.muted}>
          expires
          {cardOnFile.exp_month}
          /
          {cardOnFile.exp_year}
        </Text>
      </View>
      <View style={styles.buttonColumn}>
        <TouchableOpacity
          onPress={() => showConfirmation(cardOnFile, onSelectCardOnFile)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#24988D',
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: 30,
  },
  buttonColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  cardInfo: {
    color: '#0a0a0a',
  },
  descriptionColumn: {
    flex: 2,
    flexDirection: 'column',
  },
  muted: {
    color: '#7B7B7B',
  },
  titleColumn: {
    flex: 0,
    flexDirection: 'column',
  },
  titleText: {
    color: '#24988D',
    fontSize: 16,
    marginRight: '5%',
  },
});
