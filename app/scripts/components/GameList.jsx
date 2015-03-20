'use strict'

var GameItem = require('./GameItem');
var EditItem = require('./EditItemForm');
const{
  Grid,
  Row
} = require('react-bootstrap');

module.exports = React.createClass({
  displayName: 'GameList',

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
            <h4>Greulich's Games</h4>
          </div>
          <Row className="table-wrapper">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="table-name">Game</th>
                  <th className="table-position">No. Players</th>
                  <th className="table-points">Cooperative</th>
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
	}
});