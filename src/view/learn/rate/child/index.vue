<template>
  <div>
    <div :style="fontStyle" style="font-size: 24px; cursor: pointer">{{ rate }}</div>
    <div :style="fontStyle">
      <div @mouseout="mouseOut" class="rate">
        <span v-for="num in 5" :key="num" @mouseover="mouseOver(num)">☆</span>
        <span class="notSelect" :style="fontWidth">
          <span v-for="num in 5" :key="num" @mouseover="mouseOver(num)">★</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps,computed } from 'vue';
  let prop = defineProps({
    value: Number,
    theme: {
      type: String,
      default: 'green'
    }
  })
  let width = ref(prop.value)
  let rate = computed(() => {
    return '★★★★★☆☆☆☆☆'.slice(5 - prop.value, 10 - prop.value)
  })
  const themeObj = {
    'black': '#000',
    'green': '#73d13d',
    'blue': '#40a9ff',
  }
  const fontStyle = computed(() => {
    return `color:${themeObj[prop.theme]};`
  })
  const fontWidth = computed(()=> {
    return `width:${width.value}em;`
  })
  const mouseOut = () => {
    width.value = prop.value
    console.log(width)
  }
  const mouseOver = (i: number) => {
    console.log('num', i)
    width.value = i
  }
</script>

<style lang="scss" scoped>
.rate {
  font-size: 24px;
  cursor: pointer;
  position:relative;
  display: inline-block;
}
.rate > span.hollow { position:absolute; display: inline-block; top:0; left:0; width:0; overflow:hidden;}
</style>