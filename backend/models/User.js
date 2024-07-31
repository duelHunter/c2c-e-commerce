const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firebaseUID: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    address: {type: String, required: true},
    cart: {type: Array, default: []},
    
  },
  {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);  