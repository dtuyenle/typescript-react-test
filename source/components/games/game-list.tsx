import * as React from 'react';
import logo from './logo.svg';
import { GamesState } from 'ventura/state/games';
import { Game } from 'ventura/models/game';
import Spinner from 'ventura/components/base/spinner/spinner';
import Modal from 'ventura/components/base/modal/modal';
import InputText from 'ventura/components/base/inputtext/inputtext';

export interface PublicProps {
  // Define any props taken by List itself.
  open: boolean,
  title: string | JSX.Element
  data: string | JSX.Element,
  searchValue: string
}

export interface ReduxStateProps {
  // Define any props mapped from redux state here.
  data: GamesState,
}

export interface ReduxDispatchProps {
  // Define any props used to dispatch redux actions here.
  fetchGames: () => void,
}

type Props = PublicProps & ReduxStateProps & ReduxDispatchProps;

export class GameList extends React.Component<Props, PublicProps> {
  interval: number;

  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      data: '',
      searchValue: ''
    }
  }

  public componentDidMount() {
    this.props.fetchGames();
    this.interval = setInterval(() => {
      this.resetState();
      this.props.fetchGames();
    }, 30000);
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  private resetState() {
    this.setState({
      open: false,
      title: '',
      data: '',
      searchValue: ''
    });
  }

  private checkLoaded() {
    const {data} = this.props;
    return !data.loading && data.loaded && !data.error && data.games.length > 0;
  }

  private checkLoading() {
    const {data} = this.props;
    return data.loading;
  }

  private getDetail(game: Game) {
    return (<div className="game-detail__container">
      <div><strong>Slug:</strong> {game.Slug}</div>
      {game.GameFiles.length > 0 &&
      <div>
        <strong>File Names:</strong>
        {game.GameFiles.map((file: any) => <p>{file.FileName}</p>)}
      </div>}
      {game.CategorySections.length > 0 &&
      <div>
        <strong>Category Section:</strong>
        {game.CategorySections.map((section: any) => <p>{section.Name}</p>)}
      </div>}
    </div>);
  }

  private openModal(item: Game) {
    this.setState({
      open: true,
      title: item.Name,
      data: this.getDetail(item)
    });
  }

  private closeModal() {
    this.setState({
      open: false,
      title: '',
      data: ''
    });
  }

  private getGameList() {
    const {data} = this.props;
    const searchValue = this.state.searchValue.toLowerCase().trim();
    return (<div className="game-list__container">
      {data.games
      .filter((game: Game) => {
        return searchValue === '' ? true : game.Name.toLowerCase().includes(searchValue);
      })
      .map((game: Game, index: number) =>
        <div key={index} className="game-list__item" onClick={this.openModal.bind(this, game)}>
          <div><img src={game.Icon}/></div>
          <div>
            <h4>{game.Name}</h4>
            {game.SupportsAddons && <p>Add-on Supported</p>}
            {game.SupportsVoice && <p>Voice Supported</p>}
          </div>
        </div>
      )}
    </div>);
  }

  private handleSearch(value: string) {
    this.setState({ searchValue: value });
  }

  public render() {
    const loaded = this.checkLoaded();
    const loading = this.checkLoading();

    return (
      <div className="game-list__root">
        <figure>
          <img src={logo} />
        </figure>
        <h1>Twitch React Test</h1>
        <p>This is the GameList component, located in <code>~/source/components/games/game-list.tsx</code></p>
        <p>Start your implementation here.</p>

        <Spinner loading={loading} />

        <Modal
          open={this.state.open}
          title={this.state.title}
          data={this.state.data}
          onClose={this.closeModal.bind(this)} />
        {loaded && <InputText placeholder="Search" onChange={this.handleSearch.bind(this)} />}
        {loaded && this.getGameList()}
      </div>
    );
  }
} 
