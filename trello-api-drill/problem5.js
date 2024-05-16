// Create a function getAllCards which takes a boardId as argument and which uses getCards function to fetch cards of all the lists. Do note that the cards should be fetched simultaneously from all the lists.
const getCards = require("./problem4");

function getAllCards(boardId, apiKey, tokenKey) {
  if (
    typeof boardId !== "string" &&
    typeof apiKey !== "string" &&
    typeof tokenKey !== "string"
  ) {
    throw new Error("Board Id, API key, and token must be strings");
  }
  return fetch(
    `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${tokenKey}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch Board Id");
      }
      return response.json();
    })
    .then((cards) => {
      const fetchingCards = cards.map((list) => {
        return getCards(list.id, apiKey, tokenKey);
      });
      return Promise.all(fetchingCards)
        .then((allcards) => {
          const cards = allcards.reduce((acc, card) => {
            return acc.concat(card);
          }, []);
          console.log("Fetched Cards data successfully.");
          return cards;
        })
        .catch((error) => {
          console.error("Error fetched cards data:", error);
        });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
module.exports = getAllCards;
