import {Locale} from '../Locale';
const {ccclass, property} = cc._decorator;

@ccclass
export class TypableText extends cc.Component {
    @property(cc.Label)
    label = null;

    onLoad() {
        this.setText(Locale.getString('introDialogue'));
    }

    setText(text) {
        for(let i = 0; i < text.length; ++i) {
            this.scheduleOnce(() => {
                this.label.string = text.substr(0, i);
            }, i / 10);
        }
    }
}
