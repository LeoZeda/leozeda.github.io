/**
 * Created by Leo on 2016/12/14.
 */
var canvas, stage, container, image = {}, sprite;

window.onload = function () {
    canvas = document.getElementById('mainView');
    //创建舞台对象
    stage = new createjs.Stage(canvas);
    //新建container容器
    container = new createjs.Container();
    stage.addChild(container);

    //preload,  加载资源， 及设置监听事件
    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("progress", handleProgress);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest([
        { src: "bg.jpg" , id: "background"},
        { src: "sprite.png", id: "sprite" }
    ])

    //动画帧数， 及每一帧的回调函数
    createjs.Ticker.framerate = 30;
    createjs.Ticker.addEventListener("tick", stageBreakHandler);
}

function handleFileLoad(event) {
    //console.log(event);
    if( event.item.type == "image" ){
        image[event.item.id] = event.result;
    }
}

function handleProgress(event) {
    //console.log(event.progress)
}

function handleComplete(event) {
    //console.log(event);
    //注销preload事件
    event.currentTarget.removeEventListener("fileload", handleFileLoad);
    event.currentTarget.removeEventListener("progress", handleProgress);
    event.currentTarget.removeEventListener("complete", handleComplete);

    //布置场景
    var bitmap = new createjs.Bitmap(image['background']);
    container.addChild(bitmap);
    bitmap.addEventListener("click", handleClick);
    var spriteData = {
        framerate: 30,
        images: [image['sprite']],
        frames: { width: 80, height: 80, regX: 40, regY: 40 },
        animations: {
            stand:[0, 3, "stand", 0.2],
            walk:{
                frames: [4, 5, 6, 7, 6, 5],
                next: "walk",
                speed: 0.2
            }
        }
    }
    var spriteSheet = new createjs.SpriteSheet(spriteData);
    sprite = new createjs.Sprite(spriteSheet, "stand");
    container.addChild(sprite);
    sprite.x = 100;
    sprite.y = 100;
}

function handleClick(event) {
    //console.log(event);
    createjs.Tween.removeTweens(sprite);
    if( event.rawX > sprite.x ){
        sprite.scaleX = 1;
    }
    else if( event.rawX < sprite.x ){
        sprite.scaleX = -1;  //为-1的时候可以转方向
    }
    createjs.Tween.get(sprite).to({ x: event.rawX, y: event.rawY }, 1000).call(tweenCompleteHandler);
    sprite.gotoAndPlay("walk");
}

function tweenCompleteHandler(event) {
    sprite.gotoAndPlay("stand");
}

function stageBreakHandler(event) {
    stage.update();
}
