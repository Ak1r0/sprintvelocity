<script lang="ts" setup>
import { useSprintsStore } from "@/stores/sprints";
import { Edit, Delete } from "@element-plus/icons-vue";

const store = useSprintsStore();

const props = defineProps<{
  sprint: Sprint;
  daysAWeek: number;
}>();

const emits = defineEmits<{
  (e: "edit", data: Sprint): void;
}>();

const absencesToManDays = (sprint: Sprint, teammate: string) => {
  if (!(teammate in sprint.absences)) {
    return "-";
  }
  return sprint.weeks * props.daysAWeek - sprint.absences[teammate];
};
</script>

<template>
  <el-col :span="3" style="width: max-content">
    <h3>{{ sprint.name }}</h3>
    <span>{{ sprint.weeks }} week{{ sprint.weeks > 1 ? "s" : "" }}</span>
  </el-col>
  <el-col :span="1" v-for="teammate in store.teammates" :key="teammate">
    {{ absencesToManDays(sprint, teammate) }}
  </el-col>
  <el-col :span="1">
    <el-button @click.prevent="emits('edit', sprint)"
      ><el-icon color="#337ecc"><Edit /></el-icon
    ></el-button>
  </el-col>
  <el-col :span="1">
    <el-button @click.prevent="store.removeSprint(sprint)"
      ><el-icon color="red"><Delete /></el-icon
    ></el-button>
  </el-col>
</template>

<style scoped></style>
