var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  // `userName` is required and have to be unique
  userName: {
    type: String,
    required: true,
    unique: true
  },
  // `password` is required and of type String
  password: {
    type: String,
    required: true
  },
  //total amount of exp gained. Can be used to calculate player's level on the back end
  // easy leveling function
    // function checkexp(){

    //     if (player.experience > 3 * player.level){
    //       player.experience=0;
    //       player.level++;
    //     }}
  exp: {
    type: Number,
    required: true
  },
  //total gold. Optional for now. To be used later for store? and upgrade?
  gold: {
      type: Number
  },
  //stage cleared. Optional for now. To be used for displaying progress to front end
  //preferably in number
  stageCleared: {
      type: Number
  },
  //Add additional user params here when we need it.

  // `equippedCards` is an object that stores a currently quipped card's id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  equippedCards: [{
    type: Schema.Types.ObjectId,
    ref: "EquippedCards"
  }],
  // `inventoryCards` is an object that stores a currently quipped card's id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  inventoryCards: [{
    type: Schema.Types.ObjectId,
    ref: "InventoryCards"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
