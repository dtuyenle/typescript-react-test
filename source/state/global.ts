import { GamesState } from './games';

export interface GlobalState {
  games: GamesState;
}

export interface GlobalStateGetter { 
  (): GlobalState;
}
