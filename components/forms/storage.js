const GAMES_KEY = "games";

/**
 * Returns an object filled with all games stored in LocalStorage
 *
 * @return Array
 */
export function getGamesFromLocalStorage() {
  const gameKeys = getKeys(GAMES_KEY);

  return gameKeys === null ? initGamesInLocalStorage : JSON.parse(gameKeys);
}

/**
 *
 */
function initGamesInLocalStorage() {
  setGamesInLocalStorage([]);
  return [];
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
function getKeys(key) {
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
  return getGamesFromLocalStorage().find(function (games) {
    return games.id === id;
  });
}
