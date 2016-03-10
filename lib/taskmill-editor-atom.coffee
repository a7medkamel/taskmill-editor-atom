# TaskmillEditorAtomView = require './taskmill-editor-atom-view'
# {CompositeDisposable} = require 'atom'
#
# module.exports = TaskmillEditorAtom =
#   taskmillEditorAtomView: null
#   modalPanel: null
#   subscriptions: null
#
#   activate: (state) ->
#     @taskmillEditorAtomView = new TaskmillEditorAtomView(state.taskmillEditorAtomViewState)
#     @modalPanel = atom.workspace.addModalPanel(item: @taskmillEditorAtomView.getElement(), visible: false)
#
#     # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
#     @subscriptions = new CompositeDisposable
#
#     # Register command that toggles this view
#     @subscriptions.add atom.commands.add 'atom-workspace', 'taskmill-editor-atom:toggle': => @toggle()
#
#   deactivate: ->
#     @modalPanel.destroy()
#     @subscriptions.dispose()
#     @taskmillEditorAtomView.destroy()
#
#   serialize: ->
#     taskmillEditorAtomViewState: @taskmillEditorAtomView.serialize()
#
#   toggle: ->
#     console.log 'TaskmillEditorAtom was toggled!'
#
#     if @modalPanel.isVisible()
#       @modalPanel.hide()
#     else
#       @modalPanel.show()
