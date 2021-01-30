const {ccclass, property} = cc._decorator;

@ccclass
export class DialogueText extends cc.Component {
    @property(cc.Label)
    label = 'Hello, World!'

    onLoad () {
        // this.label.string = thi;
    }
}
