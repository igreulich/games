'use strict'

const{ Input } = require('react-bootstrap');

module.exports = React.createClass({
  displayName: 'EditGameForm',

  getInitialState() {
    return {
      id:      this.props.game.id,
      coop:    this.props.game.coop,
      link:    this.props.game.link,
      name:    this.props.game.name,
      players: this.props.game.players
    }
  },

  render() {
    return (
      <tr>
        <td><Input type='text' ref="gameName" value={this.state.name} onChange={this.onNameChange} /></td>
        <td><Input type='text' ref="gamePlayers" value={this.state.players} onChange={this.onPlayersChange} /></td>
        <td><Input type='text' ref="gameCoop" value={this.state.coop} onChange={this.onCoopChange} /> <span className="pull-right"><a href="#" onClick={this.update}>save</a></span></td>
      </tr>
    );
  },

  onNameChange(event) {
    this.setState({name: event.target.value})
  },

  onPlayersChange(event) {
    this.setState({players: event.target.value})
  },

  onCoopChange(event) {
    this.setState({coop: event.target.value})
  },

  onLinkChange(event) {
    this.setState({link: event.target.value})
  },

  update(event) {
    event.preventDefault();

    this.props.onUpdate(this.state);
  }
});
