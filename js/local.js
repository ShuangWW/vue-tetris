var Local = function(){
    // 游戏对象
    var game;
    // 定时器
    var timer = null;
    // 时间间隔
    var INTERVAL = 200;
    // 时间计数器
    var timeCount = 0;
    // 时间
    var time = 0;
    // 绑定键盘事件
    var bindKeyEvent = function(){
        document.onkeydown = function(e){
            switch(e.keyCode){
                case 32:              // space
                    game.fall();
                    break;
                case 37:              // left
                    game.left();
                    break;
                case 38:              // up
                    game.rotate();
                    break;
                case 39:              // right
                    game.right();
                    break;
                case 40:              // down
                    game.down();
                    break;
            }
        }
    };
    // 移动
    var move = function(){
        timeFunc();
        if(!game.down()){
            game.fixed();
            var line = game.checkClear();
            if(line){
                game.addScore(line)
            }
            if(game.checkGameOver()){
                game.gameOver()
                stop()
            }else{
                game.performNext(generateType(),generateDir());
            }
        }
    };
    // 计时函数
    var timeFunc = function(){
        timeCount++;
        if(timeCount == 5){
            timeCount = 0;
            time++;
            game.setTime(time)
            if(time%10 == 0){
                game.addTailLines(generateBottomLine(1))
            }
        }
    }
    // 随机生成干扰行
    var generateBottomLine = function(lineNum){
        var lines = [];
        for(var i=0; i<lineNum; i++){
            var line = [];
            for(var j=0; j<10; j++){
                line.push(Math.ceil(Math.random() * 2) - 1);
            }
            lines.push(line);
        }
        return lines;
    }
    // 随机生成一个方块种类
    var generateType = function(){
        return Math.ceil(Math.random() * 7) - 1;
    };
    // 随机生成一个旋转次数
    var generateDir = function(){
        return Math.ceil(Math.random() * 4) - 1;
    };
    // 开始
    var start = function(){
        var doms = {
            gameDiv : document.getElementById('game'),
            nextDiv : document.getElementById('next'),
            timeDiv : document.getElementById('time'),
            scoreDiv : document.getElementById('score'),
            resultDiv : document.getElementById('gameOver')
        }
        game = new Game();
        game.init(doms,generateType(),generateDir());
        bindKeyEvent();
        game.performNext(generateType(),generateDir())
        timer = setInterval(move,INTERVAL)
    }
    var stop = function(){
        if(timer){
            clearInterval(timer)
            timer = null
        }
        document.onkeydown = null
    }
    // 导出api
    this.start = start;
}