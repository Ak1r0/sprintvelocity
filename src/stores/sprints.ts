import {ref} from "vue";
import {defineStore} from "pinia";

export const useSprintsStore = defineStore(
    "sprints",
    () => {
        const count = ref(1);
        const sprints = ref<Sprint[]>([]);
        const teammates = ref<string[]>([]);

        function addSprint(sprint: Sprint) {
            sprints.value.push(sprint);
            ++count.value;
        }

        function removeSprint(sprint: Sprint) {
            const index = sprints.value.indexOf(sprint);
            if (index !== -1) {
                sprints.value.splice(index, 1);
            }
        }

        async function addTeammate(teammate: string): Promise<boolean> {
            if (teammates.value.indexOf(teammate) > -1) {
                return Promise.reject(`Teammate '${teammate}' already exists`);
            }

            teammates.value.push(teammate);

            // sprints.value.forEach(sprint => {
            //   sprint.absences[teammate] = 0;
            // });

            return Promise.resolve(true);
        }

        async function removeTeammate(teammate: string): Promise<boolean> {
            const index = teammates.value.indexOf(teammate);
            if (index === -1) {
                return Promise.reject(`Teammate '${teammate}' doesnt exists`);
            }

            sprints.value.forEach((sprint) => {
                delete sprint.absences[teammate];
            });
            teammates.value.splice(index, 1);

            return Promise.resolve(true);
        }

        return {
            count,
            sprints,
            addSprint,
            removeSprint,
            teammates,
            addTeammate,
            removeTeammate,
        };
    },
    {
        persist: true,
    }
);
