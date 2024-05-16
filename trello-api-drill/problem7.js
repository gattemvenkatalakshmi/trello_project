// // Delete all the lists created in Step 6 simultaneously
function deleteAllCreatedLists(listIds, apiKey, tokenKey) {
    if (
      !Array.isArray(listIds) ||
      typeof apiKey !== "string" ||
      typeof tokenKey !== "string"
    ) {
      throw new Error("List IDs must be an array, and API key/token must be strings");
    }
  
    const deleteRequests = listIds.map(listId => {
      return fetch(`https://api.trello.com/1/lists/${listId}/closed?key=${apiKey}&token=${tokenKey}&value=true`, {
        method: 'PUT'
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete list");
        }
        return response.json();
      });
    });
  
    return Promise.all(deleteRequests)
      .then((deleteListsIDs) => {
        console.log("Deleted all lists successfully");
        return deleteListsIDs;
      })
      .catch((error) => {
        console.error("Failed deleting all lists:", error);
        throw error;
      });
  }
  
  module.exports = deleteAllCreatedLists;
  