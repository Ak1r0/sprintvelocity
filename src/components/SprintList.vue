<script setup lang="ts">
import useSprintsManager from "@/services/SprintsManager";
import {Plus} from "@element-plus/icons-vue";
import useVelocityCalculator from "@/services/VelocityCalculator";

const sprintsManager = useSprintsManager();
const calculator = useVelocityCalculator();

//todo check sur mobile
//todo lorsque les SP d'un sprint started sont modifies : compter les difference de SP par raport a l'etat initial
//todo faire un graph affichant ces differences

const form = calculator.config;
const newSprint = () => {
  sprintsManager.addSprint(sprintsManager.createSprint());
}

</script>

<template>
  <div>
    <el-form :model="form" inline>
      <el-form-item label="We work">
        <el-input-number v-model="form.daysAWeek" size="small"/>
        <span>&nbsp;days a week</span>
      </el-form-item>
      <el-form-item label="Count only">
        <el-input-number v-model="form.lastSprints" size="small"/>
        <span>&nbsp; last sprints</span>
      </el-form-item>
      <el-form-item label="From finished sprints only">
        <el-switch v-model="form.finishedSprints"/>
      </el-form-item>
    </el-form>
  </div>
  <el-row>
    <el-col :xs="24" :md="1">
      <el-tooltip content="New sprint" placement="bottom">
        <el-button type="primary" class="new-sprint-button" @click="newSprint">
          <el-icon :size="20"><Plus/></el-icon>
        </el-button>
      </el-tooltip>
    </el-col>
    <el-col :xs="24" :md="23">
      <el-scrollbar>
        <div class="sprint-list">
          <div v-for="(sprint, index) in sprintsManager.getSprints()" :key="index">
            <sprint-list-item :sprint="sprint" />
          </div>
        </div>
      </el-scrollbar>
    </el-col>
  </el-row>
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
  width: 100%;
  max-height: 350px;
}
</style>
