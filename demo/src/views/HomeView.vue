<template>
  <el-radio-group v-model="labelPosition" label="label position">
    <el-radio-button label="left">Left</el-radio-button>
    <el-radio-button label="right">Right</el-radio-button>
    <el-radio-button label="top">Top</el-radio-button>
  </el-radio-group>
  <div style="margin: 20px" />
  <el-form
    :label-position="labelPosition"
    label-width="100px"
    :model="formLabelAlign"
    style="max-width: 460px"
  >
    <el-form-item label="用户名">
      <el-input v-model="formLabelAlign.name" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formLabelAlign.password" />
    </el-form-item>
    <el-form-item label="验证码">
      <div style="display:flex">
        <el-input v-model="formLabelAlign.code" />
        <img @click="resetCode" :src=codeUrl alt="" />
      </div>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
const api = 'http://localhost:3000'

const labelPosition = ref('right')

const codeUrl = ref<string>(api + '/user/code')

// eslint-disable-next-line no-return-assign
const resetCode = () => codeUrl.value = codeUrl.value + '?' + Math.random()

const formLabelAlign = reactive({
  name: '',
  password: '',
  code: ''
})

const submit = async () => {
  fetch(api + '/user/create', {
    method: 'post',
    body: JSON.stringify(formLabelAlign),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json()).then(res => {
    console.log(res)
  })
}
</script>
