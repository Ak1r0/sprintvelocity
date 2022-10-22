<template>
  <span v-show="!editing" @dblclick="toggleOn">{{ modelValue }}</span>

  <el-input
      ref="editInput"
      v-show="editing && isString()"
      v-model="modelValue"
      @blur="toggleOff"
      @keyup.enter="toggleOff"
  />

  <el-input-number
      ref="editInputNumber"
      v-show="editing && !isString()"
      v-model="modelValue"
      @blur="toggleOff"
      @keyup.enter="toggleOff"
  />
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElInput, ElInputNumber, ElMessage} from 'element-plus';

type inputType = InstanceType<typeof ElInput | typeof ElInputNumber> | null;

const props = defineProps<{
  modelValue: string | number;
  props?: null | {};
}>();

const emits = defineEmits(["update:modelValue"]);

const editing = ref(false);
const editInput = ref<inputType>(null);

const toggleOn = () => {
  editing.value = true;
  editInput.value?.focus();
}

const toggleOff = () => {
  if(isString() && props.modelValue == ''){
    ElMessage({
      message: "Sprint name can't be blank",
      type: "error",
    });
    return false;
  }
  editing.value = false;
  emits("update:modelValue", props.modelValue);
}

const isString = () => typeof props.modelValue !== 'number';

</script>

<style scoped>

</style>
