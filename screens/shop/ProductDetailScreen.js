import React, { useState, useCallback, useEffect  } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as firebase from 'firebase';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import ProductItem from '../../components/shop/ProductItem';

const ProductDetailScreen = props => {
  const [newUrl, setNewUrl] = useState();
  const [newUrl2, setNewUrl2] = useState();
  const productId = props.navigation.getParam('productId');
  const productTitle = props.navigation.getParam('productTitle')
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );
  const dispatch = useDispatch();




  return (
   
    <ScrollView style={styles.imageContainer}>
         <ProductItem 
          image={selectedProduct.imageUrl}
          // title={productTitle}
          price={selectedProduct.price}
          descr={selectedProduct.description}
          // onSelect={() => {
          //   selectItemHandler(itemData.item.id, itemData.item.title);
          // }}
        >
       
      </ProductItem>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
     
    </ScrollView>

  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  },
  imageContainer: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  }
});

export default ProductDetailScreen;
