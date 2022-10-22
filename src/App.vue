<script setup lang="ts">
import SprintList from "@/components/SprintList.vue";</script>

<template>
  <el-config-provider>
    <el-container>
      <el-header>
        <h1>VelocityRaptor</h1>
      </el-header>

      <el-main>
          <sprint-list />
      </el-main>
      <el-footer>
        <a href="https://github.com/Ak1r0">Github</a>
      </el-footer>
    </el-container>
  </el-config-provider>
</template>

<style scoped>

</style>
