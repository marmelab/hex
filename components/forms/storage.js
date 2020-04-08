const GAMES_KEY = "games";

/**
 * Returns an object filled with all games stored in LocalStorage
 *
 * @return Array
 */
export function getGamesInLocalStorage() {
  const games = JSON.parse(getFromLocalStorage(GAMES_KEY));

  if (games === null) {
    setGamesInLocalStorage([]);
  }

  return games;
}

/**
 * Writes game array as JSON string into the Local Storage.
 *
 * @param {Array} games
 */
export function setGamesInLocalStorage(games) {
  return localStorage.setItem(GAMES_KEY, JSON.stringify(games));
}

/**
 * Check if the local storage is available on the browser.
 *
 * From https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available
 */
function localStorageIsSupported() {
  var test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get back value by key in the LocalStorage
 *
 * @param {string} key
 * @return string
 */
function getFromLocalStorage(key) {
  if (localStorageIsSupported()) {
    return localStorage.getItem(key);
  }

  throw "Local Storage is unavailable.";
}

/**
 * Find a game by id.
 *
 * @param {int} id
 */
export function getGameById(id) {
  return getGamesInLocalStorage().find(function (games) {
    return games.id == id;
  });
}
