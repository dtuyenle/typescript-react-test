import { Game } from 'ventura/models/game';

export interface GamesState {
  games: Array<Game>,
  loaded: boolean,
  loading: boolean,
  error?: object | boolean,
}
