const getCards = require("../problem4");

const listId = "6642fd0c02fd86640ca8361a";
const apiKey = "37dbfcb655224eb2514439132f10fd5c";
const tokenKey = "ATTA4183f17e730eb7677ea2e4f84ba8e27cb37593fb7891394c05cfcb7d8699c3dfA34D33F5  ";
getCards(listId, apiKey, tokenKey)
  .then((cards) => {
    console.log("cards data:", listId, cards);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
