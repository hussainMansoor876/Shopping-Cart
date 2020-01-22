import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import CardsOnFileTitleView from './CardsOnFileTitleView';
import CardsOnFileCardView from './CardsOnFileCardView';
import GreenButton from './GreenButton';

CardsOnFileModal.propTypes = {
  cardsOnFile: PropTypes.array.isRequired,
  onSelectCardOnFile: PropTypes.func.isRequired,
  onCloseCardsOnFileScreen: PropTypes.func.isRequired,
  onShowCustomerCardEntry: PropTypes.func.isRequired,
};

export default function CardsOnFileModal({
  cardsOnFile,
  onCloseCardsOnFileScreen,
  onShowCustomerCardEntry,
  onSelectCardOnFile,
}) {
  return (
    <View style={styles.container}>
      <CardsOnFileTitleView onCloseCardsOnFileScreen={() => onCloseCardsOnFileScreen()} />
      <View style={styles.bodyContent}>
        {cardsOnFile.length === 0
          ? (
            <Text style={styles.noCardsText}>
              {'No cards on file found.'
              + 'Please tap the button to add a card that you can use for future transactions.'}
            </Text>
          ) : cardsOnFile.map(cardOnFile => (
            <React.Fragment key={cardOnFile.id}>
              <View style={styles.row}>
                <CardsOnFileCardView
                  cardOnFile={cardOnFile}
                  // eslint-disable-next-line react/jsx-no-bind
                  onSelectCardOnFile={onSelectCardOnFile.bind(this, cardOnFile)}
                />
              </View>
              <View style={styles.horizontalLine} />
            </React.Fragment>
          ))
        }
      </View>
      <View style={styles.buttonRow}>
        <GreenButton
          onPress={onShowCustomerCardEntry}
          text="Add card"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContent: {
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '3%',
  },
  buttonRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '6%',
    width: '100%',
  },
  container: {
    width: '100%',
  },
  horizontalLine: {
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    marginBottom: '3%',
    marginTop: '3%',
  },
  noCardsText: {
    color: '#7B7B7B',
    fontSize: 12,
    marginBottom: '3%',
    minHeight: 50,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
});
