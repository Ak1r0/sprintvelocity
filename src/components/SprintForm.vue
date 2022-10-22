<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  modelValue: Sprint;
  daysAWeek: number;
}>();

const emits = defineEmits(["update:modelValue"]);

const update = (key: string, value: any) => {
  emits("update:modelValue", { ...props.modelValue, [key]: value });
};

const updateAbsence = (key: string, value: any) => {
  let absences = props.modelValue.absences;
  absences[key] = value;
  emits("update:modelValue", { ...props.modelValue, absences: absences });
};

const daysInSprint = computed((): number => {
  return props.modelValue.weeks * props.daysAWeek;
});
</script>

<template>
  <el-form label-width="80px">
    <el-form-item label="Name">
      <el-input
        :model-value="modelValue.name"
        @input="(value) => update('name', value)"
      />
    </el-form-item>

    <el-form-item label="Weeks">
      <el-input-number
        :model-value="modelValue.weeks"
        @change="(value) => update('weeks', value)"
        :step="1"
        :step-strictly="true"
        :min="1"
      />
    </el-form-item>

    <el-form-item label="SP">
      <el-input-number
          :model-value="modelValue.sp"
          @change="(value) => update('sp', value)"
          :step="1"
          :step-strictly="true"
          :min="0"
      />
    </el-form-item>

    <h4>Scheduled absences</h4>

    <el-form-item
      v-for="(_, teammate) in modelValue.absences"
      :label="teammate"
      :key="teammate"
    >
      <el-input-number
        :model-value="modelValue.absences[teammate]"
        @change="(value) => updateAbsence(teammate, value)"
        :min="0"
        :max="daysInSprint"
        :step="1"
        :step-strictly="true"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
