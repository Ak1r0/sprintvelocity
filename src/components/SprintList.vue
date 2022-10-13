<script setup lang="ts">

import {ref} from "vue";
import {useSprintsStore} from "@/stores/sprints";
import {ElMessage} from "element-plus";
import SprintForm from "@/components/SprintForm.vue";

const store = useSprintsStore();

const drawer = ref(false)
const newTeammateName = ref('');

const addTeammate = () => {
  store.addTeammate(newTeammateName.value)
      .catch((msg)=>{
        ElMessage({
          message: msg,
          type: 'error',
        })
      });
}

const addSprint = (sprint: Sprint) => {
  store.addSprint(sprint);
  drawer.value = false;
}

</script>

<template>
  <table>
    <thead>
    <tr>
      <td rowspan="2">Sprint</td>
      <td>Teammates</td>
    </tr>
    <tr>
      <td v-for="teammate in store.teammates">
        {{teammate}}
        <el-button @click="store.removeTeammate(teammate)">Remove</el-button>
      </td>
      <td>
        <el-input v-model="newTeammateName" placeholder="name"/>
        <el-button @click="addTeammate()">Add</el-button>
      </td>
    </tr>
    </thead>
    <tbody>
      <tr v-for="sprint in store.sprints">
        <td>
          <h3>{{sprint.name}}</h3>
          <span>{{sprint.weeks}} weeks</span>
        </td>
        <td v-for="teammate in store.teammates">
          {{sprint.mandays.get(teammate) ?? 10 }}
        </td>
        <td></td>
      </tr>
    </tbody>
    <tfoot>

    </tfoot>
  </table>

  <el-button type="primary"
             :disabled="store.teammates.size === 0"
             @click="drawer = true">
    New sprint
  </el-button>

  <el-drawer v-model="drawer"
             title="New sprint">
    <sprint-form @save="addSprint"/>
  </el-drawer>
</template>

<style scoped>
table {
  border-collapse: collapse;
}

.new-sprint-tr {
  background-color: var(--el-color-primary-light-7);
}
</style>
