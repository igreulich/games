'use strict'

const {
  Grid,
  Row,
  Col
} = require('react-bootstrap');

module.exports = React.createClass({
  displayName: 'Nav',

	render() {
		var liStyles = {
			visibility: 'hidden'
		}

		return (
			<header className="header">
				<Grid>
					<Row>
						<Col md={6}>
							<div className="logo-white">
								<img src="images/logo-white.png" />
								<h3>GAMES</h3>
							</div>
						</Col>
						<Col md={6} className="nav-wrapper">
							<nav className="navbar navbar-inverse navbar-static-top" role="navigation">
								<div className="navbar-header">
									<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
										<span className="sr-only">Toggle navigation</span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
									</button>
								</div>
								<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
									<ul className="nav navbar-nav">
										<li style={liStyles}><a href="#">Profile</a></li>
										<li style={liStyles}><a href="contact.php">Sign Out</a></li>
									</ul>
									<form>
										<input type="text" name="search" placeholder="Search" />
										<input type="image" src="images/icon-search.png" alt="Submit" />
									</form>
								</div>
							</nav>
						</Col>
					</Row>
				</Grid>
			</header>
		);
	}
});
