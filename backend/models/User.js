const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firebaseUID: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    mobileNo: { type: Number, required: false },
    address: {type: String, required: false},
    cart: {type: Array, default: []},
    
  },
  {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);  