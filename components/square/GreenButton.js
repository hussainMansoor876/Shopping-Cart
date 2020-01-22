import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

GreenButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default function GreenButton({ onPress, text }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#24988D',
    borderRadius: 32,
    justifyContent: 'center',
    minHeight: 50,
    width: '40%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
