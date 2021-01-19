const Fingerprint2 = require('fingerprintjs2');

export default ({ app }, inject) => {
    inject('fingerPrint2', Fingerprint2);
}