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

    playMoveAnimation(direction) {
        const {x, y} = {x: direction.x, y: direction.y};

        if (x === 1) {
            this.node.setScale(1);
            this.getComponent(cc.Animation).play('DudeFront');
        }

        if (y === 1) {
            this.node.setScale(-1, 1);
            this.getComponent(cc.Animation).play('DudeFront');
        }

        if (y === -1) {
            this.node.setScale(-1, 1);
            this.getComponent(cc.Animation).play('DudeBack');
        }

        if (x === -1) {
            this.node.setScale(1);
            this.getComponent(cc.Animation).play('DudeBack');
        }
    }
}