
@ccclass
export default class BaseScene extends cc.Component {

    onLoad () {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height/2;

        // store last star's x position
        this.currentStar = null;
        this.currentStarX = 0;

        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;

        // is showing menu or isPlaying game
        this.isPlaying = false;

        // initialize control hint
        var hintText = cc.sys.isMobile ? this.touchHint : this.keyboardHint;
        this.controlHintLabel.string = hintText;

        // initialize star and score pool
        this.starPool = new cc.NodePool('Star');
        this.scorePool = new cc.NodePool('ScoreFX');
    }

}
