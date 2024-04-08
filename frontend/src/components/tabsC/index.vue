<template>
  <div class="tabs_wrap">
    <div
      :class="{
        tab_item: true,
        tab_item_active: index == activeIndex
      }"
      v-for="(item, index) in props.options"
      :key="index"
      @click="tabClick(index, item)"
    >
      <div class="icon">
        <!-- <img :src="joinIconUrlF(item.icon, index)" /> -->
        <IconC :tag="joinIconCTag(item.icon, index)"></IconC>
      </div>
      <div class="title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue"
export default defineComponent({
  name: "TabsC"
})
</script>
<script setup>
import IconC from "./iconC.vue"
import { playClickSound } from "../../utils/other.js"

const props = defineProps(["options"])

const emits = defineEmits(["setActiveItem"])

// active index
const activeIndex = ref(0)

// 选项点击事件
const tabClick = (index, item) => {
  playClickSound()
  activeIndex.value = index
  emits("setActiveItem", item)
}

// 拼接图片地址的函数
const joinIconCTag = (icon, index) => {
  return `${icon}${activeIndex.value == index ? "_a" : ""}`
}

onMounted(() => {
  console.log(props)
})
</script>

<style lang="scss" scoped>
.tabs_wrap {
  width: 100%;
  height: 140px;
  // border: 1px solid red;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0px 80px;
  background-color: rgba(0, 0, 0, 0.4);

  .tab_item {
    cursor: pointer;
    // transition: 0.3s;
    // border: 1px solid red;
    display: flex;
    flex-direction: column;
    width: 220px;
    text-align: center;
    padding: 22px 0px 0px 0px;
    color: white;

    .icon {
      img {
        width: 50px;
        height: 50px;
      }
    }

    .title {
      margin-top: 12px;
      font-size: 22px;
      font-family: SYHT-Bold;
      letter-spacing: 2px;
      margin-left: 6px;
    }
  }

  .tab_item:active {
    // background: rgba(0, 0, 0, 0.5);
  }

  .tab_item_active {
    color: #5aa7ee !important;
    font-family: SYHT-Bold;
  }
}
</style>
