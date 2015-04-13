'use strict';

var Nav          = require('./Nav')
var GameList     = require('./GameList');
var NewGameForm  = require('./NewGameForm');

var GameApp = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState() {
    return {
      uid:          '',
      ref:          new Firebase('https://gogames.firebaseio.com/items/'),
      games:        [],
      query:        '',
      searchGames:  [],
      errorMessage: ''
    }
  },

  componentWillMount() {
    this.bindAsArray(this.state.ref, 'games');
    this.bindAsArray(this.state.ref, 'searchGames');
  },

  componentWillUnmount() {
    this.unbind('games');
  },

  render() {
    return (
      <div>
        <Nav user={this.state.uid} query={this.state.query} onLogin={this.login} onLogout={this.logout} onSearch={this.search} />
        <GameList user={this.state.uid} games={this.state.games} onEdit={this.edit} onUpdate={this.update} onDestroy={this.destroy} onAsecSort={this.asecSort} onDescSort={this.descSort} />
        <NewGameForm user={this.state.uid} onSubmit={this.submit} />
      </div>
    );
  },

  login() {
    var ref = this.state.ref;

    ref.authWithOAuthPopup('github', (error, authData) => {
      if (error) {
        console.log('Login Failed! ', error);
      } else {
        this.setState({
          uid: authData.uid
        });
      }
    });
  },

  logout() {
    var ref = this.state.ref;

    ref.unauth();

    this.setState({
      uid: ''
    });
  },

  search(query) {
    var games   = this.state.searchGames;
    var results = [];

    games.forEach(game => {
      if (game.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        results.push(game);
      }
    });

    this.setState({
      query: query,
      games: results
    });
  },

  edit(game) {
    var games = this.state.games;

    var editIndex = games.indexOf(game);

    games[editIndex].isEditing = true;

    this._updateItems(games);
  },

  update(game) {
    var games = this.state.games;

    var originalGame = games.filter(element => {
      return element.id === game.id;
    });

    originalGame = originalGame[0];

    var editIndex = games.indexOf(originalGame);

    game.isEditing = false;

    games[editIndex] = game;

    this._updateItems(games);
  },

  destroy(game) {
    var games = this.state.games;

    var newGames = games.filter(element => {
      return element.id !== game.id
    });

    this._updateItems(newGames);
  },

  submit(game) {
    this.state.ref.push({
      id:        Date.now(),
      name:      game.name,
      coop:      game.coop,
      link:      game.link,
      players:   game.players,
      expansion: game.expansion
    });
  },

  asecSort() {
    var games = this.state.games;

    var comparator = (a, b) => {
      var sort = 0;

      if (a.name < b.name) {
        sort = -1;
      }
      if (a.name > b.name) {
        sort = 1;
      }

      return sort
    };

    this.setState({
      games: games.sort(comparator)
    });
  },

  descSort() {
    var games = this.state.games;

    var comparator = (a, b) => {
      var sort = 0;

      if (a.name < b.name) {
        sort = 1;
      }
      if (a.name > b.name) {
        sort = -1;
      }

      return sort
    };

    this.setState({
      games: games.sort(comparator)
    });
  },

  _updateItems(games) {
    var ref   = this.state.ref;

    ref.set(games);

    this.setState({
      searchItems: games
    });
  }
});

React.render(<GameApp />, document.getElementById('app'));
