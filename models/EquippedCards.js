var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var EquippedSchema = new Schema({
  // `name` is of type String
  name: {
    type: String,
    required: true
  },
  //`image` is of type String
  image: {
    type: String,
    required: true
  },
  //attack
  attack: {
    type: Number,
    required: true
  },
  //defense
  defense: {
    type: Number,
    required: true
  },
  //HP
  hitPoints: {
    type: Number,
    required: true
  },
  //rarity
  rarity: {
    type: Number,
    required: true
  },

});

// This creates our model from the above schema, using mongoose's model method
var EquippedCards = mongoose.model("EquippedCards", EquippedSchema);

// Export the Note model
module.exports = EquippedCards;
