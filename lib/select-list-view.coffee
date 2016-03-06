# https://atom.io/docs/v1.3.1/upgrading-to-1-0-apis-upgrading-your-package

{SelectListView} = require 'atom-space-pen-views'

Promise = require 'bluebird'

class MySelectListView extends SelectListView
  initialize: ->
    super()
    # no more need for the `overlay` and `from-top` classes
    @addClass('command-palette')
    atom.commands.add 'atom-workspace', 'command-palette:toggle', => @toggle()

  # You need to implement the `cancelled` method and hide.
  cancelled: ->
    this.trigger('cancel')
    @hide()

  confirmed: (chosen) ->
    this.trigger('confirm', chosen);
    @cancel()
    # do something with the result

  viewForItem: (item) ->
    "<li><b>#{item.label}</b><div>#{item.detail}</div></li>"

  getFilterKey: ->
    "fuzzy"

  show: (items) ->
    # Now you will add your select list as a modal panel to the workspace
    @panel ?= atom.workspace.addModalPanel(item: this)
    @panel.show()

    @storeFocusedElement()

    if items
      @setItems(items)

    @focusFilterEditor()

  hide: ->
    @panel?.hide()

  # Tear down any state and detach
  destroy: ->
    @element.remove()
    @panel?.destroy()

  @show: (p$items) ->
    Promise
      .resolve(p$items)
      .then((items) ->
          ret = new MySelectListView();

          return new Promise((res, rej) ->
            ret.on('cancel', ->
              res()
            )

            ret.on('confirm', (e, arg) ->
              res(arg)
            )

            ret.show(items);
          ).finally(->
            ret.destroy();
          );
      )

module.exports = MySelectListView
