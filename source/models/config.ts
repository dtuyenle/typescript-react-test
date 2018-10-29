export class Config {
  readonly gamesDataURL = '//localhost:8080/static/games.json';

  gameIconURLTemplate(gameID: Number) {
    return `//clientupdate-v6.cursecdn.com/GameAssets/${gameID}/Icon64.png`;
  }
}
