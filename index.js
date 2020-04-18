const { CoinbasePro } = require('coinbase-pro-node');

const auth = {
    apiKey: '',
    apiSecret: '',
    passphrase: '',
    useSandbox: true
};

const client = new CoinbasePro(auth);