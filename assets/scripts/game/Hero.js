const {ccclass, property} = cc._decorator;

@ccclass
export class Hero extends cc.Component {
    @property({
        type: cc.Node,
        visible: true,
    })
    _anchor = null;

    getGlobalPosition() {
        return this.node.parent.convertToWorldSpaceAR(this.node.position.add(this._anchor.position));
    }

    playMoveAnimation() {
        this.getComponent(cc.Animation).play('DudeFront');
    }
}