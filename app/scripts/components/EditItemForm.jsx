'use strict'

const{ Input } = require('react-bootstrap');

module.exports = React.createClass({
  displayName: 'EditGameForm',

  getInitialState() {
    return {
      id: this.props.item.id,
      name: this.props.item.name,
      players: this.props.item.players,
      coop: this.props.item.coop,
      link: this.props.item.link
    }
  },

  saveEdit(e) {
    e.preventDefault();

    this.props.onSaveEdit(this.state);
  },

  onNameChange(e) {
    this.setState({name: e.target.value})
  },

  onPlayersChange(e) {
    this.setState({players: e.target.value})
  },

  onCoopChange(e) {
    this.setState({coop: e.target.value})
  },

  onLinkChange(e) {
    this.setState({link: e.target.value})
  },

  render() {
    return (
      <tr>
        <td><Input ref="gameTitle" value={this.state.name} type='text' onChange={this.onNameChange} /></td>
        <td><Input ref="gamePlayers" value={this.state.players} type='text' onChange={this.onPlayersChange} /></td>
        <td><Input ref="gameCoop" value={this.state.coop} type='text' onChange={this.onCoopChange} /> <span className="pull-right"><a href="#" onClick={this.saveEdit}>save</a></span></td>
      </tr>
    );
  }
});
