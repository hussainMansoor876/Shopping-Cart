import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import StripeCheckout from './StripeCheckout'
import AddSubscription from './AddSubscription'

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [pay, setPay] = useState(false)
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);




  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  })
  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(cartActions.removeFromCart(itemData.item.productId));
    setIsLoading(false);
  }

  const orderNowEvent = async (cartItems, cartTotalAmount) => {
    //todo 
    console.log("hello", cartItems)
    console.log('v', cartTotalAmount)
    setPay(true)



    //if payment went through, than:
    // saveOrderToFirebase(cartItems, cartTotalAmount);
  }

  const saveOrderToFirebase = (cartTotalAmount) => {
    console.log("Added")
    setPay(false)
    setTimeout(() => {
      dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    }, 500)
  }

  const onPaymentSuccess = (token) => {
    // send the stripe token to your backend!
  }

  const onClose = () => {
    console.log("Hello", cartItems)
    // maybe navigate to other screen here?
  }


  if (pay) {
    return (
      <AddSubscription
        amount={cartTotalAmount}
        saveOrderToFirebase={saveOrderToFirebase}
      />
    )
  }
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? <ActivityIndicator size='small' color={Colors.primary} /> :
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={() => {
              orderNowEvent(cartItems, cartTotalAmount);
            }}
          />
        }

      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={sendOrderHandler}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default CartScreen;
