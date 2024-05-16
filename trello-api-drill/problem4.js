// Create a function getCards which takes a listId as argument and returns a promise which resolves with cards data

function getCards(listId, apiKey, tokenKey) {
  if (
    typeof listId !== "string" &&
    typeof apiKey !== "string" &&
    typeof tokenKey !== "string"
  ) {
    throw new Error("List Id, API key, and token must be strings");
  }
  return fetch(
    `https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${tokenKey}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch cards");
      }
      return response.json();
    })
    .then((fetchCards) => {
      console.log("Fetched Cards data successfully");
      return fetchCards;
    })
    .catch((error) => {
      console.error("Error fetched cards data:", error);
    });
}
module.exports = getCards;
