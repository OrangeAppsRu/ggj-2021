import {Config} from '../config';

cc.Class({
    extends: cc.Component,

    properties: {
        language: 'ru',
    },

    // use this for initialization
    onLoad: function () {
        window.game = this;
        this.config = Config;
    },

    // called every frame
    update: function (dt) {

    },
});
