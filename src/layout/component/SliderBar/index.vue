<template>
  <div class="sliderBar-container">
    <div class="el-logo">
      <!-- <img
        src="../../../pubilc/favicon.ico"
        style="margin-bottom: 10px;margin-top: 10px;margin-right:10px;width:30px;"
      > -->
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          default-active="2"
          :collapse="false"
          :unique-opened="true"
          :background-color="'#ffffff'"
        >
          <el-menu-item index="1">
            <i class="el-icon-location"></i>
            <router-link to="/">
              Navigator Index
            </router-link>
            <!-- <el-menu-item-group>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item one</el-menu-item>
            </el-menu-item-group> -->
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <router-link to="/about">
              Navigator About
            </router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <router-link to="/login">
              Navigator Login
            </router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <router-link to="/system">
              Navigator System
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
  </div>
</template>

<script>
import { reactive, ref, unref, defineComponent } from 'vue'
export default defineComponent ({
  name: 'SliderBar',
  setup() {
    //
  }
})
</script>

<style lang="scss" scoped>
.sliderBar-container {
  width: 160px;
  float: left;
  .el-scrollbar {
    height: calc(100% - 79px);
  }
  .el-logo {
    /* height: 65px; */
    padding: 0 3px;
    display: flex;
    height: 80px;
    // flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(48, 65, 86);
    // padding-bottom: 15px;
    span {
      height: 16px;
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>
