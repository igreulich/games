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
			title: '',
			players: '',
			coop: '',
			link:''
    };
  },

  handleSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.state);

		this.setState({
			title: '',
			players: '',
			coop: '',
			link: '',
		});
  },

  onTitleChange(e) {
    this.setState({title: e.target.value})
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
			<section className="content">
				<Grid>
					<form onSubmit={this.handleSubmit}>
						<Input label="New Game" wrapperClassName="wrapper">
							<Row>
								<Col xs={4}>
									<Input ref='gameTitle' placeholder='Enter game' type='text' onChange={this.onTitleChange} value={this.state.title} />
								</Col>
								<Col xs={4}>
									<Input ref='gamePLayers' placeholder='Enter no. players' type='text' onChange={this.onPlayersChange} value={this.state.players} />
								</Col>
								<Col xs={4}>
									<Input ref='gameCoop' placeholder='Enter co-op' type='text' onChange={this.onCoopChange} value={this.state.coop} />
								</Col>
							</Row>
							<Row>
								<Col xs={6} xsPush={3}>
									<Input ref='gameLink' placeholder='Enter link' type='text' onChange={this.onLinkChange} value={this.state.link} />
								</Col>
							</Row>
						</Input>
						<Button className="pull-right btn-link" type="submit">Save</Button>
					</form>
				</Grid>
			</section>
    );
  }
});
