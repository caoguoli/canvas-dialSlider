let getCanvas = (min_wind, max_wind, canvasWind, now_wind, online,cirCon) => {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.save();
    ctx.clearRect(0, 0, canvas_X, canvas_Y); // 清除画布



    var pageX = document.body.clientWidth;
    canvas.width = pageX * 0.6;
    canvas.height = pageX * 0.6;


    // var backingStore = ctx.backingStorePixelRatio ||
    //     ctx.webkitBackingStorePixelRatio ||
    //     ctx.mozBackingStorePixelRatio ||
    //     ctx.msBackingStorePixelRatio ||
    //     ctx.oBackingStorePixelRatio ||
    //     ctx.backingStorePixelRatio || 1;

    // var ratio = (window.devicePixelRatio || 1) / backingStore;

    canvas.style.width = pageX * 0.6 + 'px';
    canvas.style.height = pageX * 0.6 + 'px';
    canvas.width = pageX * 0.6 * 2;
    canvas.height = pageX * 0.6 * 2;
    // 放大倍数
    ctx.scale(2, 2);



    let r = pageX * 0.6 / 2 * 0.8;
    let cirWidth = r / 7;
    var cirMin = 0.75;
    var canvasWind = canvasWind >= min_wind && canvasWind <= max_wind ? canvasWind : (canvasWind < min_wind ? min_wind : max_wind);
    var cirMax = (2.25 - 0.75) * (canvasWind - min_wind) / (max_wind - min_wind) + 0.75;
    var x1 = r * Math.cos(cirMax * Math.PI);
    var y1 = r * Math.sin(cirMax * Math.PI);
    var xiaoyuanX = Math.ceil(pageX * 0.6 / 2 + x1);
    var xiaoyuanY = Math.ceil(pageX * 0.6 / 2 + y1);
    var canvas_X = pageX * 0.6;
    var canvas_Y = pageX * 0.6;


    // 静态显示
    // -- 背景圆
    ctx.beginPath();
    ctx.translate(canvas_X / 2, canvas_Y / 2);
    ctx.lineWidth = cirWidth;
    // ctx.strokeStyle = "#048FEB";
    ctx.strokeStyle = online == '开机' ? '#048FEB' : '#6B7A93';
    ctx.arc(0, 0, r, cirMin * Math.PI, 2.25 * Math.PI, false);
    ctx.stroke();
    // -- 范围
    // ===== min
    ctx.beginPath();
    var leftX_x1 = (r - cirWidth / 2) * Math.cos(0.735 * Math.PI);
    var leftY_y1 = (r - cirWidth / 2) * Math.sin(0.735 * Math.PI);
    var leftX_x2 = (r + cirWidth * 2) * Math.cos(0.735 * Math.PI);
    var leftY_y2 = (r + cirWidth * 2) * Math.sin(0.735 * Math.PI);
    ctx.moveTo(leftX_x1, leftY_y1);
    ctx.lineTo(leftX_x2, leftY_y2);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.stroke();
    // 字体
    ctx.beginPath();
    ctx.font = "normal 14px Arical";
    ctx.fillStyle = "#fff"
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillText(min_wind, leftX_x2 - 20, leftY_y2 + 5);
    ctx.font = "normal 8px Arical";
    ctx.fillStyle = "#fff"
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillText("℃", leftX_x2 - 6, leftY_y2 + 5);

    // ===== max
    ctx.beginPath();
    var rightX_x1 = (r - cirWidth / 2) * Math.cos(2.265 * Math.PI);
    var rightY_y1 = (r - cirWidth / 2) * Math.sin(2.265 * Math.PI);
    var rightX_x2 = (r + cirWidth * 2) * Math.cos(2.265 * Math.PI);
    var rightY_y2 = (r + cirWidth * 2) * Math.sin(2.265 * Math.PI);
    ctx.moveTo(rightX_x1, rightY_y1);
    ctx.lineTo(rightX_x2, rightY_y2);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.stroke();

    // 字体
    ctx.beginPath();
    ctx.font = "normal 14px Arical";
    ctx.fillStyle = "#fff"

    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillText(max_wind, rightX_x2 + cirWidth, rightY_y2 + 5);
    ctx.font = "normal 8px Arical";
    ctx.fillStyle = "#fff"
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillText("℃", rightX_x2 + 26, rightY_y2 + 5);
    // ==== 当前温度
    ctx.font = "normal 14px Arical";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillText("当前温度", 0, rightY_y2 + 5);
    let xiaoyuanR;

    // 显示温度
    ctx.font = "bold 60px Arical";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    if (now_wind != 0 && typeof (now_wind) != 'undefined' && online == '开机') {
        ctx.fillText(now_wind, 0, 0);
    } else {
        ctx.fillText("--", 0, 0);
    }
    ctx.font = "normal 14px Arical";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillText("℃", (r - cirWidth * 1.5) * Math.cos(1.75 * Math.PI), (r - cirWidth * 3) * Math.sin(1.75 * Math.PI));
    // 显示进度

    if (online == '开机') {
        ctx.beginPath();
        ctx.lineWidth = cirWidth + 1;
        ctx.strokeStyle = "#fff";
        ctx.arc(0, 0, r, cirMin * Math.PI, cirMax * Math.PI, false);
        ctx.stroke();
        // 小球
        xiaoyuanR = cirWidth * 0.9;
        if (canvasWind >= 16 && typeof (canvasWind) != 'undefined' && cirCon == false) {
            ctx.beginPath();
            ctx.arc(x1, y1, cirWidth * 0.9, 0, Math.PI * 2, false);
            ctx.fillStyle = "#fff";
            ctx.fill();
        } else {
            canvasWind = 16;
        }
    }
    ctx.restore();
    let obj = { r, xiaoyuanX, xiaoyuanY, xiaoyuanR, canvasWind, x1, y1 }
    return obj;
}

let startClick = (xiaoyuanX, xiaoyuanY, xiaoyuanR) => {

    var canvas = document.getElementById("canvas");
    var x = event.touches[0].pageX - canvas.getBoundingClientRect().left;
    var y = event.touches[0].pageY - canvas.getBoundingClientRect().top;
    var obj = {}

    if (Math.abs(xiaoyuanX - x) > xiaoyuanR || Math.abs(xiaoyuanY - y) > xiaoyuanR) {
        obj.x = -1; 1
        obj.y = -1;
    } else {
        obj.x = x;
        obj.y = y;
    }
    return obj;
}

let moveClick = (x1, y1, xiaoyuanX, xiaoyuanY, canvasWind, startWind, xiaoyuanR,cirCon, min, max) => {

    var canvas = document.getElementById("canvas");
    // canvas.width = document.body.clientWidth * 0.6;
    // canvas.height = document.body.clientWidth * 0.6;
    //标准的获取鼠标点击相对于canvas画布的坐标公式

    var x2 = event.touches[0].pageX - canvas.getBoundingClientRect().left;
    var y2 = event.touches[0].pageY - canvas.getBoundingClientRect().top;

    if (Math.abs(xiaoyuanX - x2) - xiaoyuanR > 5 || Math.abs(xiaoyuanY - y2) - xiaoyuanR > 5) {
        return
    }
    var canvasData;
    var mind = ((max - min) / 2 - (canvasWind - min)) < 0 ? -1 : 1;
    if (mind != 0 && (canvasWind < (32 - 16) / 4 + 16 || canvasWind > (32 - 16) / 4 * 3 + 16)) {

        if ((y2 - y1) * mind < 0) {
            // 添加
            canvasWind = canvasWind + 1 <= max ? canvasWind + 1 : max;
            canvasData = getCanvas(16, 32, canvasWind, startWind, '开机',cirCon);
            console.log('--------------------------------  添加')
        } else if ((y2 - y1) * mind > 0) {
            // 减少
            console.log('--------------------------------  减少')
            canvasWind = canvasWind - 1 >= min ? canvasWind - 1 : min;
            canvasData = getCanvas(16, 32, canvasWind, startWind, '开机',cirCon);
        }
    } else {
        // 中间
        if (x2 - x1 > 0) {
            console.log('--------------------------------  添加')
            canvasWind = canvasWind + 1 <= max ? canvasWind + 1 : max;
            canvasData = getCanvas(16, 32, canvasWind, startWind, '开机',cirCon);
        } else if (x2 - x1 < 0) {
            console.log('--------------------------------  减少')
            canvasWind = canvasWind - 1 >= min ? canvasWind - 1 : min;
            canvasData = getCanvas(16, 32, canvasWind, startWind, '开机',cirCon);
        }
    }
    var x1 = x2;
    var y1 = y2;
    var obj = { canvasData, x1, y1, canvasWind }
    return obj;
}

export default {
    getCanvas, startClick, moveClick
}