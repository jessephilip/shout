let base64 = require("base-64");

module.exports = {

    // this function will create a 32 character random string for oauth_nonce
    createNonce: () => {

        this.convertNumber = function(num) {
            switch (num) {
                case 0:
                    return 0;
                case 1:
                    return 1;
                case 2:
                    return 2;
                case 3:
                    return 3;
                case 4:
                    return 4;
                case 5:
                    return 5;
                case 6:
                    return 6;
                case 7:
                    return 7;
                case 8:
                    return 8;
                case 9:
                    return 9;
                case 10:
                    return "a";
                case 11:
                    return "b"
                case 12:
                    return "c";
                case 13:
                    return "d";
                case 14:
                    return "e";
                case 15:
                    return "f";
                case 16:
                    return "g";
                case 17:
                    return "h";
                case 18:
                    return "i";
                case 19:
                    return "j"
                case 20:
                    return "k";
                case 21:
                    return "l";
                case 22:
                    return "m";
                case 23:
                    return "n";
                case 24:
                    return "o";
                case 25:
                    return "p";
                case 26:
                    return "q";
                case 27:
                    return "r"
                case 28:
                    return "s";
                case 29:
                    return "t";
                case 30:
                    return "u";
                case 31:
                    return "v";
                case 32:
                    return "w";
                case 33:
                    return "x";
                case 34:
                    return "y";
                case 35:
                    return "z"
                case 36:
                    return "A";
                case 37:
                    return "B";
                case 38:
                    return "C";
                case 39:
                    return "D";
                case 40:
                    return "E";
                case 41:
                    return "F";
                case 42:
                    return "G";
                case 43:
                    return "H"
                case 44:
                    return "I";
                case 45:
                    return "J";
                case 46:
                    return "K";
                case 47:
                    return "L";
                case 48:
                    return "M";
                case 49:
                    return "N";
                case 50:
                    return "O";
                case 51:
                    return "P"
                case 52:
                    return "Q";
                case 53:
                    return "R";
                case 54:
                    return "S";
                case 55:
                    return "T";
                case 56:
                    return "U";
                case 57:
                    return "V";
                case 58:
                    return "W";
                case 59:
                    return "X"
                case 60:
                    return "Y";
                case 61:
                    return "Z";
                default:
                    return false;
            }
        }

        // empty array to hold characters
        let array = [];

        // for loop to generate 32 characters
        for (var i = 0; i < 32; i++) {
            let num = Math.floor(Math.random() * 61);
            array.push(convertNumber(num));
        }

        // turn array into string
        array = array.join("");

        // encode the string to base-64
        let nonce = base64.encode(array);

        // view the final string
        // console.log(nonce);

        // return the string for use
        return nonce;
    },

    createSignature: (twitterMsg) => {

        let authObject = {

            //parameters needed
            // 1. the twitter message

            msg: "",

            // include_entities = true
            include_entities: true,

            // oauth consumer key
            oauth_consumer_key: "",

            // oauth nonce generated number
            oauth_nonce: this.createNonce(),

            // oauth signature method
            oauth_signature_method: "HMAC-SHA1",

            // timestamp
            oauth_timestamp: date.now() / 1000 | 0,

            // oauth token
            oauth_token: "",

            // version = 1.0
            oauth_version: "1.0"
        };
    }
}
