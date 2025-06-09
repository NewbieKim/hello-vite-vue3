<template>
    <div>
        <h3>canvas page</h3>
        <canvas id="canvas"></canvas>
        <canvas id="canvas-g"></canvas>
        <canvas id="canvas-3d"></canvas>
    </div>
</template>
  
<script lang="ts" setup>
import { mapState, mapWritableState, storeToRefs } from 'pinia'
import { reactive, ref, unref, defineComponent, onMounted } from 'vue'
import { useRouter, onBeforeRouteUpdate } from 'vue-router';
const router = useRouter()

onMounted(() => {
    draw();
    drawLinearGradient();
    drawThreeQ();
})

const draw = () => {
  var canvas = document.getElementById("canvas");
  console.log('canvas', canvas.getContext("2d"));
  // 由于 getContext 是 HTMLCanvasElement 的属性，需要将 canvas 类型断言为 HTMLCanvasElement
  if (canvas instanceof HTMLCanvasElement && canvas.getContext) {
    // var ctx = canvas.getContext("2d");
    // ctx.beginPath();
    // ctx.moveTo(0, 45);
    // ctx.lineTo(100, 75);
    // ctx.lineTo(100, 25);
    // ctx.fill();
    
    // 笑脸
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false); // 口 (顺时针)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
    ctx.stroke();
  }
}

const drawLinearGradient = () => {
    const ctx = document.getElementById("canvas-g").getContext("2d");
    // 创建渐变
    const linGrad = ctx.createLinearGradient(20, 0, 0, 150); // 从左到右
    linGrad.addColorStop(0, "#00ABEB");
    linGrad.addColorStop(0.3, "#fff"); // 白色
    linGrad.addColorStop(0.5, "red"); //
    linGrad.addColorStop(0.7, "#26C000");
    linGrad.addColorStop(1, "#fff000"); // 黄色

    const linGrad2 = ctx.createLinearGradient(5, 50, 0, 5); // 表示渐变的起点 (x1,y1) 与终点 (x2,y2)。
    linGrad2.addColorStop(0.5, "#000");
    linGrad2.addColorStop(1, "rgb(0 0 0 / 0%)");

    // assign gradients to fill and stroke styles
    ctx.fillStyle = linGrad;
    ctx.strokeStyle = linGrad2;

    // 画图形
    ctx.fillRect(10, 10, 130, 130); // 填充矩形
    ctx.strokeRect(50, 50, 50, 50); // 描边矩形
}

const drawThreeQ = () => {
    var ctx = document.getElementById("canvas-3d").getContext("2d");
    // 创建渐变
    // createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，
    // 后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。
    var radgrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 60);
    radgrad.addColorStop(0, "#B7D300"); // 
    radgrad.addColorStop(0.5, "#019F62"); 
    radgrad.addColorStop(1, "rgba(1,159,98,0)");

    var radgrad2 = ctx.createRadialGradient(105, 105, 20, 112, 120, 50);
    radgrad2.addColorStop(0, "#FF5F98");
    radgrad2.addColorStop(0.85, "#FF0188");
    radgrad2.addColorStop(1, "rgba(255,1,136,0)");

    var radgrad3 = ctx.createRadialGradient(95, 15, 15, 102, 20, 40);
    radgrad3.addColorStop(0, "#00C9FF");
    radgrad3.addColorStop(0.8, "#00B5E2");
    radgrad3.addColorStop(1, "rgba(0,201,255,0)");

    var radgrad4 = ctx.createRadialGradient(0, 150, 50, 0, 140, 80);
    radgrad4.addColorStop(0, "#F4F201");
    radgrad4.addColorStop(0.8, "#E4C700");
    radgrad4.addColorStop(1, "rgba(228,199,0,0)");

    // 画图形
    ctx.fillStyle = radgrad4;
    ctx.fillRect(0, 0, 250, 250);// 填充矩形
    ctx.fillStyle = radgrad3;
    ctx.fillRect(0, 0, 250, 250);// 填充矩形
    ctx.fillStyle = radgrad2;
    ctx.fillRect(0, 0, 250, 250);// 填充矩形
    ctx.fillStyle = radgrad;
    ctx.fillRect(0, 0, 250, 250);// 填充矩形
}

</script>
  
<style lang="scss" scoped>
</style>