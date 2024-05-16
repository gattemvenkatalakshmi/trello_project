const createBoard = require("../problem2");

const boardName = "trello";
const apiKey = "37dbfcb655224eb2514439132f10fd5c";
const tokenKey = "ATTA4183f17e730eb7677ea2e4f84ba8e27cb37593fb7891394c05cfcb7d8699c3dfA34D33F5  ";

createBoard(boardName, apiKey, tokenKey)
  .then((newBoard) => {
    console.log("Created new board data:", newBoard);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
