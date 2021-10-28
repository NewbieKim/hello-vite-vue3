<template>
  <div>
    <p>
      当前权限角色：
    </p>
    <div>
      <div>指令方式方式判断权限(该方式不能动态修改权限.)</div>
      <el-row justify="center">
        <el-col :span="6">
          <!-- <el-button v-auth="RoleEnum.SUPER" type="primary">拥有admin权限</el-button>
          <el-button v-auth="RoleEnum.TEST" type="primary">test</el-button>
          <el-button v-auth="[RoleEnum.SUPER, RoleEnum.TEST]" type="primary">拥有admin test权限</el-button> -->
        </el-col>
      </el-row>
    </div>
    <div>
      <div>函数方式方式判断权限(适用于函数内部过滤)</div>
      <el-row justify="center">
        <el-col :span="6">
          <el-button v-if="hasPermission(RoleEnum.SUPER)" type="primary">拥有admin权限</el-button>
          <el-button v-if="hasPermission(RoleEnum.TEST)" type="primary">test</el-button>
          <el-button v-if="hasPermission([RoleEnum.SUPER, RoleEnum.TEST])" type="primary">拥有admin test权限</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { RoleEnum  } from '../../../enums/roleEnum';
  import { usePermission } from '../../../hooks/web/usePermission';
  const { hasPermission } = usePermission();
</script>

<style lang="scss" scoped>

</style>