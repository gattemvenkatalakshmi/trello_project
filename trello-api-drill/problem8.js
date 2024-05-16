// Delete all the lists created in Step 6 sequentially i.e. List 1 should be deleted -> then List 2 should be deleted etc.

function deleteList(listIds, apiKey, tokenKey) {
  if (
    !Array.isArray(listIds) &&
    typeof apiKey !== "string" &&
    typeof tokenKey !== "string"
  ) {
    throw new Error(
      "List names must be an array, and API key/token must be strings"
    );
  }
  return fetch(
    `https://api.trello.com/1/lists/${listIds}/closed?key=${apiKey}&token=${tokenKey}&value=true`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete list with ID ${listIds}`);
      }
      console.log(`List with ID ${listIds} deleted successfully`);
      return response.json();
    })
    .catch((err) => {
      console.error(err);
      console.error("Error deleting lists2");
    });
}
function deleteListsSequentially(listIds, apiKey, tokenKey) {
  return listIds.reduce((promise, listId) => {
    return promise.then(() => {
      return deleteList(listId, apiKey, tokenKey);
    });
  }, Promise.resolve());
}
module.exports = deleteListsSequentially;
