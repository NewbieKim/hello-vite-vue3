<template>
  <div>
    <SliderBar class="sidebar-container" />
    <div class="main-container">
      <el-scrollbar
        class="main-scrollbar-wrapper"
        wrap-class="main-scrollbar-wrapper"
      >
        <AppMain />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import AppMain from './component/AppMain.vue'
import SliderBar from './component/SliderBar/index.vue'
import { reactive, ref, unref, defineComponent } from 'vue'
export default defineComponent ({
  name: 'Layout',
  components: {
    AppMain,
    SliderBar
  },
  setup () {}
})
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  transition: margin-left .28s;
  margin-left: 20px;
  position: relative;
  background: #f6f7f9;
  padding-top: 40px;
}
.sidebar-container {
  transition: width 0.28s;
  width: 160px;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
</style>