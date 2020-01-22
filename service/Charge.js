//import { CHARGE_SERVER_URL } from '../Constants';
//import ChargeError from '../ChargeError';

export default async function chargeCardNonce(nonce, verificationToken) {
  let body;
  if (verificationToken === undefined) {
    body = JSON.stringify({
      nonce,
    });
  } else {
    body = JSON.stringify({
      nonce,
      verificationToken,
    });
  }
}
//   const response = await fetch(CHARGE_SERVER_URL, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body,
//   });

//   try {
//     const responseJson = await response.json();
//     if (responseJson.errorMessage != null) {
//       throw new ChargeError(responseJson.errorMessage);
//     }
//   } catch (error) {
//     throw new ChargeError(error.message);
//   }
// }
