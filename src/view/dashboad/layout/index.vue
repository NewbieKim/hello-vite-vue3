<template>
  <div class="page-container1">
    <!-- <span>欢迎您，WORLD CODER</span> -->
    <div class="div1">
      <div class="a-container">A</div>
    </div>
  </div>
  <div class="page-container2">
    <div class="a-container">A</div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.page-container1 {
  display: flex;
  justify-content: center;
  margin: 0 10px;
  // width: 100%;
  height: 100%;
  .div1 {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 50%;
    background-color: rgb(77, 168, 243);
    .a-container {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
    }
  }
}
.page-container2 {
  position: relative;
  width: 100%;
  height: 100%;
  .a-container {
    margin: 0 10px;
    background-color: rgb(156, 226, 203);
    // width: calc(100vw - 20px);
    /* 宽度的一半 */
    height: calc(50vw - 10px);
  }
}
</style>