import BaseScene from "./BaseScene";
import Dialogue from "../dialogues/Dialogue";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StoryScene extends BaseScene {
    @property({
        type: cc.Node,
        visible: true
    })
    _background = null;

    @property({
        type: cc.AudioClip,
        visible: true
    })
    _slideSound = null;

    @property(cc.SpriteFrame)
    intro1 = null;

    @property(cc.SpriteFrame)
    intro2 = null;

    @property(cc.SpriteFrame)
    intro3 = null;

    @property(cc.SpriteFrame)
    final = null;

    @property(cc.SpriteFrame)
    final2 = null;


    type = null;
    dialogueKey = '';

    static instance = null;

    onLoad() {
        super.onLoad();
        StoryScene.instance = this;
        cc.audioEngine.stopAll();
        cc.audioEngine.playMusic(this._slideSound, true);
        this._dialogue = this.getComponent('Dialogue');
    }

    start() {
        this._dialogue.runTalk(this.dialogueKey);
        this._dialogue.node.on(Dialogue.EVENT_CHANGE_BG, this._updateBackground, this);
        this._dialogue.node.on(Dialogue.EVENT_DIALOGUE_END, this.onStoryEnd, this);
    }

    onDisable() {
        cc.audioEngine.stopAll();
        this._dialogue.node.off(Dialogue.EVENT_CHANGE_BG, this._updateBackground, this);
        this._dialogue.node.off(Dialogue.EVENT_DIALOGUE_END, this.onStoryEnd, this);
    }

    _updateBackground(bgName) {
        let background = this[bgName];

        if (background) {
            this._background.spriteFrame = background;
        }
    }
}