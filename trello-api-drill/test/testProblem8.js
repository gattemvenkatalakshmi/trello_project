const deleteListsSequentially = require("../problem8");

const listIds = [
    "66460f5d883d441adf5b4011",
    "66460f5ddcf1959aad0a6e42",
    "66460f5d6c99ce0a69fbc9f8",
  ];
const apiKey = "37dbfcb655224eb2514439132f10fd5c";
const tokenKey = "ATTA4183f17e730eb7677ea2e4f84ba8e27cb37593fb7891394c05cfcb7d8699c3dfA34D33F5  ";
deleteListsSequentially(listIds, apiKey, tokenKey)
    .then(() => {
        console.log("All lists deleted successfully");
    })
    .catch(error => {
        console.error("Error:", error);
    });