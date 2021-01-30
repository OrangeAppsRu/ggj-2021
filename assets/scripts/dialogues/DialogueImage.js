const {ccclass, property} = cc._decorator;

@ccclass
export class DialogueImage extends cc.Component {
    @property(cc.Prefab)
    dialoguePrefab = null;

    onLoad(s) {
        this.createImage();
    }

    createImage() {
        const image = cc.instantiate(this.dialoguePrefab);
        const dialogueNode = this.node.getChildByName('dialogue');
        const imageNode = dialogueNode.getChildByName('image');

        imageNode.addChild(image);

        image.setPosition(0, 0);
        image.setContentSize(imageNode.width, imageNode.height);
    }
}
