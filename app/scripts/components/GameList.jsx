'use strict'

var GameItem      = require('./GameItem');
var EditItem      = require('./EditItemForm');
var SelectedModal = require('./Modal');
const {
  Grid,
  Row,
  Button,
  ModalTrigger
} = require('react-bootstrap');

module.exports = React.createClass({
  displayName: 'GameList',

  getInitialState() {
    return {
      selectedGame: ''
    };
  },

  render() {
    var gameAction = game => {
      if (game.isEditing) {
        return <EditItem key={game.id} game={game} onUpdate={this.props.onUpdate} />;
      } else {
        return <GameItem key={game.id} game={game} user={this.props.user} onEdit={() => this.props.onEdit(game)} onDestroy={() => this.props.onDestroy(game)} />;
      }
		};

    return (
      <section className="players">
        <Grid>
          <div className="email-wrapper">
            <h3 className="pull-left">Greulich's Games</h3>
            <h4 className="pull-right">Total: {this.props.games.length}</h4>
            <div className="clearfix"></div>
          </div>
          <Row>
            <ModalTrigger modal={<SelectedModal game={this.state.selectedGame} />}>
              <Button className="pull-right btn-default" type="button" onClick={() => this.choose()}>Choose a game</Button>
            </ModalTrigger>
          </Row>
          <Row className="table-wrapper">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="table-name">Game <span className="pull-right"><a href="#" onClick={this.props.onAsecSort}><span className="glyphicon glyphicon-chevron-up"></span></a><a href="#" onClick={this.props.onDescSort}><span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></a></span></th>
                  <th className="table-position">Players</th>
                  <th className="table-points">Co-op</th>
                  <th className="table-points">Type</th>
                </tr>
              </thead>
              <tbody>
                {this.props.games.map(gameAction)}
              </tbody>
            </table>
          </Row>
        </Grid>
      </section>
    );
	},

  choose() {
    var games = this.props.games.filter(element => {
      return element.expansion === 'Base';
    });

    var key = Math.floor(Math.random() * games.length);

    this.setState({
      selectedGame: games[key]
    });
  }
});
