<script setup lang="ts">
import {reactive, ref} from "vue";
import {useSprintsStore} from "@/stores/sprints";
import {ElMessage} from "element-plus";
import {Close} from "@element-plus/icons-vue";
import SprintForm from "@/components/SprintForm.vue";
import SprintItem from "@/components/SprintItem.vue";

const store = useSprintsStore();

const drawer = ref(false);
const newTeammateName = ref("");
const daysAWeek = ref(5);
const editedSprintIndex = ref<number>(0);

const addTeammate = () => {
  store.addTeammate(newTeammateName.value).catch((msg) => {
    ElMessage({
      message: msg,
      type: "error",
    });
  });
};

const newSprint = () => {
  let sprint: Sprint = reactive({
    name: `sprint ${store.count}`,
    weeks: 2,
    absences: {},
    sp: 0
  });
  for (let teammate of store.teammates) {
    sprint.absences[teammate] = 0;
  }
  store.addSprint(sprint);
  editSprint(sprint);
};

const editSprint = (sprint: Sprint) => {
  editedSprintIndex.value = store.sprints.indexOf(sprint);
  drawer.value = true;
};
</script>

<template>
  <el-container direction="vertical" class="sprints">
    <el-row>
      <el-col :span="3">Sprint</el-col>
      <el-col :span="1">Teammates</el-col>
    </el-row>
    <el-row>
      <el-col :span="3"></el-col>
      <el-col :span="1" v-for="teammate in store.teammates" :key="teammate">
        {{ teammate }}
        <el-button @click="store.removeTeammate(teammate)">
          <el-icon color="red">
            <Close/>
          </el-icon>
        </el-button>
      </el-col>
      <el-col :span="1">
        <el-input v-model="newTeammateName" placeholder="name"/>
        <el-button @click="addTeammate()">Add</el-button>
      </el-col>
    </el-row>
    <div v-for="sprint in store.sprints" :key="sprint.name"
         class="sprint" >
      <sprint-item
          :sprint="sprint"
          :days-a-week="daysAWeek"
          @edit="editSprint"
      />
    </div>

    <el-button
        type="primary"
        :disabled="store.teammates.size === 0"
        @click="newSprint()"
    >
      New sprint
    </el-button>
  </el-container>
  <el-drawer v-model="drawer" title="New sprint">
    <sprint-form
        v-model="store.sprints[editedSprintIndex]"
        :days-a-week="daysAWeek"
    />
  </el-drawer>
</template>

<style scoped>
table {
  border-collapse: collapse;
}
.sprints .sprint:last-child {
  background-color: var(--el-color-primary);
}
</style>
