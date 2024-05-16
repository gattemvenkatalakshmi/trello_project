// Update all checkitems in a checklist to incomplete status sequentially i.e. Item 1 should be updated -> then wait for 1 second -> then Item 2 should be updated etc.
const getAllCards = require("./problem5.js");

function getCheckItems(checkListId, apiKey, tokenKey) {
    if (typeof checkListId !== "string" && typeof apiKey !== 'string' && typeof tokenKey !== 'string') {
        throw new Error("checklistId ,apiKey, and tokenKey must be string");
    }
    return fetch(`https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${apiKey}&token=${tokenKey}`)
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
            throw error;
        });
}

function updateCheckItem(cardId, checkItemId, apiKey, tokenKey) {
    if (typeof apiKey !== 'string' && typeof tokenKey !== 'string') {
        throw new Error("apiKey and tokenKey must be strings");
    }
    return fetch(`https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?state=incomplete&key=${apiKey}&token=${tokenKey}`, {
        method: "PUT",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to update check item ${checkItemId}`);
            }
            return response.json();
        })
        .then((data) => {
          setTimeout(() => {
              return data;
          }, 1000);
      })
        .catch((error) => {
            console.error("Error updating check items", error);
            throw error;
        });
}

function problem10(apiKey, tokenKey) {
    let cardChecklists = {};

    return getAllCards("6642fd0c02fd86640ca83613", apiKey, tokenKey)
        .then((data) => {
            const flatData = data.flat();
            const promiseArray = flatData.reduce((acc, card) => {
                if (card.idChecklists) {
                    cardChecklists[card.id] = card.idChecklists;
                    card.idChecklists.forEach((listId) => {
                        acc.push(getCheckItems(listId, apiKey, tokenKey));
                    });
                }
                return acc;
            }, []);
            return Promise.all(promiseArray);
        })
        .then((checkItemsData) => {
            const flatCheckItems = checkItemsData.flat();
            const promiseArray = flatCheckItems.reduce((acc, checkItem) => {
                const cardId = Object.keys(cardChecklists).find((id) =>
                    cardChecklists[id].includes(checkItem.idChecklist)
                );
                if (cardId) {
                    acc.push(() => updateCheckItem(cardId, checkItem.id, apiKey, tokenKey));
                }
                return acc;
            }, []);

            return promiseArray.reduce((previousPromise, currentPromise) => {
                return previousPromise.then(() => {
                    return currentPromise();
                });
            }, Promise.resolve());
        })
        .then(() => {
            console.log("All check items updated to incomplete status sequentially with a delay");
        })
        .catch((err) => {
            console.error("Error:", err);
            throw err;
        });
}
module.exports = problem10;

