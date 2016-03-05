var CompositeDisposable = require('atom').CompositeDisposable;

var MySelectListView = require('./select-list-view');
var _ = require('lodash');
var taskmill_cli = require('taskmill-cli');

module.exports = {
  subscriptions: null,
  activate: function(state) {
    this.subscriptions = new CompositeDisposable;
    return this.subscriptions.add(atom.commands.add('atom-workspace', {
      'taskmill-editor-atom:chose': (function(_this) {
        return function() {
          return _this.chose();
        };
      })(this)
    }));
  },
  deactivate: function() {
    this.subscriptions.dispose();
  },
  chose: function() {
    var editor = atom.workspace.getActiveTextEditor();

    MySelectListView
      .show(taskmill_cli.search().then(function(result){
        return _.map(result, function(item){
          var label       = item.title || ''
            , detail      = item.html_url || ''
            , description = item.description || ''
            ;

          return _.extend(item, {
              description : description
            , detail      : detail
            , label       : label
            , fuzzy       : label + '\n' + description + '\n' + detail
          });
        });
      }))
      .then(function(chosen) {
          if (chosen) {
              var text = undefined;
              if (editor) {
                   text = editor.getSelectedText();
              }

              taskmill_cli
                  .run(chosen.run_url, text)
                  .then(function(result){
                      if (result.encoding != 'binary' && editor) {
                          return result
                                  .readFile()
                                  .then(function(text){
                                      var sel = editor.getLastSelection();
                                      var range = sel.getScreenRange();

                                      if (range.isEmpty()) {
                                          sel.insertText(text);
                                      } else {
                                          var type = result.headers['$type'];
                                          if (type === 'generate') {
                                              var cur = editor.getCursorBufferPosition()
                                              editor.setCursorBufferPosition([range.end.row, range.end.column])
                                              editor.insertText('\n' + text);
                                              editor.setCursorBufferPosition(cur)
                                          } else {
                                              sel.insertText(text, { select : true });
                                          }
                                      }
                                  });
                      } else {
                          return result.open();
                      }
                  });
          }
      })
      .catch(function(err) {
          console.error(err);
      });
  }
};
