import { defineComponent, h } from "vue";
export default defineComponent({
  props: {
    level: {
      type: number,
      required: true
    }
  },
  setup(props, {slots}) {
    return () => h(
      'h' + props.level,
      {},
      slots.default()
    )
  }
})