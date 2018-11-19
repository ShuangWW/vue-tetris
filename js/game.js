var Game = function () {
    // Doms
    var gameDiv, nextDiv, timeDiv, scoreDiv, resultDiv;

    // divs
    var gameDivs = [], nextDivs = [];
    
    // 当前方块，下-个方块
    var cur, next;

    // 当前分数
    var score = 0;

    // 矩阵
    var gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];


    // 初始化DIV（游戏区域，下一个方块显示区域）
    var initDiv = function (container, data, divs) {
        for (var i = 0; i < data.length; i++) {
            var div = [];
            for (var j = 0; j < data[0].length; j++) {
                var newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = (i * 20) + 'px'
                newNode.style.left = (j * 20) + 'px';
                container.appendChild(newNode);
                div.push(newNode)
            }
            divs.push(div)
        }
    }
    // 刷新Div
    var refreshDiv = function (data, divs) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] == 0) {
                    divs[i][j].className = 'none'
                } else if (data[i][j] == 1) {
                    divs[i][j].className = 'done'
                } else if (data[i][j] == 2) {
                    divs[i][j].className = 'current'
                }
            }
        }
    }


    // 检测数据是否合法
    var isValid = function (pos, data) {
        debugger
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] != 0) {
                    if (!check(pos, i, j)) {
                        return false
                    }
                }
            }
        }
        return true;
    }
    // 检测点是否合法（有木有超出范围）
    var check = function (pos, x, y) {
        if (pos.x + x < 0) {
            return false;
        } else if (pos.x + x >= gameData.length) {
            return false
        } else if (pos.y + y < 0) {
            return false
        } else if (pos.y + y >= gameData[0].length) {
            return false;
        } else if (gameData[pos.x + x][pos.y + y] == 1) {
            return false;
        } else {
            return true
        }
    }


    // 设置数据
    var setData = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j]
                }
            }
        }
    }
    // 清除数据
    var clearData = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = 0
                }
            }
        }
    }


    // 旋转
    var rotate = function () {
        if (cur.canRotate(isValid)) {
            clearData()
            cur.rotate()
            setData();
            refreshDiv(gameData, gameDivs)
        }
    }
    // 下移
    var down = function () {
        if (cur.canDown(isValid)) {
            clearData()
            cur.down()
            setData();
            refreshDiv(gameData, gameDivs)
            return true;
        } else {
            return false
        }
    }
    // 左移
    var left = function () {
        if (cur.canLeft(isValid)) {
            clearData()
            cur.left()
            setData();
            refreshDiv(gameData, gameDivs)
        }
    }
    // 右移
    var right = function () {
        if (cur.canRight(isValid)) {
            clearData()
            cur.right()
            setData();
            refreshDiv(gameData, gameDivs)
        }
    }

    // 方块移动到底部，给它固定
    var fixed = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    if (gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
                        gameData[cur.origin.x + i][cur.origin.y + j] = 1
                    }
                }
            }
        }
        refreshDiv(gameData, gameDivs)
    }
    // 消行
    var checkClear = function () {
        var line = 0;
        // 从矩阵的倒数第一行开始遍历
        for (var i = gameData.length - 1; i >= 0; i--) {
            var clear = true;
            // 若有不为一的，则代表此行没填充满，则不予清除
            for (var j = 0; j < gameData[0].length; j++) {
                if (gameData[i][j] != 1) {
                    clear = false;
                    break;
                }
            }
            // 若填充满，予以清除
            if (clear) {
                line++
                // 将上一行的数据赋值给下一行数据（向下平移）
                for (var m = i; m > 0; m--) {
                    for (var n = 0; n < gameData[0].length; n++) {
                        gameData[m][n] = gameData[m - 1][n]
                    }
                }
                // 矩阵的第一行清为0，初始状态
                for (var n = 0; n < gameData[0].length; n++) {
                    gameData[0][n] = 0;
                }
                i++;
            }
        }
        return line
    }
    // 判断游戏结束
    var checkGameOver = function () {
        var gameOver = false;
        for (var i = 0; i < gameData[0].length; i++) {
            if (gameData[1][i] == 1) {
                gameOver = true
                break
            }
        }
        return gameOver
    }
    // 使用下一个方块
    var performNext = function (type, dir) {
        cur = next;
        setData();
        next = SquareFactory.prototype.make(type, dir);
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs)
    }
    // 设置时间
    var setTime = function (time) {
        timeDiv.innerHTML = time;
    }
    // 得分
    var addScore = function (line) {
        var s = 0;
        switch (line) {
            case 1:
                s = 10;
                break;
            case 2:
                s = 30;
                break;
            case 3:
                s = 60;
                break;
            case 4:
                s = 100;
                break;
            default:
                break;
        }
        score = score + s;
        scoreDiv.innerHTML = score
    }
    // 游戏结束
    var gameOver = function(){
        resultDiv.innerHTML = '再接再厉'
    }
    // 底部增加行
    var addTailLines = function(lines){
        // 原始数据上移
        for(var i=0; i<gameData.length - lines.length; i++){
            gameData[i] = gameData[i + lines.length];
        }
        // 干扰行在底部覆盖
        for(var i=0; i<lines.length; i++){
            gameData[gameData.length - lines.length + i] = lines[i]
        }
        cur.origin.x = cur.origin.x - lines.length;
        if(cur.origin.x < 0){
            cur.origin.x = 0;
        }
        refreshDiv(gameData,gameDivs)
    }

    // 初始化
    var init = function (doms, type, dir) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        timeDiv = doms.timeDiv;
        scoreDiv = doms.scoreDiv;
        resultDiv = doms.resultDiv;
        // cur = SquareFactory.prototype.make(6,4);
        // next = SquareFactory.prototype.make(3,3);
        next = SquareFactory.prototype.make(type, dir);
        // 初始化游戏区域
        initDiv(gameDiv, gameData, gameDivs);
        // 初始化下一个块的区域
        initDiv(nextDiv, next.data, nextDivs);
        // setData();
        // refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    }


    // 导出api
    this.init = init;
    this.rotate = rotate;
    this.down = down;
    this.left = left;
    this.right = right;
    this.fall = function () {
        while (down());
    }
    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameOver = checkGameOver;
    this.setTime = setTime;
    this.addScore = addScore;
    this.gameOver = gameOver;
    this.addTailLines = addTailLines;
}