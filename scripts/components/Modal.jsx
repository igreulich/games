'use strict';

const {
  Modal,
  Button
} = require('react-bootstrap');

module.exports = React.createClass({
  displayName: 'SelectedGameModal',

  render() {
    return (
      <Modal {...this.props} title="Play This One">
        <div className="modal-body">
          <h4>{this.props.game.name}</h4>
          <p>A game for {this.props.game.players} players.</p>
        </div>
        <div className="modal-footer">
          <Button onClick={this.props.onRequestHide}>Close</Button>
        </div>
      </Modal>
    );
  }
});
