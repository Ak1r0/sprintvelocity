<script setup lang="ts">
import SprintList from "@/components/SprintList.vue";
import Calculator from "@/components/Calculator.vue";
</script>

<template>
  <el-config-provider>
    <el-container>
      <el-header>
        <h1>Sprint velociraptor</h1>
      </el-header>

      <el-main>
          <sprint-list />
      </el-main>
      <el-footer>
        <a href="https://iradesign.io"> Illustrations by IRA Design </a>
      </el-footer>
    </el-container>
  </el-config-provider>
</template>

<style scoped>

</style>
