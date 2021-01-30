const {ccclass, property} = cc._decorator;

@ccclass
export class TypableText extends cc.Component {
    @property(cc.Label)
    text = null

    setText(text) {
        this.text = text;
        // TODO: Печатаем текст с задержкой
    }
}
