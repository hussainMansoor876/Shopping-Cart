export default class ChargeError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ChargeError';
    }
  }