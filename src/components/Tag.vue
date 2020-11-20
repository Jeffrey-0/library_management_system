<template>
  <div :class="{ tags: true, 'content-collapse': collapse }">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="isActive"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        effect="dark"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  namne: "Tag",
  data() {
    return {
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
        },
      ],
      tabIndex: 1,
      collapse: true,
    };
  },
  methods: {
    addTab(tabName) {
      let result = 0;
      for (let i = 0; i < this.editableTabs.length; i++) {
        if (this.editableTabs[i].title == tabName) {
          result = 1;
          break;
        }
      }
      if (result == 0) {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: tabName,
          name: newTabName,
        });
        this.editableTabsValue = newTabName;
      }
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    },
    isActive(tabName, path) {
      for (let i = 0; i < this.editableTabs.length; i++) {
        if (this.editableTabs[i].title == tabName) {
          this.editableTabsValue = this.editableTabs[i].name;
          if (this.$route && this.$route.path !== "/" + path) {
            console.log("454545");
            this.$router.push("/" + path);
          }
          break;
        }
      }
      if (this.$route && this.$route.path !== "/home") {
        console.log("454545");
        this.$router.push("/home");
      }
    },
    isCollapse(val) {
      this.collapse = val;
    },
  },
  mounted() {
    this.$eventBus.$on("eventBusName", (val) => {
      this.isCollapse(val);
    });
    this.$eventBusTag.$on("eventBusName", (val, path) => {
      this.isActive(val, path);
      console.log("tag99999");
      this.addTab(val, path);
    });
  },
};
</script>


<style  scoped>
.tags {
  position: absolute;
  left: 200px;
  right: 0;
  top: 70px;
  bottom: 0;
  height: 35px;
  padding-left: 5px;
  margin-top: 5px;
  text-align: left;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  -webkit-box-shadow: 0 5px 10px #ddd;
  box-shadow: 0 5px 10px #ddd;
}
.content-collapse {
  left: 65px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>


