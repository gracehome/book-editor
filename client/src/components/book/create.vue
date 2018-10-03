<template>
  <div id="create">
    <el-row>
      <h3>图书创建</h3>
    </el-row>
    <el-row>
      <el-form :model="book" label-width="80px" :rules="rules">
        <el-form-item label="图书名称">
          <el-input v-model="book.name"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="book.author"></el-input>
        </el-form-item>
        <el-form-item label="图书来源">
          <el-input v-model="book.resource"></el-input>
        </el-form-item>
        <el-form-item label="来源url">
          <el-input v-model="book.resource_url"></el-input>
        </el-form-item>
        <el-form-item label="出版商">
          <el-input v-model="book.publisher"></el-input>
        </el-form-item>
        <el-form-item label="出版日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="book.publish_date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="图书简介" prop="desc">
          <el-input type="textarea" v-model="book.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="back">取消</el-button>
          <el-button type="success" @click="create">创建</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>
<script>
  import {
    createBook
  } from '@/api'
  export default {
    name: 'bookcreate',
    data() {
      return {
        book: {
          name: '',
          author: '',
          publisher: '',
          publish_date: new Date(),
          resource: '',
          resource_url: '',
          description: '',
        },
        rules: {
          title: [{
            required: true
          }, {
            min: 2
          }]
        }
      }
    },
    methods: {
      back() {
        window.history.back();
      },
      async create() {
        if (!this.book.name) {
          const h = this.$createElement; 
          this.$notify({
            title: '图书信息错误',
            message: h('i', {
              style: 'color: teal'
            }, '请输入正确的图书信息')
          });
          return;
        }
        const res = await createBook(this.book);
        if (res.data && res.data.id) {
          this.$router.push({
            name: 'bookView',
            params: {
              id: res.data.id
            }
          })
        }
      }
    }
  }
</script>