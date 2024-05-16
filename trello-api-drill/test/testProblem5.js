const getAllCards = require("../problem5");

const boardId = "6642fd0c02fd86640ca83613";
const apiKey = "37dbfcb655224eb2514439132f10fd5c";
const tokenKey =
  "ATTA4183f17e730eb7677ea2e4f84ba8e27cb37593fb7891394c05cfcb7d8699c3dfA34D33F5  ";
getAllCards(boardId, apiKey, tokenKey)
  .then((cards) => {
    console.log("All cards data:",cards);
  })
  .catch((error) => {
    console.error("Error:", error);
  });