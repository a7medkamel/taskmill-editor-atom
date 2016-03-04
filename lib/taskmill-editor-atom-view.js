function TaskmillEditorAtomView(serializedState) {
  var message;
  this.element = document.createElement('div');
  this.element.classList.add('taskmill-editor-atom');
  message = document.createElement('div');
  message.textContent = "The TaskmillEditorAtom package is Alive! It's ALIVE!";
  message.classList.add('message');
  this.element.appendChild(message);
}

TaskmillEditorAtomView.prototype.serialize = function() {};

TaskmillEditorAtomView.prototype.destroy = function() {
  return this.element.remove();
};

TaskmillEditorAtomView.prototype.getElement = function() {
  return this.element;
};

module.exports = TaskmillEditorAtomView;
