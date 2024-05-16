// Create a function createBoard which takes the boardName as argument and returns a promise which resolves with newly created board data

function createBoard(boardName, apiKey, tokenKey) {
  if (
    typeof boardName !== "string" &&
    typeof apiKey !== "string" &&
    typeof tokenKey !== "string"
  ) {
    throw new Error("Board name, API key, and token must be strings");
  }
  const bodyData = JSON.stringify({
    name: boardName,
  });
  return fetch(
    `https://api.trello.com/1/boards?key=${apiKey}&token=${tokenKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create new board");
      }
      return response.json();
    })
    .then((createdBoard) => {
      console.log("Created new board successfully");
      return createdBoard;
    })
    .catch((error) => {
      console.error("Error creating a new board:", error);
    });
}
module.exports = createBoard;
