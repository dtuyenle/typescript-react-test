import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { GlobalState } from 'ventura/state/global';
import { GameList, PublicProps, ReduxDispatchProps, ReduxStateProps } from './game-list';
import {fetchGames} from 'ventura/actions/games';

function mapStateToProps(_state: GlobalState, _props: PublicProps): ReduxStateProps {
  return {
    // map props
    data: _state.games
  };
}
function mapDispatchToProps(dispatch: Dispatch<any>): ReduxDispatchProps {
  return bindActionCreators({
    // map dispatched actions
    fetchGames
  }, dispatch);
}

// tslint:disable-next-line:variable-name
export const GameListContainer = connect(mapStateToProps, mapDispatchToProps)(GameList) as React.ComponentClass<PublicProps>;
