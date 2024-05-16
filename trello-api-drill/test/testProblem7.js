const deleteAllCreatedLists = require("../problem7");

const listIds = [
  "6642fd0c02fd86640ca8361a",
  "6642fd0c02fd86640ca8361b",
  "6642fd0c02fd86640ca8361c",
  
];
const apiKey = "37dbfcb655224eb2514439132f10fd5c";
const tokenKey = "ATTA4183f17e730eb7677ea2e4f84ba8e27cb37593fb7891394c05cfcb7d8699c3dfA34D33F5  ";
deleteAllCreatedLists(listIds, apiKey, tokenKey)
  .then((data) => {
    console.log("Deleted Lists Ids data", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
