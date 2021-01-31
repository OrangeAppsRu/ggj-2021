import {Locale} from "../Locale";

export class Dialogue {
    _playedText = 0;
    _dialogue = {};

    constructor(renderNode) {
        this._renderNode = renderNode;
        this._char = renderNode.getComponent('DialogueImage');
        this._text = renderNode.getComponent('TypableText');
        this._textContainer = renderNode.getChildByName('textContainer');
    }

    runTalk(key) {
        this._textContainer.active = true;
        this._dialogue = Locale.getString(key);
        this._playedText = 0;

        if (this._dialogue) {
            this._processDialogue();
            this._renderNode.on(cc.Node.EventType.TOUCH_START, this._processDialogue, this);
        }
    }

    _processDialogue() {
        if (!this._text.isTextTyping) {
            this._text.isTextTyping = true;
            const textToShow = this._dialogue[this._playedText];

            if (textToShow) {
                this._char.setSpriteFrame(textToShow.character);
                this._text.processDialogue(textToShow);
                ++this._playedText;
            } else {
                this._renderNode.off(cc.Node.EventType.TOUCH_START, this._processDialogue, this);
                this._textContainer.active = false;
            }
        }
    }
}