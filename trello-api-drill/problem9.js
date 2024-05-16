// Update all checkitems in a checklist to completed status simultaneously.
const getAllCards = require("./problem5.js");

function getCheckItems(checkListId, apiKey, tokenKey) {
  return fetch(
    `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${apiKey}&token=${tokenKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch check items");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched check items successfully");
      return data;
    })
    .catch((error) => {
      console.error("Error fetching check items", error);
    });
}

function updateCheckItem(cardId, checkItemId, apiKey, tokenKey) {
  return fetch(
    `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?state=complete&key=${apiKey}&token=${tokenKey}`,
    {
      method: "PUT",
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to update check item ${checkItemId}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Updated check items successfully");
      return data;
    })
    .catch((error) => {
      console.error("Error updating check items", error);
    });
}

function problem9(apiKey, tokenKey) {
  let cardChecklists = {};

  return getAllCards("6642fd0c02fd86640ca83613", apiKey, tokenKey)
    .then((cardsData) => {
      const flatCards = cardsData.flat();
      const newArray = flatCards.reduce((acc, card) => {
        if (card.idChecklists) {
          cardChecklists[card.id] = card.idChecklists;
          card.idChecklists.forEach((listId) => {
            acc.push(getCheckItems(listId, apiKey, tokenKey));
          });
        }
        return acc;
      }, []);
      return Promise.all(newArray);
    })
    .then((checkItems) => {
      const flatCheckItems = checkItems.flat();
      const newArray = flatCheckItems.map((checkItem) => {
        if (checkItem.idChecklist) {
          const cardId = Object.keys(cardChecklists).find((id) =>
            cardChecklists[id].includes(checkItem.idChecklist)
          );
          if (cardId) {
            return updateCheckItem(cardId, checkItem.id, apiKey, tokenKey);
          }
        }
        return Promise.resolve();
      });
      return Promise.all(newArray);
    })
    .then(() => {
      console.log("All check items updated successfully");
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}
module.exports = problem9;
