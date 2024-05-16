// Create a function getLists which takes a boardId as argument and returns a promise which resolved with lists data

function getLists(boardId, apiKey, tokenKey) {
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
        throw new Error("failed to fetch lists data");
      }
      return response.json();
    })
    .then((fetchLists) => {
      console.log("Fetched Lists data successfully");
      return fetchLists;
    })
    .catch((error) => {
      console.error("Failed Fetched lists data:", error);
    });
}
module.exports = getLists;
