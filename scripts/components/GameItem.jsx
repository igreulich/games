'use strict'

module.exports = React.createClass({
  displayName: 'GameItem',

	render() {
    var spanStyles = {
      display: this.props.user ? '' : 'none'
    };

    return (
      <tr>
        <td><a href={this.props.game.link} target="_blank">{this.props.game.name}</a> <span className="pull-right" style={spanStyles}><a href='#' onClick={this.edit}>edit</a> | <a href='#' onClick={this.destroy}>delete</a></span></td>
        <td>{this.props.game.players}</td>
        <td>{this.props.game.coop}</td>
        <td>{this.props.game.expansion}</td>
      </tr>
    );
  },

  edit(event) {
    event.preventDefault();

    this.props.onEdit();
  },

  destroy(event) {
    event.preventDefault();

    this.props.onDestroy();
	}
});
