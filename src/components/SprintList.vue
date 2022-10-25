<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";
import useSprintsManager from "@/services/SprintsManager";
import {Plus, Operation} from "@element-plus/icons-vue";
import useVelocityCalculator from "@/services/VelocityCalculator";

const sprintsManager = useSprintsManager();
const calculator = useVelocityCalculator();

//todo check sur mobile
//todo lorsque les SP d'un sprint started sont modifies : compter les difference de SP par raport a l'etat initial
//todo faire un graph affichant ces differences

const drawer = ref(false);
const form = calculator.config as Record<string, any>;

const newSprint = () => {
  sprintsManager.addSprint(sprintsManager.createSprint());
}

function useBreakpoints() {
  // make a component of this function ; source : https://stackoverflow.com/a/71210364
  let windowWidth = ref(window.innerWidth)

  const onWidthChange = () => windowWidth.value = window.innerWidth
  onMounted(() => window.addEventListener('resize', onWidthChange))
  onUnmounted(() => window.removeEventListener('resize', onWidthChange))

  const type = computed(() => {
    if (windowWidth.value < 767) return 'xs'
    if (windowWidth.value >= 767 && windowWidth.value < 992) return 'sm'
    if (windowWidth.value >= 992 && windowWidth.value < 1200) return 'md'
    if (windowWidth.value >= 992 && windowWidth.value < 1920) return 'lg'
    if (windowWidth.value >= 1920) return 'xl'
    return null; // This is an unreachable line, simply to keep eslint happy.
  })

  const width = computed(() => windowWidth.value)

  return { width, type }
}
const { width, type } = useBreakpoints();

const drawerSize = computed(() => {
  if(type.value == 'xs') return '90%';
  if(type.value == 'sm') return '70%';
  if(type.value == 'md') return '50%';
  return '30%';
});
</script>

<template>
  <el-row>
    <el-col>
      <el-button type="primary" class="new-sprint-button" @click="newSprint">
        <el-icon :size="20"><Plus/></el-icon>
      </el-button>

      <el-button text @click="drawer=true"><el-icon :size="20"><Operation /></el-icon></el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-scrollbar>
        <div class="sprint-list">
          <div v-for="(sprint, index) in sprintsManager.getSprints()" :key="index">
            <sprint-list-item :sprint="sprint" />
          </div>
        </div>
      </el-scrollbar>
    </el-col>
  </el-row>

  <el-drawer
      v-model="drawer"
        :size="drawerSize"
      title="Config"
  >
    <el-form :model="form">
      <el-form-item label="Working days a week">
        <el-input-number v-model="form.daysAWeek" size="small"/>
      </el-form-item>
      <el-form-item label="Max sprints">
        <el-input-number v-model="form.lastSprints" size="small"/>
      </el-form-item>
      <el-form-item>
        <el-switch v-model="form.finishedSprints"
          active-text="Finished sprints only"
          inactive-text="Started & finished sprints"
        />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>
table {
  border-collapse: collapse;
}

.sprint-list {
  max-width: 90vw;
  display: flex;
  padding-bottom: 20px;
}

.new-sprint-button {
  /*height: 100%;*/
  /*width: 100%;*/
  /*max-height: 350px;*/
}
</style>
