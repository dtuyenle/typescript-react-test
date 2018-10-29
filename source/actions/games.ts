import { Dispatch } from 'redux';
import { GlobalStateGetter } from 'ventura/state/global';
import { config } from 'ventura/globals';
import { Game } from 'ventura/models/game';

// Fetch Games Started
export const FETCH_GAMES_STARTED = 'FETCH_GAMES_STARTED';
export type FetchGamesStarted = {
  type: typeof FETCH_GAMES_STARTED;
};

function fetchGamesStarted(): FetchGamesStarted {
  return { type: FETCH_GAMES_STARTED };
}

// Fetch Games Succeeded
export const FETCH_GAMES_SUCCEEDED = 'FETCH_GAMES_SUCCEEDED';
export type FetchGamesSucceeded = {
  type: typeof FETCH_GAMES_SUCCEEDED;
  data: Array<Game>
};

function fetchGamesSucceeded(result: Array<Game>): FetchGamesSucceeded {
  return { type: FETCH_GAMES_SUCCEEDED, data: result };
}

// Fetch Games Failed
export const FETCH_GAMES_FAILED = 'FETCH_GAMES_FAILED';
export type FetchGamesFailed = {
  type: typeof FETCH_GAMES_FAILED;
  error: Object
};

function fetchGamesFailed(err: Object): FetchGamesFailed {
    return { type: FETCH_GAMES_FAILED, error: err };
}

// Fetch Games Thunk
export function fetchGames() {
  const gameDataURL = config.gamesDataURL;

  return (dispatch: Dispatch<any>, _getState: GlobalStateGetter) => {
    dispatch(fetchGamesStarted());

    // Implement remainder of thunk
    return fetch(gameDataURL.replace('8080', '8081'), {
      method: 'get',
      mode: 'no-cors'
    }).then(data => {
      return data.json();
    }).then(data => {
      dispatch(fetchGamesSucceeded(data.data));
    }).catch(err => {
      dispatch(fetchGamesFailed(err));
    });
  };
}
