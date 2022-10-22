<template>
  <el-row>
    <el-col>Total mandays = <span>{{totalManDays}}</span></el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useSprintsStore} from "@/stores/sprints";

const store = useSprintsStore();

const absencesToManDays = (sprint: Sprint, teammate: string) => {
  if (!(teammate in sprint.absences)) {
    return "-";
  }
  return sprint.weeks * 5 - sprint.absences[teammate];
};

const totalManDays = computed(() => {
  let total = 0;
  for(let sprint of store.sprints) {
    for(let teammate in sprint.absences) {
      total += absencesToManDays(sprint, teammate)
    }
  }
  return total;
});
</script>

<style scoped>

</style>
