<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {useSprintsStore} from "@/stores/sprints";

const emits = defineEmits<{
  (e: 'save', data: Sprint): void
}>();

const store = useSprintsStore();

const generateSprintName = computed(() => `sprint ${store.sprints.length+1}`);
const name = ref( '');
const weeks = ref(2);
const absences = reactive(new Map());
const workingDaysAWeek = ref(5);

store.teammates.forEach((teammate) => { absences.set(teammate, 0) });

const save = () => {
  emits('save', {
    name: name.value,
    weeks: weeks.value,
    mandays: absencesToManDays(),
  });
}

const absencesToManDays = () => {
  const fullTime: number = weeks.value * workingDaysAWeek.value;
  let mandays = new Map();
  absences.forEach((abs, teammate) => {
    mandays.set(teammate, fullTime-abs);
  })
  return mandays;
}
</script>

<template>
  <el-form label-width="80px">

    <el-form-item label="Name">
      <el-input v-model="name" :model-value="generateSprintName"/>
    </el-form-item>

    <el-form-item label="Weeks">
      <el-input-number v-model="weeks"
                       :step="1"
                       :step-strictly="true"
                       :min="1"/>
    </el-form-item>

    <h4>Scheduled absences</h4>

    <el-form-item v-for="teammate in store.teammates" :label="teammate">
      <el-input-number :model-value="absences.get(teammate) ?? 0"
                       :min="0"
                       :max="weeks*workingDaysAWeek"
                       :step="1"
                       :step-strictly="true"
                       @change="(value) => absences.set(teammate, value)"/>
    </el-form-item>

    <el-button type="primary" @click="save">Add</el-button>
  </el-form>
</template>

<style scoped>

</style>
