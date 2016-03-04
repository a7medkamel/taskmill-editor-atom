var TaskmillEditorAtomView = require('./taskmill-editor-atom-view');

var CompositeDisposable = require('atom').CompositeDisposable;

module.exports = {
  taskmillEditorAtomView: null,
  modalPanel: null,
  subscriptions: null,
  activate: function(state) {
    this.taskmillEditorAtomView = new TaskmillEditorAtomView(state.taskmillEditorAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.taskmillEditorAtomView.getElement(),
      visible: false
    });
    this.subscriptions = new CompositeDisposable;
    return this.subscriptions.add(atom.commands.add('atom-workspace', {
      'taskmill-editor-atom:toggle': (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this)
    }));
  },
  deactivate: function() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    return this.taskmillEditorAtomView.destroy();
  },
  serialize: function() {
    return {
      taskmillEditorAtomViewState: this.taskmillEditorAtomView.serialize()
    };
  },
  toggle: function() {
    console.log('TaskmillEditorAtom was toggled!');
    if (this.modalPanel.isVisible()) {
      return this.modalPanel.hide();
    } else {
      return this.modalPanel.show();
    }
  }
};
