<script setup lang="ts">
import {reactive, ref} from "vue";
import useSprintsManager from "@/services/SprintsManager";
import {Plus} from "@element-plus/icons-vue";

const sprintsManager = useSprintsManager();

//todo check sur mobile
//todo lorsque les SP d'un sprint started sont modifies : compter les difference de SP par raport a l'etat initial
//todo faire un graph affichant ces differences

const form = reactive({ //todo mettre dans un store
  daysInWeek: 5,
  xLastSprints: 5,
  finishedSprintsOnly: true,
})
const daysAWeek = ref(5);

const newSprint = () => {
  sprintsManager.addSprint(sprintsManager.createSprint());
}

</script>

<template>
  <div>
    <el-form :model="form" inline>
      <el-form-item label="We work">
        <el-input-number v-model="form.daysInWeek" size="small"/>
        <span>&nbsp;days a week</span>
      </el-form-item>
      <el-form-item label="Count only the ">
        <el-input-number v-model="form.xLastSprints"  size="small"/>
        <span>&nbsp; last sprints</span>
      </el-form-item>
      <el-form-item label="Finished sprints only">
        <el-switch v-model="form.finishedSprintsOnly" />
      </el-form-item>
    </el-form>
  </div>
  <el-scrollbar>
    <div class="sprint-list">
      <div>
        <el-tooltip
            content="New sprint"
            placement="bottom"
        >
          <el-button type="primary" class="new-sprint-button" @click="newSprint">
            <el-icon :size="20">
              <Plus/>
            </el-icon>
          </el-button>
        </el-tooltip>
      </div>
      <div v-for="(sprint, index) in sprintsManager.getSprints()" :key="index">
        <sprint-list-item
            :sprint="sprint"
            :days-a-week="daysAWeek"
        />
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped>
table {
  border-collapse: collapse;
}

.sprint-list {
  width: 90vw;
  display: flex;
  padding-bottom: 20px;
}

.new-sprint-button {
  height: 100%;
  width: 80px;
}
</style>
