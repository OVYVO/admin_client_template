import { createVNode } from 'vue'
import * as $Icon from '@ant-design/icons-vue'

export const AIcon = (props: { type: string }) => {
  const { type } = props
  const antIcon: { [key: string]: any } = $Icon
  return createVNode(antIcon[type])
}
