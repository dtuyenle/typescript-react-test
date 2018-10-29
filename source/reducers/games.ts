import {
  FETCH_GAMES_FAILED, FETCH_GAMES_STARTED, FETCH_GAMES_SUCCEEDED,
  FetchGamesFailed, FetchGamesStarted, FetchGamesSucceeded,
} from 'ventura/actions/games';
import { GamesState } from 'ventura/state/games';
import { config } from 'ventura/globals'
import { Game } from 'ventura/models/game';

type Actions = FetchGamesStarted | FetchGamesSucceeded | FetchGamesFailed;

const initialState: GamesState = {
  games: [],
  loaded: false,
  loading: false,
  error: false
};

const sortOrder = (data: Array<Game>) => {
  return data.sort((obj1: Game, obj2: Game) => {
    if (obj1.Order < obj2.Order) {
      return -1;
    }
    if (obj1.Order > obj2.Order) {
      return 1;
    }
    return 0;
  });
};

const parseData = (data: Array<Game>) => data.map(item => {
  return {
    ...item,
    Icon: config.gameIconURLTemplate(item.ID)
  };
});

export function gamesReducer(state: GamesState = initialState, action: Actions) {
  switch (action.type) {
    case FETCH_GAMES_STARTED:
      // Handle action
      return {
        ...state,
        games: [],
        error: false,
        loading: true,
        loaded: false
      }
    case FETCH_GAMES_FAILED:
      // Handle action
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.error
      };
    case FETCH_GAMES_SUCCEEDED:
      // Handle action
      return {
        ...state,
        error: false,
        loading: false,
        loaded: true,
        games: sortOrder(parseData(action.data))
      };
    default:
      return {
        ...state
      };
  }

  return state;
}
