// import mongoose
const mongoose = require("mongoose");

// create schema
let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    credentials: {
        twitter: {
            accessToken: {
                type: String
            },
            accessTokenSecret: {
                type: String
            },
			screen_name: {
				type: String
			}
        },

        linkedin: {
            accessToken: {
                type: String
            },
            accessTokenSecret: {
                type: String
            }
        },
        facebook: {
            accessToken: {
                type: String
            },
            accessTokenSecret: {
                type: String
            }
        },

        instagram: {
            accessToken: {
                type: String
            },
            accessTokenSecret: {
                type: String
            }
        },

        googleplus: {
            accessToken: {
                type: String
            },
            accessTokenSecret: {
                type: String
            }
        },

        pinterest: {
            accessToken: {
                type: String
            },
            accessTokenSecret: {
                type: String
            }
        },

        tumblr: {
            accessToken: {
                type: String
            },
            accessTokenSecret: {
                type: String
            }
        }
    },

    temp: {
        token: {
            type: String
        },
        secret: {
            type: String
        },
		linkedInState: {
			type: String
		}
    },

    userCreated: {
        type: Date,
        default: Date.now
    }
});

// compile schema into model
let user = mongoose.model("User", userSchema);

module.exports = user;
