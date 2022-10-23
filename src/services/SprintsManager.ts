import {useVelocityStore} from "@/stores/velocityStore";
import Sprint from "@/models/Sprint";

class SprintsManager {

    private static self: SprintsManager;

    private store;

    static build() {
        return this.self ?? (this.self = new SprintsManager());
    }

    private constructor(){
        this.store = useVelocityStore();
    }

    public getSprintIndex(sprint: Sprint): number {
        return this.store.sprints.indexOf(sprint);
    }

    public createSprint(): Sprint {
        let sprint = new Sprint();
        sprint.name =             `Sprint ${this.store.count}`;
        sprint.absences = {...this.getSprints().slice(-1).pop() ?.absences ?? {} };

        return sprint;
    }

    public getSprints(): Sprint[] {
        /*
         * ! .slice() is used to make a copy of the array ; Its important to not trigger this error :
         * Maximum recursive updates exceeded in component <?>.
         * This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself.
         * Possible sources include component template, render function, updated hook or watcher source function.
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
}

const useSprintsManager = () => SprintsManager.build(); // Lazy load
export default useSprintsManager;
