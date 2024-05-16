// Create a function getBoard which takes the boardId as arugment and returns a promise which resolves with board data

function getBoard(boardId, apiKey, tokenKey) {
  if (
    typeof boardId !== "string" ||
    typeof apiKey !== "string" ||
    typeof tokenKey !== "string"
  ) {
    throw new Error("Board Id, API key, and token must be strings");
  }

  return fetch(
    `https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${tokenKey}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch board data");
      }
      return response.json();
    })
    .then((boardData) => {
      console.log("Board data fetched successfully");
      return boardData;
    })
    .catch((error) => {
      console.error("Error fetching board data:", error);
    });
}
module.exports = getBoard;
