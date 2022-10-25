<script setup lang="ts">
import SprintList from "@/components/SprintList.vue";
</script>

<template>
  <el-config-provider>
    <el-container >
      <el-header>
        <h3>
          <el-row justify="end">
            <el-col class="title" :span="1" :xs="24">
              <i>V</i>elocity
            </el-col>
            <el-col class="title" :span="1" :xs="24">
              <i>R</i>aptor
            </el-col>
          </el-row>
        </h3>
      </el-header>

      <el-main>
          <sprint-list />
      </el-main>
      <el-footer>
        <a href="https://github.com/Ak1r0/velocityraptor">Github</a><br>
        <a href="https://www.flaticon.com/free-icons/paleontology" title="Paleontology icons">Paleontology icons created by Freepik - Flaticon</a>
      </el-footer>
    </el-container>
  </el-config-provider>
</template>

<style scoped>
  .el-container {
    height: 100vh;
    text-align: center;
  }
  .el-header {
    margin-top: 30px;
  }
  .el-header .title {
    letter-spacing: 10px;
    min-width: fit-content;
    text-align: right;
  }
  .el-header .title i {
    display: inline-flex;
    padding-left: 9px;
    transform: rotateY(3.142rad);
  }
  .el-footer {
    border-top: 2px solid #F8F9F9;
    background-repeat: no-repeat;
    height: 10%;
  }
</style>
