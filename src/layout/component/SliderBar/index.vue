<template>
  <div>
    <div class="sliderBar-container">
    <div class="el-logo">
      <div
        style="margin-bottom: 10px;margin-top: 10px;margin-right:10px;width:30px;color: red"
        @click="loginOut"
      >退登</div>
    </div>
    <!-- 循环构建菜单 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          default-active="2"
          :collapse="isCollapse"
          :unique-opened="true"
          :background-color="'#ffffff'"
        >
          <barItem
            v-for="data in menus"
            :key="data.url"
            :item="data"
            :base-path="data.url || ''"
            :is-collapse="isCollapse"
          />
        </el-menu>
      </el-scrollbar>
  </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, unref, defineComponent } from 'vue'
  import { useMenusStore } from '@/store/modules/menus'
  import { getMenus } from '@/router/menus';
  import barItem from './barItem.vue'
  import { useUserStore } from '@/store/modules/user';
  let isCollapse = false;
  let menusMock = [
        {
          path: '/system',
          name: 'System',
          component: '',
          redirect: '/system/rolesManage',
          meta: {
            orderNo: 10,
            title: '系统管理',
            icon: 'el-icon-setting'
          },
          children: [
            {
              path: 'rolesManage',
              name: 'RolesManage',
              component: () => import('@/view/system/rolesManage/index.vue'),
              meta: {
                title: '角色管理',
                keepAlive: true
              }
            },
            {
              path: 'rolesDetails/:userId',
              name: 'RolesDetails',
              component: () => import('@/view/system/rolesManage/details.vue'),
              // props: { default: true },
              meta: {
                title: '角色详情',
                keepAlive: true
              }
            }]
        },
        {
          path: '/permissions',
          name: 'Permissions',
          component: '',
          redirect: '/permissions/permissionsManage',
          meta: {
            orderNo: 100,
            title: '权限管理',
            icon: 'el-icon-menu'
          },
          children: [
            {
              path: 'permissionsManage',
              name: 'PermissionsManage',
              component: () => import('@/view/permissionsManage/index.vue'),
              meta: {
                title: '权限管理',
                keepAlive: true,
                icon: ''
              }
            }
          ]
        }
  ]
  let menus = reactive(menusMock)
  let useStore = useUserStore();
  async function loginOut () {
    await useStore.LoginOut()
    return
  }
  // const menusStore = useMenusStore();
  // // console.log('menus-store', menusStore.menus);
  // async function queryMenus () {
  //     try {
  //       const data = await menusStore.getMenus();
  //       let menusMock = reactive(data.data.data);
  //       console.log('data', data)
  //       if (data) {
  //         console.log('data', data)
  //       }
  //       debugger
  //       return menusMock
  //     } catch {}
  // }
  // let menus = setTimeout(() => {
  //   reactive(queryMenus())
  // }, 1000)
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
