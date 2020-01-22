import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

OrderInformationDescriptionView.propTypes = {
  description: PropTypes.string.isRequired,
};

export default function OrderInformationDescriptionView({ description }) {
  return (<Text style={styles.description}>{description}</Text>);
}

const styles = StyleSheet.create({
  description: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
