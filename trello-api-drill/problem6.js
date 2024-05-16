// Create a new board, create 3 lists simultaneously, and a card in each list simultaneously

function createNewBoard(boardName, apiKey, tokenKey) {
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
      console.error("Error creating new board", error);
    });
}

function createLists(boardId, listNames, apiKey, tokenKey) {
  if (
    typeof boardId !== "string" &&
    !Array.isArray(listNames) &&
    typeof apiKey !== "string" &&
    typeof tokenKey !== "string"
  ) {
    throw new Error(
      "Board ID must be a string, list names must be an array, and API key/token must be strings"
    );
  }

  const listRequests = listNames.map((listName) => {
    const bodyData = JSON.stringify({
      name: listName,
      idBoard: boardId,
    });
    return fetch(
      `https://api.trello.com/1/lists?key=${apiKey}&token=${tokenKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData,
      }
    );
  });
  console.log("Creating lists...");
  return Promise.all(listRequests)
    .then((data) => {
      const createLists = data.map((response) => {
        if (!response.ok) {
          throw new Error("Failed to create list");
        }
        return response.json();
      });
      console.log("Lists created successfully.");
      return Promise.all(createLists);
    })
    .catch((error) => {
      console.error("Error creating lists:", error);
    });
}

function createCard(listId, cardName, apiKey, tokenKey) {
  if (
    typeof listId !== "string" &&
    typeof cardName !== "string" &&
    typeof apiKey !== "string" &&
    typeof tokenKey !== "string"
  ) {
     throw new Error("List ID, card name, API key, and token must be strings");
  }

  const bodyData = JSON.stringify({
    name: cardName,
    idList: listId,
  });

  return fetch(
    `https://api.trello.com/1/cards?key=${apiKey}&token=${tokenKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create card");
    }
    return response.json();
  }).catch((error) => {
    console.error("Error creating card:", error);
  });
}

function problem6() {
  const boardName = "CLI Commands";
  const listNames = ["To Do", "In Progress", "Done"];
  const apiKey = "37dbfcb655224eb2514439132f10fd5c";
  const tokenKey =
    "ATTA4183f17e730eb7677ea2e4f84ba8e27cb37593fb7891394c05cfcb7d8699c3dfA34D33F5  ";
   

  createNewBoard(boardName, apiKey, tokenKey)
    .then((newBoard) => {
      console.log("Created new board data:", newBoard);
      return createLists(newBoard.id, listNames, apiKey, tokenKey);
    })
    .then((createdLists) => {
      console.log("Created lists:", createdLists);
      const cardPromises = createdLists.map((list) =>
        createCard(list.id, "Sample Card", apiKey, tokenKey)
      );
      return Promise.all(cardPromises);
    })
    .then((createdCards) => {
      console.log("Created cards:", createdCards);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
module.exports = problem6;
