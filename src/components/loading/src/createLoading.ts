// 创建一个页面：相当于遮罩层
import { VNode, defineComponent } from "vue";

export interface LoadingProps {
  tip: string;
  size: number;
  absolute: boolean;
  loading: boolean;
  background: string;
  theme: 'dark' | 'light';
}