<template>
  <div id="view">
    <el-row>
      <h4>{{book.name}}</h4>
    </el-row>
    <el-row>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="basic">
          <p v-if="book.author">{{book.author}}</p>
          <p v-if="book.publisher">{{book.publisher}}</p>
          <p v-if="book.resource"><a :href="book.resource_url">{{book.resource}}</a></p>
          <p v-if="book.description">{{book.description}}</p>
          <el-col style="text-align:right;">
            <el-button type="primary" size="mini">返回</el-button>
            <el-button type="success" size="mini">编辑</el-button>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="目录管理" name="chapters">
          <el-table :data="chapters" border style="width: 100%">
            <el-table-column label="序号" width="140">
              <template slot-scope="scope">
                <el-input v-model="scope.row.order" placeholder="序号"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.title" placeholder="名称"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="240">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="removeChapter(scope.row)">删除</el-button>
                <el-button type="success" size="mini" @click="saveChapter(scope.row)">保存</el-button>
                <el-button type="info" size="mini" @click="viewPaper(scope.row, true)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="文章管理" name="paper" disabled>
          <el-row>
            <h4>{{currentChapter.title}}</h4>
          </el-row>
          <el-row>
            <div id="editor"></div>
          </el-row>
          <el-row style="margin-top: 20px; text-align:right;">
            <el-button type="warning" size="mini" @click="goBack()">取消</el-button>
            <el-button type="danger" size="mini" @click="removePaper()" v-if="paper.id">删除</el-button>
            <el-button type="success" size="mini" @click="savePaper()">保存</el-button>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<script>
  import {
    getBook,
    getChapters,
    createChapter,
    updateChapter,
    deleteChapter,
    getPaper,
    createPaper,
    updatePaper,
    deletePaper
  } from '@/api'
  
  export default {
    name: 'bookView',
    data() {
      return {
        book: {},
        chapters: [],
        activeName: 'chapters',
        currentChapter: {},
        paper: {},
        editor: {},
      };
    },
    async created() {
      await this.queryBook();
      await this.queryChapters();

      // 引用
      var E = require('wangeditor')  // 使用 npm 安装
      this.editor = new E('#editor')
      this.editor.create()

    },
    methods: {
      async queryBook() {
        const res = await getBook(this.$route.params.id);
        if (res.data) {
          this.book = res.data;
        }
      },
      async queryChapters() {
        const res = await getChapters(this.$route.params.id);
        if (res.data) {
          this.chapters = res.data;
        }
        this.chapters.push({})
      },
      async saveChapter(row) {
        if (!row.order || !row.title) return;
        if (!row.id) {
          row.book = this.$route.params.id;
          await createChapter(row);
          await this.queryChapters();
          return;
        }
        await updateChapter(row);
        await this.queryChapters();
      },

      async removeChapter(row) {
        if (!row.id) {
          this.chapters[this.chapters.length] = {};
          return;
        }
        await deleteChapter(row);
        await this.queryChapters();
      },

      async viewPaper(chapter) {
        if (!chapter.id) return;
        this.activeName = 'paper';
        this.currentChapter = chapter;
        this.paper = {};
        const res = await getPaper(chapter);
        if (res.data) {
          this.paper = res.data;
        }
        this.editor.txt.html(this.paper.content ||'');
      },

      async removePaper() {
        if (!this.paper.id) return;
        await deletePaper(this.currentChapter);
        await this.viewPaper(this.currentChapter);
      },

      goBack() {
        window.history.back();
      },

      async savePaper() {
        this.paper.content = this.editor.txt.html();
        this.paper.book = this.currentChapter.book;
        this.paper.chapter = this.currentChapter.id;
        this.paper.state = 10;

        if(this.paper.id) {
          await updatePaper(this.paper);
          return;
        }
        await createPaper(this.paper);
        await this.viewPaper(this.currentChapter);
      },
    },
  }
</script>