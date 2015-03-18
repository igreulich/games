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
    var _this = this;

    var gameItem = (item) => {
      var edit = <EditItem key={item.id} item={item} onSaveEdit={_this.props.onSaveEdit} />;
      var show = <GameItem key={item.id} item={item} onDeleteItem={() => _this.props.onDelete(item)} onEditItem={() => _this.props.onEdit(item)} />;

      return item.isEditing ? edit : show;
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
                {this.props.items.map(gameItem)}
              </tbody>
            </table>
          </Row>
        </Grid>
      </section>
    );
	}
});
