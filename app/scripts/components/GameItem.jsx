'use strict'

module.exports = React.createClass({
  displayName: 'GameItem',

  getInitialState() {
    return {
      name: this.props.item.name,
      players: this.props.item.players,
      coop: this.props.item.coop,
      link: this.props.item.link
    }
  },

  deleteItem(e) {
    e.preventDefault();

    this.props.onDeleteItem();
  },

  editItem(e) {
    e.preventDefault();

    this.props.onEditItem();
  },

	render() {
    return (
      <tr>
        <td><a href={this.state.link} target="_blank">{this.state.name}</a> <span className="pull-right"><a href='#' onClick={this.editItem}>edit</a> | <a href='#' onClick={this.deleteItem}>delete</a></span></td>
        <td>{this.state.players}</td>
        <td>{this.state.coop}</td>
      </tr>
    );
	}
});
