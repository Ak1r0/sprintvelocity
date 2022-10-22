import {useSprintsStore} from "@/stores/sprints";
import Sprint from "@/models/Sprint";

class SprintsManager {

    static self: SprintsManager;

    private store = useSprintsStore();

    private maxSprints = 3;

    static build() {
        return this.self ?? (this.self = new SprintsManager());
    }

    private __construct(){}

    public getSprintIndex(sprint: Sprint): number {
        return this.store.sprints.indexOf(sprint);
    }

    public createSprint(): Sprint {

        // this.getSprints().forEach((sprint) => {
        //     sprint.finish();
        // })
        let sprint = new Sprint();
        sprint.name =             `Sprint ${this.store.count}`;
        sprint.absences = {...this.getSprints().slice(-1).pop() ?.absences ?? {} };

        return sprint;
    }

    public getSprints(): Sprint[] {
        /*
         *   ! .slice() is used to make a copy of the array
         *   its important to not trigger this error :
         *   Maximum recursive updates exceeded in component <?>. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.
         */
        return this.store.sprints.slice(0);
    }

    public addSprint(sprint: Sprint): void {
        this.store.addSprint(sprint);
        this.store.incrementSprintCount();
    }

    public removeSprint(sprint: Sprint): void {
        this.store.removeSprint(sprint);
    }

    public restoreFromStore(sprint: Sprint) {
        let newSprint = new Sprint();
        for(let prop in sprint) {
            newSprint[prop] = sprint[prop];
        }
        return newSprint;
    }
}

const useSprintsManager = () => SprintsManager.build(); // Lazy load
export default useSprintsManager;
