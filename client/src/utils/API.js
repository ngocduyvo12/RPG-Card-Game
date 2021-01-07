import axios from "axios";

export default {
  // Gets all users. 
  //Not currently using
  // getUser: () => axios.get("/api/user"),
  // Gets the user with the given id
  getUserId: (id) => axios.get("/api/user/" + id),

  getUser: (userData) => axios.post("/api/user/login", userData),
  // Deletes the user with the given id. 
  //Not currently using
  deleteUser: (id) => axios.delete("/api/user/" + id),
  // Saves a user to the database
  saveUser: (userData) => axios.post("/api/user", userData),
  //get equippedCards from user id in url
  getAllCards: (id) => axios.get("/api/user/getAllCards/" + id),
  //get inventory cards from user id in url
  getInventoryCards: (id) => axios.get("/api/user/getInventoryCards/" + id),
  //add new card to equippedCards if there are slot available
  updateEquippedCard: (data) => axios.post("/api/user/updateEquippedCard", data),
  //un-equip a card and add to inventory
  unEquipCard: (data) => axios.post("/api/user/unEquipCard", data),
  //discard a card from inventory when discard is toggled:
  discardCard: (data) => axios.post("/api/user/discardCard", data),

  addInventory: (card, userid, exp) => axios.post("/api/user/add-inventory", {card: card, userid: userid, exp: exp}),

  removeInventory: (card, userid, exp) => axios.post("/api/user/remove-inventory", {card: card, userid: userid, exp: exp}),

  initCards: (data) => axios.get("/api/user/initcards/" + data)
};

