import { ref } from "vue";
import { defineStore } from "pinia";

export const useSprintsStore = defineStore("sprints", () => {
  const sprints = ref<Sprint[]>([]);
  const teammates = ref<Set<Teammate>>(new Set());

  function addSprint(sprint: Sprint) {
    sprints.value.push(sprint);
  }

  function removeSprint(index: number = 0) {
    sprints.value.splice(index, 1);
  }

  async function addTeammate(teammate: Teammate): Promise<boolean> {
    if(teammates.value.has(teammate)) {
      return Promise.reject(`Teammate '${teammate}' already exists`);
    }

    teammates.value.add(teammate);

    sprints.value.forEach(sprint => {
      sprint.mandays.set(teammate, 0);
    })

    return Promise.resolve(true);
  }

  async function removeTeammate(teammate: Teammate): Promise<boolean> {
    if(!teammates.value.has(teammate)) {
      return Promise.reject(`Teammate '${teammate}' doesnt exists`);
    }

    sprints.value.forEach(sprint => {
      sprint.mandays.delete(teammate);
    });
    teammates.value.delete(teammate);

    return Promise.resolve(true);
  }

  return { sprints, addSprint, removeSprint, teammates, addTeammate, removeTeammate};
});
