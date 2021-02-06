import {Locale} from "../Locale";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Dialogue extends cc.Component {
    @property({
        type: cc.Node,
        visible: true
    })
    _renderNode = null;
    @property({
        type: cc.Node,
        visible: true
    })
    _textContainer = null;

    _playedText = 0;
    _dialogue = {};

    static EVENT_CHANGE_BG = 'changeBackGround';
    static EVENT_DIALOGUE_END = 'dialogueEnd';

    onLoad() {
        this._text = this._renderNode.getComponent('TypableText');
        this._char = this._renderNode.getComponent('DialogueImage');
        this._textContainer.active = false;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, event => {
            if (event.keyCode === cc.macro.KEY.escape) {
                this._completeSkipDialogue();
            }
        })
    }

    runTalk(key) {
        this._text.isTextTyping = false;

        if (this._textContainer) {
            this._textContainer.active = true;
        }

        this._dialogue = typeof key === 'string' ? Locale.getString(key) : key;
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
                if (this._char) {
                    this._char.spriteFrame = textToShow.character;
                }

                if (textToShow.background) {
                    this.node.emit(Dialogue.EVENT_CHANGE_BG, textToShow.background);
                }

                this._text.processDialogue(textToShow);
                ++this._playedText;
            } else {
                this._renderNode.off(cc.Node.EventType.TOUCH_START, this._processDialogue, this);
                this.node.emit(Dialogue.EVENT_DIALOGUE_END, this);

                if (this._textContainer) {
                    this._textContainer.active = false;
                }
            }
        }
    }

    _completeSkipDialogue() {
        this._playedText = 0;
        this._renderNode.off(cc.Node.EventType.TOUCH_START, this._processDialogue, this);

        if (this._textContainer) {
            this._textContainer.active = false;
        }
    }
}