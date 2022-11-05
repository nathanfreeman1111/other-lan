'use babel';

import OtherLanView from './other-lan-view';
import { CompositeDisposable } from 'atom';

export default {

  otherLanView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.otherLanView = new OtherLanView(state.otherLanViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.otherLanView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'other-lan:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.otherLanView.destroy();
  },

  serialize() {
    return {
      otherLanViewState: this.otherLanView.serialize()
    };
  },

  toggle() {
    console.log('OtherLan was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
