<script setup lang="ts">
import SprintList from "@/components/SprintList.vue";
import logoUrl from "@/assets/logo-180.png"
</script>

<template>
  <el-config-provider>
    <el-container >
      <el-header>
          <h3>
            <img :width="75" :src="logoUrl" class="logo"/>
            <span class="title"><i>V</i>elocity<i>R</i>aptor</span>
          </h3>
      </el-header>

      <el-main>
          <sprint-list />
      </el-main>
      <el-footer>
        <a href="https://github.com/Ak1r0">Github</a><br>
        <a href="https://www.flaticon.com/free-icons/paleontology" title="Paleontology icons">Paleontology icons created by Freepik - Flaticon</a>
      </el-footer>
    </el-container>
  </el-config-provider>
</template>

<style scoped>
  .el-container {
    height: 100vh;
  }
  .el-header .logo {
    vertical-align: middle;
    margin-right: 30px;
  }
  .el-header .title {
    letter-spacing: 10px;
  }
  .el-header .title i {
    display: inline-flex;
    padding-left: 9px;
    transform: rotateY(3.142rad);
  }
  .el-main {
    background-repeat: no-repeat;
    background-position: center;
  }
  .el-footer {
    border-top: 2px solid #F8F9F9;
    background-repeat: no-repeat;
    height: 10%;
    text-align: center;
  }
</style>
