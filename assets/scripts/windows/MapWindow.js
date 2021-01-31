const {ccclass} = cc._decorator;

@ccclass
export class BaseWindow extends cc.Component {
	closeWindow() {
        this.node.destroy();
    }
}