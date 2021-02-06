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

    type = null;
    dialogueKey = '';

    static instance = null;

    onLoad() {
        super.onLoad();
        StoryScene.instance = this;
    }

    start() {
        cc.audioEngine.stopAll();
        cc.audioEngine.playMusic(this._slideSound, true);
        this._dialogue = this.getComponent('Dialogue');
        this._dialogue.runTalk(this.dialogueKey);
        this._dialogue.node.on(Dialogue.EVENT_CHANGE_BG, this._updateBackground, this);
        this._dialogue.node.on(Dialogue.EVENT_DIALOGUE_END, this.onStoryEnd, this);
    }
    onDisable() {
        cc.audioEngine.stopAll();
    }

    _updateBackground(bgName) {
        let background = cc.assetManager.assets.find(ass => ass.name === bgName);

        if (background) {
            this._background.spriteFrame = background;
        }
    }
}