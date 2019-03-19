let getCanvas = (r, cirWidth, minWind, maxWind, nowWInd, onlinestate, errs) =>{
    var cirMin = 0.75;
    var cirMax = ((2.25 - 0.75) * nowWInd) / (maxWind - minWind) + 0.75;
    var x1 = r * Math.cos(cirMax * Math.PI);
    var y1 = r * Math.sin(cirMax * Math.PI);
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    // 背景
    var canvasX = canvas.width;
    var canvasY = canvas.height;
    ctx.beginPath();
    ctx.save();
    ctx.clearRect(0, 0, canvasX, canvasY); // 清除画布
    // ctx.fillStyle = "#0082FF";
    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.fillRect(0, 0, 250, 250);
    // -- 背景圆
    ctx.beginPath();
    ctx.translate(canvasX / 2, canvasY / 2);
    ctx.lineWidth = cirWidth;
    ctx.strokeStyle = onlinestate === 0 ? '#6B7A93' : '#048FEB';
    ctx.arc(0, 0, r, cirMin * Math.PI, 2.25 * Math.PI, false);
    ctx.stroke();
    // -- 范围
    // ===== min
    ctx.beginPath();
    var leftxX1 = (r - cirWidth / 2) * Math.cos(0.735 * Math.PI);
    var leftyY1 = (r - cirWidth / 2) * Math.sin(0.735 * Math.PI);
    var leftxX2 = (r + cirWidth * 2) * Math.cos(0.735 * Math.PI);
    var leftyY2 = (r + cirWidth * 2) * Math.sin(0.735 * Math.PI);
    ctx.moveTo(leftxX1, leftyY1);
    ctx.lineTo(leftxX2, leftyY2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.stroke();
    // 字体
    ctx.beginPath();
    ctx.font = 'normal 14px Arical';
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(minWind, leftxX2 - 20, leftyY2 + 5);
    ctx.font = 'normal 8px Arical';
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText('℃', leftxX2 - 10, leftyY2 + 5);
    // ===== max
    ctx.beginPath();
    var rightxX1 = (r - cirWidth / 2) * Math.cos(2.265 * Math.PI);
    var rightyY1 = (r - cirWidth / 2) * Math.sin(2.265 * Math.PI);
    var rightxX2 = (r + cirWidth * 2) * Math.cos(2.265 * Math.PI);
    var rightyY2 = (r + cirWidth * 2) * Math.sin(2.265 * Math.PI);
    ctx.moveTo(rightxX1, rightyY1);
    ctx.lineTo(rightxX2, rightyY2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.stroke();
    // 字体
    ctx.beginPath();
    ctx.font = 'normal 14px Arical';
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(maxWind, rightxX2 + 10, rightyY2 + 5);
    ctx.font = 'normal 8px Arical';
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText('℃', rightxX2 + 25, rightyY2 + 5);
    // ==== 当前温度
    ctx.font = 'normal 14px Arical';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText('当前温度', 0, rightyY2 + 5);
    // 显示温度
    ctx.font = 'normal 60px Arical';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    // console.log("nowWInd===========", typeof nowWInd == 'undefined');
    if (nowWInd !== 0 && typeof nowWInd !== 'undefined' && onlinestate === 1 && errs != 1) {
        ctx.fillText(nowWInd, 0, 0);
    } else {
        ctx.fillText('--', 0, 0);
    }
    ctx.font = 'normal 14px Arical';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(
        '℃',
        (r - cirWidth * 3) * Math.cos(1.75 * Math.PI),
        (r - cirWidth * 5) * Math.sin(1.75 * Math.PI)
    );
    // 显示进度
    if (nowWInd !== 0 && typeof nowWInd !== 'undefined' && onlinestate === 1 && errs != 1) {
        ctx.beginPath();
        ctx.lineWidth = cirWidth + 1;
        ctx.strokeStyle = '#fff';
        ctx.arc(0, 0, r, cirMin * Math.PI, cirMax * Math.PI, false);
        ctx.stroke();
        // }
        // 显示圆
        // if (nowWInd !== 0 && typeof nowWInd !== 'undefined' && onlinestate === 1 && errs != 1) {
        ctx.beginPath();
        ctx.arc(x1, y1, 15, 0, Math.PI * 2, false);
        ctx.fillStyle = '#fff';
        ctx.fill();
    }
    ctx.restore();
}
export default {
    getCanvas
}