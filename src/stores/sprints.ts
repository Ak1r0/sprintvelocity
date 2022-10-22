import {ref} from "vue";
import {defineStore} from "pinia";
import useSprintsManager from "@/services/SprintsManager";
import type Sprint from "@/models/Sprint";
import SprintsManager from "@/services/SprintsManager";

export const useSprintsStore = defineStore(
    "sprints",
    () => {
        const sprintCount = ref(1);
        const sprints = ref<Sprint[]>([]);
        const teammates = ref<string[]>([]);

        function incrementSprintCount(): number {
            return ++sprintCount.value;
        }

        function addSprint(sprint: Sprint): void {
            sprints.value.unshift(sprint);
        }

        function removeSprint(sprint: Sprint): void {
            const index = useSprintsManager().getSprintIndex(sprint);
            if (index !== -1) {
                sprints.value.splice(index, 1);
            }
        }

        function addTeammate(name: string): Promise<boolean> {
            if (teammates.value.indexOf(name) > -1) {
                return Promise.reject(`Teammate '${name}' already exists`);
            }

            teammates.value.push(name);
            return Promise.resolve(true);
        }

        function removeTeammate(name: string): Promise<boolean> {
            const index = teammates.value.indexOf(name);
            if (index === -1) {
                return Promise.reject(`Teammate '${name}' doesnt exists`);
            }

            sprints.value.forEach((sprint) => {
                delete sprint.absences[name];
            });
            teammates.value.splice(index, 1);
            return Promise.resolve(true);
        }

        return {
            count: sprintCount,
            sprints,
            addSprint,
            removeSprint,
            teammates,
            addTeammate,
            removeTeammate,
            incrementSprintCount
        };
    },
    {
        persist: {
            paths: ['sprints', 'sprintCount'],
            afterRestore: (ctx) => {
                for(let index in ctx.store.sprints) {
                    ctx.store.sprints[index] = SprintsManager().restoreFromStore(ctx.store.sprints[index]);
                }
            }
        },
    }
);
