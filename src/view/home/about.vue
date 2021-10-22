<template>
  <div>
      <el-row justify="center">
        <el-col :span="2">
          <el-input v-model="form.name"></el-input>
          <el-input v-model="form.age"></el-input>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import { reactive, ref, unref, defineComponent } from 'vue'
export default defineComponent({
  name: 'About1',
  setup() {
    const form = reactive({ name: '', age: 20 });
    return {
      form
    }
  }
})
</script>

<style lang="sass" scoped>

</style>