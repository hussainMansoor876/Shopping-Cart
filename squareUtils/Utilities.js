import {
    Alert,
  } from 'react-native';
  
  export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
    });
  }
  
  export function printCurlCommand(nonce, appId, verificationToken) {
    // set host url based on application id
    //   production: https://connect.squareup.com
    //   sandbox: https://connect.squareupsandbox.com
    const hostUrl = appId.startsWith('sandbox') ? 'https://connect.squareupsandbox.com' : 'https://connect.squareup.com';
    const uuid = uuidv4();
    if (verificationToken === undefined) {
      console.log(`Run this curl command to charge the nonce:
            curl --request POST ${hostUrl}/v2/locations/SQUARE_LOCATION_ID/transactions \\
            --header "Content-Type: application/json" \\
            --header "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
            --header "Accept: application/json" \\
            --data '{
            "idempotency_key": "${uuid}",
            "amount_money": {
            "amount": 100,
            "currency": "USD"},
            "card_nonce": "${nonce}"
            }'`);
    } else {
      console.log(`Run this curl command to charge the nonce:
            curl --request POST ${hostUrl}/v2/payments \\
            --header "Content-Type: application/json" \\
            --header "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
            --header "Accept: application/json" \\
            --data '{
            "idempotency_key": "${uuid}",
            "amount_money": {
            "amount": 100,
            "currency": "USD"},
            "source_id": "${nonce}",
            "verification_token": "${verificationToken}"
            }'`);
    }
  }
  
  export async function showAlert(title, message, onPress = null) {
    await Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: onPress == null ? null : () => { onPress(); },
        },
      ],
      { cancelable: false },
    );
  }
  