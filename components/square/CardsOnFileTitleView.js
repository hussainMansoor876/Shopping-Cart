import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

const closeButton = require('../images/btnClose.png');

CardsOnFileTitleView.propTypes = {
  onCloseCardsOnFileScreen: PropTypes.func.isRequired,
};

export default function CardsOnFileTitleView({ onCloseCardsOnFileScreen }) {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.closeButton}
        underlayColor="#FFFFFF"
        onPress={onCloseCardsOnFileScreen}
      >
        <Image
          style={styles.button}
          source={closeButton}
        />
      </TouchableHighlight>
      <Text style={styles.title}>My Saved Cards</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    zIndex: 1,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  title: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    zIndex: 0,
  },
});
