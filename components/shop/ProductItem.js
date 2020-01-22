import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import * as firebase from 'firebase';
import ImageView from 'react-native-image-view';

import Card from '../UI/Card';
import Colors from '../../constants/Colors';

const ProductItem = props => {
  const [image1Visible, setImage1Visible] = useState(false);
  const [image2Visible, setImage2Visible] = useState(false);
  const [image3Visible, setImage3Visible] = useState(false);
  const [newUrl, setNewUrl] = useState();
  const [newUrl2, setNewUrl2] = useState();
  const [newUrl3, setNewUrl3] = useState();

  let TouchableCmp = TouchableOpacity;

  const imageOne = [{ source: { uri: newUrl } }];
  const imageTwo = [{ source: { uri: newUrl2 } }];
  const imageThree = [{ source: { uri: newUrl3 } }];


  const getImageUrl = useCallback((folderPath) => {
    let imageCount = 0;
    var ref = firebase.storage().ref().child(`images/${folderPath}/`);
    ref.listAll().then(function (res) {
      res.items.forEach(function (itemRef) {
        const fileNm = itemRef.name;
        var actualFile = firebase.storage().ref().child(`images/${folderPath}/` + fileNm);
        actualFile.getDownloadURL()
          .then(
            url => {
              if (url !== null) {
                if (newUrl == null) {
                  setNewUrl(url);
                }
                else if ((newUrl2 == null) && (newUrl !== url)) {
                  setNewUrl2(url);
                }
                else if ((newUrl3 == null) && ((newUrl !== url) && (newUrl2 !== url)) && imageCount === 3) {
                  setNewUrl3(url);
                }
                // if (newUrl == null && ((newUrl2 == null || newUrl2 !== url) && (newUrl3 == null || newUrl3 !== url))) {
                //   setNewUrl(url);
                // }
                // else if (newUrl2 == null && ((newUrl == null || newUrl !== url) && (newUrl3 == null || newUrl3 !== url)) && imageCount == 2) {
                //   //    console.log('here2');
                //   setNewUrl2(url);
                // }
                // else if (newUrl3 == null && ((newUrl == null || newUrl !== url) && (newUrl2 == null || newUrl2 !== url))) {
                //      console.log('here2');
                //   setNewUrl3(url);
                // }
              }
            }
          )
        imageCount++;
      });
    }).catch(function (error) {
      console.log(error);
    });
  });

  const clickOnImageOne = () => {
    setImage1Visible(true);
  };
  const clickOnImageTwo = () => {
    setImage2Visible(true);
  };
  const clickOnImageThree = () => {
    setImage3Visible(true);
  };


  useEffect(() => {
    if (props.image.length === 15) {
      getImageUrl(props.image);
    }
  }, [getImageUrl,]);

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={!props.title ? styles.productView : styles.product}>
      <View style={styles.touchable}>
        <View >
          <View>
            <View style={!props.title ? styles.imageContainerView : styles.imageContainer}>
              <ScrollView horizontal={true} style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => clickOnImageOne()}>
                  <View style={{ width: 300, height: '100%' }}>
                    <Image style={styles.image} source={{ uri: props.image.length === 15 ? newUrl : props.image }} />
                  </View>
                </TouchableOpacity>
                <View style={{ width: 10, height: '100%' }}>
                </View>
                {!newUrl2 ? null : (
                  <TouchableOpacity onPress={() => clickOnImageTwo()}>
                    <View style={{ width: 300, height: '100%' }}>
                      <Image style={styles.image} source={{ uri: props.image.length === 15 ? newUrl2 : props.image }} />
                    </View></TouchableOpacity>
                )}
                <View style={{ width: 10, height: '100%' }}>
                </View>
                {!newUrl3 ? null : (
                  <TouchableOpacity onPress={() => clickOnImageThree()}>
                    <View style={{ width: 300, height: '100%' }}>
                      <Image style={styles.image} source={{ uri: props.image.length === 15 ? newUrl3 : props.image }} />
                    </View></TouchableOpacity>
                )}

                <ImageView
                  images={imageOne}
                  imageIndex={0}
                  isVisible={image1Visible}
                  onClose={() => { setImage1Visible(false) }}
                />
                <ImageView
                  images={imageTwo}
                  imageIndex={0}
                  isVisible={image2Visible}
                  onClose={() => { setImage2Visible(false) }}
                />
                <ImageView
                  images={imageThree}
                  imageIndex={0}
                  isVisible={image3Visible}
                  onClose={() => { setImage3Visible(false) }}
                />
              </ScrollView>
            </View>
            <TouchableCmp style={styles.details} onPress={props.onSelect} useForeground>
              <View>
                <Text style={styles.price}>${props.price}</Text>
                <Text style={styles.title}>{!props.title ? props.descr : props.title}</Text>
              </View>
            </TouchableCmp>
            <View style={styles.actions}>
              {props.children}
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  productView: {
    height: 460,
    margin: 20
  },
  product: {
    height: 300,
    margin: 20
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  imageContainerView: {
    width: '100%',
    height: '64%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
    , borderRadius: 20,
    borderColor: Colors.primary
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20
  }
});

export default ProductItem;
