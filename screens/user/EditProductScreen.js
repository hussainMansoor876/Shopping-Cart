import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as firebase from 'firebase';

import ImagePicker from '../../components/shop/ImagePicker';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    // const [newImageUrl, setNewImageUrl] = useState();
    const [selectedImage1, setSelectedImage1] = useState();
    const [selectedImage2, setSelectedImage2] = useState();
    const [selectedImage3, setSelectedImage3] = useState();
   
    const [error, setError] = useState();
    const prodId = props.navigation.getParam('productId');

    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            //imageUrl: '',
            description: editedProduct ? editedProduct.description : '',
            price: editedProduct ? editedProduct.price : ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            //imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    }
    );

    const imageTakenHandler1 = imagePath => {
        setSelectedImage1(imagePath);
    };
    const imageTakenHandler2 = imagePath => {
        setSelectedImage2(imagePath);
    };
    const imageTakenHandler3 = imagePath => {
        setSelectedImage3(imagePath);
    };

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }])
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            if (editedProduct) {
                await dispatch(
                    productsActions.updateProduct(
                        prodId,
                        formState.inputValues.title,
                        formState.inputValues.description,
                        formState.inputValues.price
                    )
                );
            } else {                
                await dispatch(
                    productsActions.createProduct(
                        formState.inputValues.title,
                        formState.inputValues.description,
                        formState.inputValues.price,
                        selectedImage1,
                        selectedImage2,
                        selectedImage3
                    )
                );
            }
            props.navigation.goBack();
        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);

    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label="Title"
                        errorText="Please enter a valid title!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                   {editedProduct ? null : (
                         <ScrollView horizontal={true} style={{ flex: 1 }}>

                         <View style={{ width: 160, height: '55%' }}>
                             <ImagePicker onImageTaken={imageTakenHandler1} />
                         </View>
                         <View style={{ width: 160, height: '55%' }}>
                             <ImagePicker onImageTaken={imageTakenHandler2} />
                         </View>
                         <View style={{ width: 160, height: '55%' }}>
                             <ImagePicker onImageTaken={imageTakenHandler3} />
                         </View>
                       
                   
                     </ScrollView>
                    )}
                    <Input
                            id='price'
                            label="Price"
                            errorText="Please enter a valid price!"
                            keyboardType="decimal-pad"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            initialValue={editedProduct ? editedProduct.price : ''}
                            initiallyValid={!!editedProduct}
                            required
                            min={0.1}
                        />

                    <Input
                        id='description'
                        label="Description"
                        errorText="Please enter a valid description!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add Product',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName={
                        Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                    }
                    onPress={submitFn}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EditProductScreen;
