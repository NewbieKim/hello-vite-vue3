<template>
  <div>
    <child @myClick="onMyClick" ref="comp" :girls="girls" :boys="boys" ></child>
    <el-button type="primary" @click="handleClick">zfc emit</el-button>
    <el-button type="primary" @click="mittClick">mittClick</el-button>
    <!-- <div>
      {{ menusStore.state.token }}
    </div> -->
    <!-- slot -->
    <div>
      <slotComp v-slot="slotProps">
        {{ slotProps.user.name }}
      </slotComp>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactivem, provide } from 'vue';
  import child from './child/index.vue';
  import slotComp from './child/slot.vue';
  import { useMenusStoreWithOut } from '@/store/modules/menus'
  import mittObject from './mitt';
  const comp = ref(null);
  // emit
  // expose
  const onMyClick = (msg) => {
    console.log(msg);
    console.log(comp.value.childAttr);
    comp.value.someMethods();
  };
  // atrr
  const girls = ref('001');
  const boys = ref('002');

  // zcf emit
  // const emit = defineEmits(["key","value"])
  // 用法 有误？？？
  const handleClick = () => {
    // emit("update:key", "新的key")
    // emit("update:value", "新的value")
  }
  // privide
  provide('name', 'chuhan')

  // vuex
  const menusStore = useMenusStoreWithOut();
  console.log('menusStore', menusStore)

  // mitt
  const mittClick = () => {
    mittObject.emit('handleChange');
  }
</script>

<style lang="scss" scoped>

</style>