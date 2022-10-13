<script setup lang="ts">
import HelloWorld from "./components/SprintList.vue";
import SprintList from "@/components/SprintList.vue";
</script>

<template>
  <el-config-provider>
    <el-container>
      <el-header>
        <h1>Sprint velocity calculator</h1>
      </el-header>

      <el-main>
        <sprint-list />
      </el-main>
      <el-footer>
        <a href="https://iradesign.io">
          Illustrations by IRA Design
        </a>
      </el-footer>
    </el-container>
  </el-config-provider>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
