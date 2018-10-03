<template>
  <div id="booklists">
    <el-row>
      <h3>图书列表</h3>
    </el-row>
    <el-row>
      <el-table :data="booklists" border style="width: 100%">
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="remove(scope.row.id)"> 移除 </el-button>
            <router-link :to="{name: 'bookView', params: {id: scope.row.id}}" style="padding-left:10px;">
              <el-button type="success" size="mini"> 查看 </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row v-if="booklists.length">
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>
<script>
  import {
    getBooks,
    removeBook
  } from '@/api'
  export default {
    name: 'booklists',
    data() {
      return {
        booklists: [],
        total: 0,
      }
    },
    async created() {
      await this.getlists();
    },
    methods: {
      async remove(id) {
        removeBook(id);
        await this.getlists();
      },
      async getlists() {
        const options = {
          query: {
            page: this.$route.query.page || 1,
            limit: 10,
          }
        }
        const res = await getBooks(options);
        if (res.data) {
          this.total = res.data.count || 0;
          this.booklists = res.data.rows || [];
        }
      }
    }
  }
</script>