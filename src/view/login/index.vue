<template>
  <div class="container">
    <el-form
      ref="formRef"
        label-position="right"
        class="ke-form"
        label-width="140px"
        :model="params"
        :rules="rules"
        size="medium"
      >
        <el-row>
          <el-col :span="20">
            <el-form-item label="邮箱" prop="email">
             <el-input v-model="params.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="密码" prop="password">
             <el-input v-model="params.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer ke-dialog-footer">
        <!-- <el-button @click="dialog.visible = false">取消</el-button> -->
        <el-button type="primary" :loading="loadingFlag" @click="handleLogin">登录</el-button>
      </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, unref, computed } from 'vue';
  // import { useUserStore } from '../../store/modules/user'
  import { useUserStore } from '@/store/modules/user';
  import { Base } from '../../utils/base';
  import { useRouter } from 'vue-router';
  // data contianer
  const userStore = useUserStore();
  const router = useRouter();
  const base = new Base()
  const loadingFlag = false;
  const formRef = ref(null);
  const params = reactive({
    email: '',
    password: ''
  })
  const rules = {
    email: [{ required: true, message: '请输入邮箱', trigger: 'change' }],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }]
  }
  // methods contianer
  async function handleLogin () {
    // let form = ref(null);
    // const form = unref(formRef);
    console.log(formRef);
    formRef.value.validate(async(valid: boolean) => {
      if (valid) {
        await userStore.Login(params).then((res: any) => {
          let data = res.data
          if (data.code === 1) {
            // 登录成功
            console.log('登录成功')
            base.win.msg('登录成功', 'success')
            // this.$router.go(0)
            router.push({
              path: '/'
            })
          } else {
            console.log('登录失败')
            base.win.msg('登录失败', 'error')
          }
        })
      }
    })
  }
</script>

<style lang="less" scoped>
.container {
  width: 50%;
  margin: 0 auto;
  button {
    color: black;
  }
}
</style>