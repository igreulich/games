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
	      items: [],
	      ref: new Firebase("https://gogames.firebaseio.com/items/")
	    };
	  },

	  componentWillMount: function componentWillMount() {
	    this.bindAsArray(this.state.ref, "items");
	  },

	  editItem: function editItem(item) {
	    var ref = this.state.ref;
	    var items = this.state.items;

	    var editIndex = items.indexOf(item);

	    items[editIndex].isEditing = true;

	    ref.set(items);
	  },

	  saveEdit: function saveEdit(item) {
	    var ref = this.state.ref;
	    var items = this.state.items;

	    var originalItem = items.filter(function (element) {
	      return element.id === item.id;
	    });

	    originalItem = originalItem[0];

	    var editIndex = items.indexOf(originalItem);

	    item.isEditing = false;

	    items[editIndex] = item;

	    ref.set(items);
	  },

	  deleteItem: function deleteItem(item) {
	    var ref = this.state.ref;
	    var items = this.state.items;

	    var newItems = items.filter(function (element) {
	      return element.id !== item.id;
	    });

	    ref.set(newItems);
	  },

	  handleSubmit: function handleSubmit(item) {
	    this.firebaseRefs.items.push({
	      name: item.title,
	      players: item.players,
	      coop: item.coop,
	      link: item.link,
	      id: Date.now()
	    });
	  },

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(Nav, null),
	      React.createElement(GameList, { items: this.state.items, onDelete: this.deleteItem, onEdit: this.editItem, onSaveEdit: this.saveEdit }),
	      React.createElement(NewGameForm, { onSubmit: this.handleSubmit })
	    );
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
			var liStyles = {
				visibility: "hidden"
			};

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
										React.createElement(
											"li",
											{ style: liStyles },
											React.createElement(
												"a",
												{ href: "contact.php" },
												"Sign Out"
											)
										)
									),
									React.createElement(
										"form",
										null,
										React.createElement("input", { type: "text", name: "search", placeholder: "Search" }),
										React.createElement("input", { type: "image", src: "images/icon-search.png", alt: "Submit" })
									)
								)
							)
						)
					)
				)
			);
		}
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var GameItem = __webpack_require__(5);
	var EditItem = __webpack_require__(6);

	var _require = __webpack_require__(4);

	var Grid = _require.Grid;
	var Row = _require.Row;

	module.exports = React.createClass({
	  displayName: "GameList",

	  render: function render() {
	    var _this = this;

	    var gameItem = function (item) {
	      var edit = React.createElement(EditItem, { key: item.id, item: item, onSaveEdit: _this.props.onSaveEdit });
	      var show = React.createElement(GameItem, { key: item.id, item: item, onDeleteItem: function () {
	          return _this.props.onDelete(item);
	        }, onEditItem: function () {
	          return _this.props.onEdit(item);
	        } });

	      return item.isEditing ? edit : show;
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
	            "h4",
	            null,
	            "Greulich's Games"
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
	                  "Game"
	                ),
	                React.createElement(
	                  "th",
	                  { className: "table-position" },
	                  "No. Players"
	                ),
	                React.createElement(
	                  "th",
	                  { className: "table-points" },
	                  "Cooperative"
	                )
	              )
	            ),
	            React.createElement(
	              "tbody",
	              null,
	              this.props.items.map(gameItem)
	            )
	          )
	        )
	      )
	    );
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
				title: "",
				players: "",
				coop: "",
				link: ""
			};
		},

		handleSubmit: function handleSubmit(e) {
			e.preventDefault();

			this.props.onSubmit(this.state);

			this.setState({
				title: "",
				players: "",
				coop: "",
				link: "" });
		},

		onTitleChange: function onTitleChange(e) {
			this.setState({ title: e.target.value });
		},

		onPlayersChange: function onPlayersChange(e) {
			this.setState({ players: e.target.value });
		},

		onCoopChange: function onCoopChange(e) {
			this.setState({ coop: e.target.value });
		},

		onLinkChange: function onLinkChange(e) {
			this.setState({ link: e.target.value });
		},

		render: function render() {
			return React.createElement(
				"section",
				{ className: "content" },
				React.createElement(
					Grid,
					null,
					React.createElement(
						"form",
						{ onSubmit: this.handleSubmit },
						React.createElement(
							Input,
							{ label: "New Game", wrapperClassName: "wrapper" },
							React.createElement(
								Row,
								null,
								React.createElement(
									Col,
									{ xs: 4 },
									React.createElement(Input, { ref: "gameTitle", placeholder: "Enter game", type: "text", onChange: this.onTitleChange, value: this.state.title })
								),
								React.createElement(
									Col,
									{ xs: 4 },
									React.createElement(Input, { ref: "gamePLayers", placeholder: "Enter no. players", type: "text", onChange: this.onPlayersChange, value: this.state.players })
								),
								React.createElement(
									Col,
									{ xs: 4 },
									React.createElement(Input, { ref: "gameCoop", placeholder: "Enter co-op", type: "text", onChange: this.onCoopChange, value: this.state.coop })
								)
							),
							React.createElement(
								Row,
								null,
								React.createElement(
									Col,
									{ xs: 6, xsPush: 3 },
									React.createElement(Input, { ref: "gameLink", placeholder: "Enter link", type: "text", onChange: this.onLinkChange, value: this.state.link })
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

	  getInitialState: function getInitialState() {
	    return {
	      name: this.props.item.name,
	      players: this.props.item.players,
	      coop: this.props.item.coop,
	      link: this.props.item.link
	    };
	  },

	  deleteItem: function deleteItem(e) {
	    e.preventDefault();

	    this.props.onDeleteItem();
	  },

	  editItem: function editItem(e) {
	    e.preventDefault();

	    this.props.onEditItem();
	  },

	  render: function render() {
	    return React.createElement(
	      "tr",
	      null,
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "a",
	          { href: this.state.link, target: "_blank" },
	          this.state.name
	        ),
	        " ",
	        React.createElement(
	          "span",
	          { className: "pull-right" },
	          React.createElement(
	            "a",
	            { href: "#", onClick: this.editItem },
	            "edit"
	          ),
	          " | ",
	          React.createElement(
	            "a",
	            { href: "#", onClick: this.deleteItem },
	            "delete"
	          )
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        this.state.players
	      ),
	      React.createElement(
	        "td",
	        null,
	        this.state.coop
	      )
	    );
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
	      id: this.props.item.id,
	      name: this.props.item.name,
	      players: this.props.item.players,
	      coop: this.props.item.coop,
	      link: this.props.item.link
	    };
	  },

	  saveEdit: function saveEdit(e) {
	    e.preventDefault();

	    this.props.onSaveEdit(this.state);
	  },

	  onNameChange: function onNameChange(e) {
	    this.setState({ name: e.target.value });
	  },

	  onPlayersChange: function onPlayersChange(e) {
	    this.setState({ players: e.target.value });
	  },

	  onCoopChange: function onCoopChange(e) {
	    this.setState({ coop: e.target.value });
	  },

	  onLinkChange: function onLinkChange(e) {
	    this.setState({ link: e.target.value });
	  },

	  render: function render() {
	    return React.createElement(
	      "tr",
	      null,
	      React.createElement(
	        "td",
	        null,
	        React.createElement(Input, { ref: "gameTitle", value: this.state.name, type: "text", onChange: this.onNameChange })
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(Input, { ref: "gamePlayers", value: this.state.players, type: "text", onChange: this.onPlayersChange })
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(Input, { ref: "gameCoop", value: this.state.coop, type: "text", onChange: this.onCoopChange }),
	        " ",
	        React.createElement(
	          "span",
	          { className: "pull-right" },
	          React.createElement(
	            "a",
	            { href: "#", onClick: this.saveEdit },
	            "save"
	          )
	        )
	      )
	    );
	  }
	});

/***/ }
/******/ ]);