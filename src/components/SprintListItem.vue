<script lang="ts" setup>
import {computed, ref, watchEffect} from "vue";
import Sprint from "@/models/Sprint";
import {Delete} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import useSprintsManager from "@/services/SprintsManager";
import useVelocityCalculator from "@/services/VelocityCalculator";

const sprintsManager = useSprintsManager();
const calculator = useVelocityCalculator();

const props = defineProps<{
  sprint: Sprint;
}>();

const newTeammate = ref('');
const isNew = computed(() => !props.sprint.isStarted && !props.sprint.isFinished);
const activeTeamPanel = ref(isNew.value);
const maxDays = computed(() => props.sprint.weeks * calculator.config.daysAWeek)

watchEffect(() => {
  if(!props.sprint.isStarted && !props.sprint.isFinished){
    props.sprint.sp = calculator.velocity(props.sprint);
  }
}, {flush: 'post'});

const availability = computed(() => {
  let total = calculator.sprintAvailability(props.sprint);

  return Math.round(total * 100 / calculator.sprintMaxAvailability(props.sprint));
});

const addTeammate = (value: string) => {
  props.sprint.addTeammate(value)
      .then(() => {
        newTeammate.value = '';
      })
      .catch((error) => {
        ElMessage.error(error as string);
      });
};

</script>

<template>
  <el-card class="sprint-item">
    <el-row class="sprint-item-actions">
      <el-col :span="24">
        <el-tag v-show="isNew" class="ml-2">Next sprint</el-tag>
        <el-tag v-show="sprint.isStarted" class="ml-2" type="warning">Sprint started</el-tag>
        <el-button text @click.prevent="sprintsManager.removeSprint(sprint)">
          <el-icon color="red">
            <Delete/>
          </el-icon>
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form>
          <el-form-item>
            <el-input
                v-model="sprint.name"
                placeholder="Sprint name"
                :input-style="{cursor:'default'}"
                class="sprint-input-name"
                :disabled="!isNew"
            />
          </el-form-item>
          <el-form-item label="Duration" label-width="7em">
            <el-slider
                v-model="sprint.weeks"
                :step="1"
                size="small"
                :max="8"
                :format-tooltip="(val) => `${val} week${props.sprint.weeks > 1 ? 's' : ''}`"
                class="slider"
                :disabled="sprint.isFinished"
            />
          </el-form-item>
          <el-form-item label="Story points" label-width="7em">
            <el-slider
                v-model="sprint.sp"
                :step="1"
                size="small"
                :max="50"
                class="slider"
                :disabled="!sprint.isStarted"
            />
          </el-form-item>
          <el-form-item label="Availability" label-width="7em">
            <el-slider
                v-model="availability"
                :max="100"
                :step="1"
                :format-tooltip="(val) => `${val} %`"
                size="small"
                disabled
                class="slider slider-availability"/>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-divider content-position="left">
      See team absences
      <el-switch v-model="activeTeamPanel" class="mb-2"
      />
    </el-divider>
    <el-row v-show="activeTeamPanel">
      <el-col>
        <el-form>
          <el-form-item v-for="(_, teammate) in sprint.absences"
                        :key="teammate"
                        :label="teammate"
                        label-width="5em"
          >
            <el-slider
                v-model="sprint.absences[teammate]"
                :max="maxDays"
                :step="1"
                size="small"
                class="slider"
                :disabled="sprint.isFinished"
            />
          </el-form-item>
          <el-form-item v-if="isNew">
            <el-input placeholder="Add teammate" v-model="newTeammate" @change="addTeammate"/>
            <label class="add-teammate-label">Press enter to validate</label>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-button v-if="isNew"
               class="start-sprint-button"
               type="success"
               plain
               @click="sprint.start()">
      Start
    </el-button>

    <el-button v-else-if="sprint.isStarted"
               class="start-sprint-button"
               type="warning"
               plain
               @click="sprint.finish()">
      Finish
    </el-button>
  </el-card>
</template>

<style scoped>
.slider {
  margin-right: 20px;
}

.sprint-item {
  margin: 5px;
  min-width: 300px;
  max-width: 25vw;
}

.sprint-item-actions {
  line-height: 32px;
  margin-top: -15px;
  margin-right: -15px;
  margin-bottom: 5px;
  text-align: right;
}

.add-teammate-label {
  color: var(--el-color-info-light-3);
  text-align: right;
  width: 100%;
  font-size: var(--el-font-size-extra-small);
  margin-top: -5px;
}

.start-sprint-button {
  width: 100%;
}
</style>
<style>
.el-form-item__label {
  overflow-y: hidden;
}

.slider-availability .el-slider__runway.is-disabled .el-slider__bar {
  background: #0F2830 !important;
}
</style>
