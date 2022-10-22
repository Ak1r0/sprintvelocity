import useSprintsManager from "@/services/SprintsManager";
import type Sprint from "@/models/Sprint";
import {useVelocityStore} from "@/stores/velocityStore";

class VelocityCalculator {

    private static self: VelocityCalculator;

    private sprintsManager;
    public config;

    static build() {
        return this.self ?? (this.self = new VelocityCalculator());
    }

    private constructor() {
        this.sprintsManager = useSprintsManager();
        this.config = useVelocityStore().config;
    }

    public sprintAvailability(sprint: Sprint): number {
        return Object.values(sprint.absences).reduce((accumulator, current) => {
            return accumulator - current;
        }, this.sprintMaxAvailability(sprint));
    }

    public sprintMaxAvailability(sprint: Sprint): number {
        return sprint.weeks * this.config.daysAWeek * Object.keys(sprint.absences).length;
    }

    /**
     * (totalSP/totalAvailability) * newSprint.totalAvailabity
     *
     * @param newSprint
     */
    public velocity(newSprint: Sprint) {
        let totalSP = 0, totalAv = 0, n = 0;
        this.sprintsManager.getSprints().forEach((sprint) => {
            if (
                (!sprint.isStarted && !sprint.isFinished)
                || (this.config.finishedSprints && !sprint.isFinished)
                || (this.config.lastSprints > 0 && n >= this.config.lastSprints)) {
                return;
            }
            totalSP += sprint.sp;
            totalAv += this.sprintAvailability(sprint);
            ++n;
        });
        return Math.round((totalSP / totalAv) * this.sprintAvailability(newSprint));
    }
}

const useVelocityCalculator = () => VelocityCalculator.build(); // Lazy load
export default useVelocityCalculator;
