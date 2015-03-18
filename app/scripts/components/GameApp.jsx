'use strict';

var Nav          = require('./Nav')
var GameList     = require('./GameList');
var NewGameForm  = require('./NewGameForm');

var GameApp = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState() {
    return {
      items: [],
      ref: new Firebase('https://gogames.firebaseio.com/items/')
    }
  },

  componentWillMount() {
    this.bindAsArray(this.state.ref, 'items');
  },

  editItem(item) {
    var ref   = this.state.ref;
    var items = this.state.items;

    var editIndex = items.indexOf(item);

    items[editIndex].isEditing = true;

    ref.set(items);
  },

  saveEdit(item) {
    var ref   = this.state.ref;
    var items = this.state.items;

    var originalItem = items.filter((element) => {
      return element.id === item.id;
    });

    originalItem = originalItem[0];

    var editIndex = items.indexOf(originalItem);

    item.isEditing = false;

    items[editIndex] = item;

    ref.set(items);
  },

  deleteItem(item) {
    var ref   = this.state.ref;
    var items = this.state.items;

    var newItems = items.filter((element) => {
      return element.id !== item.id
    });

    ref.set(newItems);
  },

  handleSubmit(item) {
    this.firebaseRefs["items"].push({
      name: item.title,
      players: item.players,
      coop: item.coop,
      link: item.link,
      id: Date.now()
    });
  },

  render() {
    return (
      <div>
        <Nav />
        <GameList items={this.state.items} onDelete={this.deleteItem} onEdit={this.editItem} onSaveEdit={this.saveEdit} />
        <NewGameForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
});

React.render(<GameApp />, document.getElementById('app'));
