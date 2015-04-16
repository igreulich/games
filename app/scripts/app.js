/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Nav = __webpack_require__(1);
	var GameList = __webpack_require__(2);
	var NewGameForm = __webpack_require__(3);

	var GameApp = React.createClass({
	  displayName: "GameApp",

	  mixins: [ReactFireMixin],

	  getInitialState: function getInitialState() {
	    return {
	      uid: "",
	      ref: new Firebase("https://gogames.firebaseio.com/items/"),
	      games: [],
	      query: "",
	      searchGames: [],
	      errorMessage: ""
	    };
	  },

	  componentWillMount: function componentWillMount() {
	    this.bindAsArray(this.state.ref, "games");
	    this.bindAsArray(this.state.ref, "searchGames");
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this.unbind("games");
	  },

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(Nav, { user: this.state.uid, query: this.state.query, onLogin: this.login, onLogout: this.logout, onSearch: this.search }),
	      React.createElement(GameList, { user: this.state.uid, games: this.state.games, onEdit: this.edit, onUpdate: this.update, onDestroy: this.destroy, onAsecSort: this.asecSort, onDescSort: this.descSort }),
	      React.createElement(NewGameForm, { user: this.state.uid, onSubmit: this.submit })
	    );
	  },

	  login: function login() {
	    var _this = this;

	    var ref = this.state.ref;

	    ref.authWithOAuthPopup("github", function (error, authData) {
	      if (error) {
	        console.log("Login Failed! ", error);
	      } else {
	        _this.setState({
	          uid: authData.uid
	        });
	      }
	    });
	  },

	  logout: function logout() {
	    var ref = this.state.ref;

	    ref.unauth();

	    this.setState({
	      uid: ""
	    });
	  },

	  search: function search(query) {
	    var games = this.state.searchGames;
	    var results = [];

	    games.forEach(function (game) {
	      if (game.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
	        results.push(game);
	      }
	    });

	    this.setState({
	      query: query,
	      games: results
	    });
	  },

	  edit: function edit(game) {
	    var games = this.state.games;

	    var editIndex = games.indexOf(game);

	    games[editIndex].isEditing = true;

	    this._updateItems(games);
	  },

	  update: function update(game) {
	    var games = this.state.games;

	    var originalGame = games.filter(function (element) {
	      return element.id === game.id;
	    });

	    originalGame = originalGame[0];

	    var editIndex = games.indexOf(originalGame);

	    game.isEditing = false;

	    games[editIndex] = game;

	    this._updateItems(games);
	  },

	  destroy: function destroy(game) {
	    var games = this.state.games;

	    var newGames = games.filter(function (element) {
	      return element.id !== game.id;
	    });

	    this._updateItems(newGames);
	  },

	  submit: function submit(game) {
	    this.state.ref.push({
	      id: Date.now(),
	      name: game.name,
	      coop: game.coop,
	      link: game.link,
	      players: game.players,
	      expansion: game.expansion
	    });
	  },

	  asecSort: function asecSort() {
	    var games = this.state.games;

	    var comparator = function (a, b) {
	      var sort = 0;

	      if (a.name < b.name) {
	        sort = -1;
	      }
	      if (a.name > b.name) {
	        sort = 1;
	      }

	      return sort;
	    };

	    this.setState({
	      games: games.sort(comparator)
	    });
	  },

	  descSort: function descSort() {
	    var games = this.state.games;

	    var comparator = function (a, b) {
	      var sort = 0;

	      if (a.name < b.name) {
	        sort = 1;
	      }
	      if (a.name > b.name) {
	        sort = -1;
	      }

	      return sort;
	    };

	    this.setState({
	      games: games.sort(comparator)
	    });
	  },

	  _updateItems: function _updateItems(games) {
	    var ref = this.state.ref;

	    ref.set(games);

	    this.setState({
	      searchItems: games
	    });
	  }
	});

	React.render(React.createElement(GameApp, null), document.getElementById("app"));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(4);

	var Grid = _require.Grid;
	var Row = _require.Row;
	var Col = _require.Col;

	module.exports = React.createClass({
		displayName: "Nav",

		render: function render() {
			var authLink;
			var liStyles = {
				visibility: "hidden"
			};

			if (this.props.user) {
				authLink = React.createElement(
					"li",
					null,
					React.createElement(
						"a",
						{ href: "#", onClick: this.logout },
						"Sign Out"
					)
				);
			} else {
				authLink = React.createElement(
					"li",
					null,
					React.createElement(
						"a",
						{ href: "#", onClick: this.login },
						"Sign In"
					)
				);
			}

			return React.createElement(
				"header",
				{ className: "header" },
				React.createElement(
					Grid,
					null,
					React.createElement(
						Row,
						null,
						React.createElement(
							Col,
							{ md: 6 },
							React.createElement(
								"div",
								{ className: "logo-white" },
								React.createElement("img", { src: "images/logo-white.png" }),
								React.createElement(
									"h3",
									null,
									"GAMES"
								)
							)
						),
						React.createElement(
							Col,
							{ md: 6, className: "nav-wrapper" },
							React.createElement(
								"nav",
								{ className: "navbar navbar-inverse navbar-static-top", role: "navigation" },
								React.createElement(
									"div",
									{ className: "navbar-header" },
									React.createElement(
										"button",
										{ type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1" },
										React.createElement(
											"span",
											{ className: "sr-only" },
											"Toggle navigation"
										),
										React.createElement("span", { className: "icon-bar" }),
										React.createElement("span", { className: "icon-bar" }),
										React.createElement("span", { className: "icon-bar" })
									)
								),
								React.createElement(
									"div",
									{ className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1" },
									React.createElement(
										"ul",
										{ className: "nav navbar-nav" },
										React.createElement(
											"li",
											{ style: liStyles },
											React.createElement(
												"a",
												{ href: "#" },
												"Profile"
											)
										),
										authLink
									),
									React.createElement(
										"form",
										null,
										React.createElement("input", { type: "text", name: "search", ref: "search", placeholder: "Search", value: this.props.query, onChange: this.search }),
										React.createElement("input", { type: "image", src: "images/icon-search.png", alt: "Submit" })
									)
								)
							)
						)
					)
				)
			);
		},

		login: function login() {
			this.props.onLogin();
		},

		logout: function logout() {
			this.props.onLogout();
		},

		search: function search() {
			var query = this.refs.search.getDOMNode().value;

			this.props.onSearch(query);
		}
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var GameItem = __webpack_require__(5);
	var EditItem = __webpack_require__(6);
	var SelectedModal = __webpack_require__(7);

	var _require = __webpack_require__(4);

	var Grid = _require.Grid;
	var Row = _require.Row;
	var Button = _require.Button;
	var ModalTrigger = _require.ModalTrigger;

	module.exports = React.createClass({
	  displayName: "GameList",

	  getInitialState: function getInitialState() {
	    return {
	      selectedGame: ""
	    };
	  },

	  render: function render() {
	    var _this = this;

	    var gameAction = function (game) {
	      if (game.isEditing) {
	        return React.createElement(EditItem, { key: game.id, game: game, onUpdate: _this.props.onUpdate });
	      } else {
	        return React.createElement(GameItem, { key: game.id, game: game, user: _this.props.user, onEdit: function () {
	            return _this.props.onEdit(game);
	          }, onDestroy: function () {
	            return _this.props.onDestroy(game);
	          } });
	      }
	    };

	    return React.createElement(
	      "section",
	      { className: "players" },
	      React.createElement(
	        Grid,
	        null,
	        React.createElement(
	          "div",
	          { className: "email-wrapper" },
	          React.createElement(
	            "h3",
	            { className: "pull-left" },
	            "Greulich's Games"
	          ),
	          React.createElement(
	            "h4",
	            { className: "pull-right" },
	            "Total: ",
	            this.props.games.length
	          ),
	          React.createElement("div", { className: "clearfix" })
	        ),
	        React.createElement(
	          Row,
	          null,
	          React.createElement(
	            ModalTrigger,
	            { modal: React.createElement(SelectedModal, { game: this.state.selectedGame }) },
	            React.createElement(
	              Button,
	              { className: "pull-right btn-default", type: "button", onClick: function () {
	                  return _this.choose();
	                } },
	              "Choose a game"
	            )
	          )
	        ),
	        React.createElement(
	          Row,
	          { className: "table-wrapper" },
	          React.createElement(
	            "table",
	            { className: "table table-striped" },
	            React.createElement(
	              "thead",
	              null,
	              React.createElement(
	                "tr",
	                null,
	                React.createElement(
	                  "th",
	                  { className: "table-name" },
	                  "Game ",
	                  React.createElement(
	                    "span",
	                    { className: "pull-right" },
	                    React.createElement(
	                      "a",
	                      { href: "#", onClick: this.props.onAsecSort },
	                      React.createElement("span", { className: "glyphicon glyphicon-chevron-up" })
	                    ),
	                    React.createElement(
	                      "a",
	                      { href: "#", onClick: this.props.onDescSort },
	                      React.createElement("span", { className: "glyphicon glyphicon-chevron-down", "aria-hidden": "true" })
	                    )
	                  )
	                ),
	                React.createElement(
	                  "th",
	                  { className: "table-position" },
	                  "Players"
	                ),
	                React.createElement(
	                  "th",
	                  { className: "table-points" },
	                  "Co-op"
	                ),
	                React.createElement(
	                  "th",
	                  { className: "table-points" },
	                  "Type"
	                )
	              )
	            ),
	            React.createElement(
	              "tbody",
	              null,
	              this.props.games.map(gameAction)
	            )
	          )
	        )
	      )
	    );
	  },

	  choose: function choose() {
	    var games = this.props.games.filter(function (element) {
	      return element.expansion === "Base";
	    });

	    var key = Math.floor(Math.random() * games.length);

	    this.setState({
	      selectedGame: games[key]
	    });
	  }
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(4);

	var Grid = _require.Grid;
	var Row = _require.Row;
	var Col = _require.Col;
	var Input = _require.Input;
	var Button = _require.Button;

	module.exports = React.createClass({
	  displayName: "NewGameForm",

	  getInitialState: function getInitialState() {
	    return {
	      coop: "",
	      link: "",
	      name: "",
	      players: "",
	      expansion: ""
	    };
	  },

	  render: function render() {
	    var showForm = this.props.user ? true : false;
	    var formStyles = {
	      display: showForm ? "" : "none"
	    };

	    return React.createElement(
	      "section",
	      { style: formStyles, className: "content" },
	      React.createElement(
	        Grid,
	        null,
	        React.createElement(
	          "form",
	          { onSubmit: this.submit },
	          React.createElement(
	            Input,
	            { label: "New Game", wrapperClassName: "wrapper" },
	            React.createElement(
	              Row,
	              null,
	              React.createElement(
	                Col,
	                { xs: 3 },
	                React.createElement(Input, { type: "text", ref: "gameName", placeholder: "Enter game", onChange: this.onNameChange, value: this.state.name })
	              ),
	              React.createElement(
	                Col,
	                { xs: 3 },
	                React.createElement(Input, { type: "text", ref: "gamePLayers", placeholder: "Enter no. players", onChange: this.onPlayersChange, value: this.state.players })
	              ),
	              React.createElement(
	                Col,
	                { xs: 3 },
	                React.createElement(Input, { type: "text", ref: "gameCoop", placeholder: "Enter co-op", onChange: this.onCoopChange, value: this.state.coop })
	              ),
	              React.createElement(
	                Col,
	                { xs: 3 },
	                React.createElement(
	                  Input,
	                  { type: "select", ref: "gameExpansion", onChange: this.onExpansionChange, value: this.state.expansion },
	                  React.createElement(
	                    "option",
	                    null,
	                    "Type"
	                  ),
	                  React.createElement(
	                    "option",
	                    { value: "Base" },
	                    "Base"
	                  ),
	                  React.createElement(
	                    "option",
	                    { value: "Expansion" },
	                    "Expansion"
	                  )
	                )
	              )
	            ),
	            React.createElement(
	              Row,
	              null,
	              React.createElement(
	                Col,
	                { xs: 6, xsPush: 3 },
	                React.createElement(Input, { type: "text", ref: "gameLink", placeholder: "Enter link", onChange: this.onLinkChange, value: this.state.link })
	              )
	            )
	          ),
	          React.createElement(
	            Button,
	            { className: "pull-right btn-link", type: "submit" },
	            "Save"
	          )
	        )
	      )
	    );
	  },

	  submit: function submit(event) {
	    event.preventDefault();

	    this.props.onSubmit(this.state);

	    this.setState({
	      coop: "",
	      link: "",
	      name: "",
	      players: "",
	      expansion: ""
	    });
	  },

	  onNameChange: function onNameChange(event) {
	    this.setState({ name: event.target.value });
	  },

	  onPlayersChange: function onPlayersChange(event) {
	    this.setState({ players: event.target.value });
	  },

	  onCoopChange: function onCoopChange(event) {
	    this.setState({ coop: event.target.value });
	  },

	  onExpansionChange: function onExpansionChange(event) {
	    this.setState({ expansion: event.target.value });
	  },

	  onLinkChange: function onLinkChange(event) {
	    this.setState({ link: event.target.value });
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = ReactBootstrap;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = React.createClass({
	  displayName: "GameItem",

	  render: function render() {
	    var spanStyles = {
	      display: this.props.user ? "" : "none"
	    };

	    return React.createElement(
	      "tr",
	      null,
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "a",
	          { href: this.props.game.link, target: "_blank" },
	          this.props.game.name
	        ),
	        " ",
	        React.createElement(
	          "span",
	          { className: "pull-right", style: spanStyles },
	          React.createElement(
	            "a",
	            { href: "#", onClick: this.edit },
	            "edit"
	          ),
	          " | ",
	          React.createElement(
	            "a",
	            { href: "#", onClick: this.destroy },
	            "delete"
	          )
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        this.props.game.players
	      ),
	      React.createElement(
	        "td",
	        null,
	        this.props.game.coop
	      ),
	      React.createElement(
	        "td",
	        null,
	        this.props.game.expansion
	      )
	    );
	  },

	  edit: function edit(event) {
	    event.preventDefault();

	    this.props.onEdit();
	  },

	  destroy: function destroy(event) {
	    event.preventDefault();

	    this.props.onDestroy();
	  }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(4);

	var Input = _require.Input;

	module.exports = React.createClass({
	  displayName: "EditGameForm",

	  getInitialState: function getInitialState() {
	    return {
	      id: this.props.game.id,
	      coop: this.props.game.coop,
	      link: this.props.game.link,
	      name: this.props.game.name,
	      players: this.props.game.players,
	      expansion: this.props.game.expansion
	    };
	  },

	  render: function render() {
	    return React.createElement(
	      "tr",
	      null,
	      React.createElement(
	        "td",
	        null,
	        React.createElement(Input, { type: "text", ref: "gameName", value: this.state.name, onChange: this.onNameChange })
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(Input, { type: "text", ref: "gamePlayers", value: this.state.players, onChange: this.onPlayersChange })
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(Input, { type: "text", ref: "gameCoop", value: this.state.coop, onChange: this.onCoopChange })
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          Input,
	          { type: "select", ref: "gameExpansion", value: this.state.expansion, onChange: this.onExpansionChange },
	          React.createElement(
	            "option",
	            null,
	            "Type"
	          ),
	          React.createElement(
	            "option",
	            { value: "Base" },
	            "Base"
	          ),
	          React.createElement(
	            "option",
	            { value: "Expansion" },
	            "Expansion"
	          )
	        ),
	        React.createElement(
	          "span",
	          { className: "pull-right" },
	          React.createElement(
	            "a",
	            { href: "#", onClick: this.update },
	            "save"
	          )
	        )
	      )
	    );
	  },

	  onNameChange: function onNameChange(event) {
	    this.setState({ name: event.target.value });
	  },

	  onPlayersChange: function onPlayersChange(event) {
	    this.setState({ players: event.target.value });
	  },

	  onCoopChange: function onCoopChange(event) {
	    this.setState({ coop: event.target.value });
	  },

	  onExpansionChange: function onExpansionChange(event) {
	    this.setState({ expansion: event.target.value });
	  },

	  onLinkChange: function onLinkChange(event) {
	    this.setState({ link: event.target.value });
	  },

	  update: function update(event) {
	    event.preventDefault();

	    this.props.onUpdate(this.state);
	  }
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _require = __webpack_require__(4);

	var Modal = _require.Modal;
	var Button = _require.Button;

	module.exports = React.createClass({
	  displayName: "SelectedGameModal",

	  render: function render() {
	    return React.createElement(
	      Modal,
	      _extends({}, this.props, { title: "Play This One" }),
	      React.createElement(
	        "div",
	        { className: "modal-body" },
	        React.createElement(
	          "h4",
	          null,
	          this.props.game.name
	        ),
	        React.createElement(
	          "p",
	          null,
	          "A game for ",
	          this.props.game.players,
	          " players."
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "modal-footer" },
	        React.createElement(
	          Button,
	          { onClick: this.props.onRequestHide },
	          "Close"
	        )
	      )
	    );
	  }
	});

/***/ }
/******/ ]);