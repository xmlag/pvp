<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuth()"
              :show-file-list="false"
              :on-success="res => model.avatar=res.url"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="Banner">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuth()"
              :show-file-list="false"
              :on-success="res => $set(model,'banner',res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="职业">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              :max="10"
              show-score
              v-model="model.scores.difficult"
              style="margin-top: 0.5rem;"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="10" show-score v-model="model.scores.skills" style="margin-top: 0.5rem;"></el-rate>
          </el-form-item>
          <el-form-item label="强度">
            <el-rate :max="10" show-score v-model="model.scores.attack" style="margin-top: 0.5rem;"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              :max="10"
              show-score
              v-model="model.scores.survive"
              style="margin-top: 0.5rem;"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" @input="change" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <!-- 技能 -->
        <el-tab-pane label="技能设置" name="skills">
          <el-button @click="model.skills.push({})">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="6" :sm="12" v-for="(item, i) in model.skills" :key="i" class="skills-item">
              <el-form-item>
                <el-button
                  icon="el-icon-delete"
                  circle
                  type="danger"
                  @click="model.skills.splice(i,1)"
                  class="delete"
                ></el-button>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuth()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item type="textarea" label="小提示">
                <el-input v-model="item.tips"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 拍档 -->
        <el-tab-pane label="拍档设置" name="partners">
          <el-button @click="model.partners.push({})">
            <i class="el-icon-plus"></i> 添加拍档
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="6" :sm="12" v-for="(item, i) in model.partners" :key="i" class="skills-item">
              <el-form-item>
                <el-button
                  icon="el-icon-delete"
                  circle
                  type="danger"
                  @click="model.partners.splice(i,1)"
                  class="delete"
                ></el-button>
              </el-form-item>
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option 
                  v-for="hero in heroes"
                  :key="hero._id"
                  :label="hero.name"
                  :value="hero._id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      categories: [],
      items: [],
      heroes:[],
      model: {
        name: "",
        avatar: "",
        skills: [],
        partners:[],
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        }
      }
    };
  },
  methods: {
    // 监听 el-input 的input事件，处理输入框Bug
    change() {
      this.$forceUpdate();
    },
    // afterUpload(res) {
    //   this.model.avatar = res.url;
    // this.$set(this.model, 'avatar', res.url)
    // },
    async save() {
      // 提交数据
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/heros/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/heros", this.model);
      }
      // this.$router.push("/heros/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`/rest/heros/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCategory() {
      const res = await this.$http.get(`/rest/categories`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`/rest/items`);
      this.items = res.data;
    },
    async fetchHeroes() {
      const res = await this.$http.get(`/rest/heroes`);
      this.heroes = res.data;
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchCategory();
    this.fetchItems();
    this.fetchHeroes()
  }
};
</script>

<style scoped>
.skills-item {
  border: 1px solid #eee;
  margin-top: 1rem;
  padding: 1rem;
  position: relative;
}
.skills-item .delete {
  position: absolute;
  left: -8rem;
  transform: scale(0.8);
}
</style>
