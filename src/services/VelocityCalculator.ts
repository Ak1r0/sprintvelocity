import useSprintsManager from "@/services/SprintsManager";
import type Sprint from "@/models/Sprint";

class VelocityCalculator {

    private static self: VelocityCalculator;

    private sprintsManager;
    public daysAWeek = 5;

    static build() {
        return this.self ?? (this.self = new VelocityCalculator());
    }

    private constructor() {
        this.sprintsManager = useSprintsManager();
    }

    public srintAvailability(sprint: Sprint): number {
        return Object.values(sprint.absences).reduce((accumulator, current) => {
            return accumulator - current;
        }, this.sprintMaxAvailability(sprint));
    }

    public sprintMaxAvailability(sprint: Sprint): number {
        return sprint.weeks * this.daysAWeek * Object.keys(sprint.absences).length;
    }

    /**
     * (totalSP/totalAvailability) * newSprint.totalAvailabity
     *
     * @param newSprint
     */
    public velocity(newSprint: Sprint) {
        let totalSP = 0, totalAv = 0;

        this.sprintsManager.getSprints().forEach((sprint) => {
            if (!sprint.isStarted && !sprint.isFinished) {
                return;
            }

            totalSP += sprint.sp;
            totalAv += this.srintAvailability(sprint);
        });

        return Math.round((totalSP / totalAv) * this.srintAvailability(newSprint));
    }
}

const useVelocityCalculator = () => VelocityCalculator.build(); // Lazy load
export default useVelocityCalculator;
