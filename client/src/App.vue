<template>
  <div id="app">
    <el-container class="container">
      <el-aside width="200px" class="side">
        <el-row style="text-align:center;">
          <h2>书籍管理</h2>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-menu class="el-menu-vertical-demo" default-active="1" :default-openeds="['1']" :router="true">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>图书</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" :route="{name: 'booklists'}">图书列表</el-menu-item>
                  <el-menu-item index="1-2" :route="{name: 'bookcreate'}">新建图书</el-menu-item>
                  <el-menu-item index="1-2">归档图书</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    font-family: "Microsoft YaHei", Arial, sans-serif;
  }

  a:link {
    text-decoration: none;
    cursor: pointer;
  }

  a:visited {
    text-decoration: none;
    cursor: pointer
  }

  a:active {
    text-decoration: none;
    cursor: pointer
  }

  a:hover {
    text-decoration: none;
    cursor: pointer
  }

  .side {
    border-right: solid gainsboro;
    background-color: #fafafa;
    padding-left: 5px;
    overflow-x: hidden !important;
  }

  .container {
    height: 100vh;
  }

  .b-b {
    border-bottom: solid 1px #ccc;
  }
</style>