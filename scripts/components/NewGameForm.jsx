'use strict';

const {
  Grid,
  Row,
  Col,
  Input,
  Button
} = require('react-bootstrap');

module.exports = React.createClass({
  displayName: 'NewGameForm',

  getInitialState() {
    return {
			coop:      '',
      link:      '',
			name:      '',
      players:   '',
      expansion: ''
    };
  },

  render() {
    const showForm = this.props.user ? true : false;
    var formStyles = {
      display: showForm ? '' : 'none'
    };

		return (
			<section style={formStyles} className="content">
				<Grid>
					<form onSubmit={this.submit}>
						<Input label="New Game" wrapperClassName="wrapper">
							<Row>
								<Col xs={3}>
									<Input type='text' ref='gameName' placeholder='Enter game' onChange={this.onNameChange} value={this.state.name} />
								</Col>
								<Col xs={3}>
									<Input type='text' ref='gamePLayers' placeholder='Enter no. players'  onChange={this.onPlayersChange} value={this.state.players} />
								</Col>
								<Col xs={3}>
									<Input type='text' ref='gameCoop' placeholder='Enter co-op' onChange={this.onCoopChange} value={this.state.coop} />
                </Col>
                <Col xs={3}>
                  <Input type='select' ref='gameExpansion' onChange={this.onExpansionChange} value={this.state.expansion}>
                    <option>Type</option>
                    <option value="Base">Base</option>
                    <option value="Expansion">Expansion</option>
                  </Input>
                </Col>
							</Row>
							<Row>
								<Col xs={6} xsPush={3}>
									<Input type='text' ref='gameLink' placeholder='Enter link'  onChange={this.onLinkChange} value={this.state.link} />
								</Col>
							</Row>
						</Input>
						<Button className="pull-right btn-link" type="submit">Save</Button>
					</form>
				</Grid>
			</section>
    );
  },

  submit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state);

		this.setState({
			coop:      '',
			link:      '',
			name:      '',
      players:   '',
      expansion: ''
		});
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

  onExpansionChange(event) {
    this.setState({expansion: event.target.value})
  },

  onLinkChange(event) {
    this.setState({link: event.target.value})
  }
});
