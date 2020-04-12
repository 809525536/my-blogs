<template>
  <div class="marked-box">
    <div class="top">
      <h1 class="title">{{title}}</h1>
      <div v-html="essayRes"></div>
    </div>
    <div class="comment-box">
      <div class="pl">评论</div>
      <el-form class="comment-form">
        <div class="com-top">
          <div class="logo">
            <img :src="userInfo.img" />
          </div>
          <el-form-item class="inp">
            <el-input v-model="comment" placeholder="输入评论..."></el-input>
          </el-form-item>
        </div>
        <el-form-item class="btn-right">
          <el-button type="primary" size="mini" @click="submit">发表</el-button>
        </el-form-item>
      </el-form>
      <div class="comment-list">
        <div class="comment-info" v-for="(item,index) in commentInfo" :key="index">
          <div class="logo">
            <img :src="item.img" />
          </div>
          <div class="comment-right">
            <div class="comment-name">{{item.name}}</div>
            <div class="comment-txt">{{item.comment}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
import { mapActions } from "vuex";

export default {
  async asyncData(context) {
    try {
      const _this = context;
      const { id } = _this.route.params;
      const result = await _this.$axios.get("getaEssay", {
        params: {
          id: id
        }
      });
      const { data } = result;
      const { res = {} } = data;
      const { content = "", title = "" } = res;
      const rendererMD = new marked.Renderer();
      marked.setOptions({
        renderer: rendererMD,
        highlight: function(code) {
          console.log(code);
          return hljs.highlightAuto(code).value;
        },
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      }); //基本设置
      const markedEssay = marked(content);
      const commentInfo = await _this.$axios.post("getComment", {
        essayId: id
      });
      console.log(commentInfo);
      return {
        essayRes: markedEssay,
        title,
        commentInfo: commentInfo.data.list
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      essayRes: {},
      title: "",
      comment: "",
      commentInfo: []
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.info;
    }
  },
  async mounted() {},
  methods: {
    async submit() {
      console.log(this.comment);
      const essayId = this.$route.params.id;
      const { id, img, account, name } = this.$store.state.user.info;
      if (!this.comment) {
        this.$message.error("您还没有写评论哦");
        return;
      }
      const res = await this.$axios.post("creatComment", {
        comment: this.comment,
        uid: id,
        img,
        account,
        essayId,
        name
      });
      if (res.errCode == 2000) {
        const commentInfo = await this.$axios.post("getComment", {
          essayId: essayId
        });
        if (res.errCode == 2000) {
          this.commentInfo = commentInfo.data.list;
        }
      }
      console.log(res);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/makd.less";
</style>
<style lang="less" scoped>
.marked-box {
  height: 100%;
}

.top {
  overflow: hidden;
  padding: 0 30px;
  background: #fff;
  min-height: 90%;
}

.marked-box .title {
  font-weight: bold;
  font-size: 30px;
}

.comment-box {
  margin-top: 20px;
  background: #fff;
  min-height: 6%;
  padding-bottom: 20px;
  .pl {
    color: #8a9aa9;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    padding-top: 20px;
  }
  .comment-form {
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    background-color: #fafbfc;
    border-radius: 3px;
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
  }
  .com-top {
    display: flex;
    position: relative;
  }
  .inp {
    flex: 1;
    margin-bottom: 0;
  }
  .logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    background: #8a9aa9;
    margin-right: 20px;
    margin-top: 5px;
    img {
      width: 100%;
      height: auto;
      border-radius: 50%;
    }
  }
  .btn-right {
    text-align: right;
  }
  .comment-list {
    width: 80%;
    margin: 0 auto;
  }
  .comment-info {
    display: flex;
    & > .logo {
      margin-top: 36px;
    }
  }
  .comment-right {
    flex: 1;
    border-bottom: 1px solid #f1f1f1;
    padding: 20px;
  }
  .comment-txt {
    margin-top: 10px;
  }
}
</style>
