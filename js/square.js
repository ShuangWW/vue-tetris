var Square = function () {
    // 方块数据
    this.data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    // 方块原点
    this.origin = {
        x: 0,
        y: 0
    };
    // 方向 
    this.dir = 0;
}

// 旋转
Square.prototype.canRotate = function (isValid) {
    var d =  (this.dir + 1) % 4;
    return isValid(this.origin,this.rotates[d])
}
Square.prototype.rotate = function (num) {
    if(!num) num = 1;
    this.dir = (this.dir + num) % 4;        // 取余
    this.data = this.rotates[this.dir]
}

// 下降
Square.prototype.canDown = function (isValid) {
    var test = {};
    test.x = this.origin.x + 1;
    test.y = this.origin.y;
    return isValid(test, this.data)
}
Square.prototype.down = function () {
    this.origin.x = this.origin.x + 1;
}

// 向左
Square.prototype.canLeft = function (isValid) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y - 1;
    return isValid(test, this.data)
}
Square.prototype.left = function () {
    this.origin.y = this.origin.y - 1;
}

// 向右
Square.prototype.canRight = function (isValid) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y + 1;
    return isValid(test, this.data)
}
Square.prototype.right = function () {
    this.origin.y = this.origin.y + 1;
}