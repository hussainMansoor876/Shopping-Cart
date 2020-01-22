import * as firebase from 'firebase';
import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://rn-complete-guide-5ea60.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = (productId, folderId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    var ref = firebase.storage().ref().child(`images/${folderId}/`);
    ref.listAll().then(function (res) {
      res.items.forEach(function (itemRef) {
        const fileNm = itemRef.name;
        var actualFile = firebase.storage().ref().child(`images/${folderId}/` + fileNm);
        actualFile.delete().then(function() {
          console.log(fileNm + 'deleted');  
        }).catch(function(error) {     console.log(error);   });
      });


    }).catch(function (error) {
      console.log(error); 
    });
    

    const response = await fetch(
      `https://rn-complete-guide-5ea60.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

const uploadFirebase = async (folderId, image) => {

  const response = await fetch(image);
      const blob = await response.blob();
      let newId = makeid(15);
      var ref = firebase.storage().ref().child(`images/${folderId}/` + newId); 
        return ref.put(blob);
      
}

export function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}



export const createProduct = (title, description, price, image1, image2, image3) => {
  return async (dispatch, getState) => {
    const folderId = makeid(15);
    console.log("saving to db");

      const image1response = await uploadFirebase(folderId, image1);
      const image2response = await uploadFirebase(folderId, image2);
      const image3response = await uploadFirebase(folderId, image3);
   
    
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const response = await fetch(
      `https://rn-complete-guide-5ea60.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl: folderId,
          price,
          ownerId: userId
        })
      }
    );
    
    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl: folderId,
        price,
        ownerId: userId
      }
    });
  };
};

export const updateProduct = (id, title, description, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-complete-guide-5ea60.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          price
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        price
      }
    });
  };
};
