import Vue from 'vue';
import { Base } from './utils/base';

// declare声明宣告， 声明一个ambient module(即:没有内部实现的 module声明)
// declare module "vue" {
//   interface Vue {
//     $base: Base;
//   }
// }
declare module "@vue/runtime-core" {
  // @ts-ignore
  interface ComponentCustomProperties<T> {
    $base: Base;
  }
}
