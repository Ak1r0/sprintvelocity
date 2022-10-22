export default class Sprint {
    public name: string = '';
    public absences: TeammateList = {};

    public weeks = 2;
    public sp = 0;
    public isStarted = false;
    public isFinished = false;

    public addTeammate(name: string): Promise<void> {
        if(name in this.absences) {
            return Promise.reject(`Teammate '${name}' already exists`);
        }
        this.absences[name] = 0;
        return Promise.resolve();
    }

    public removeTeammate(name: string) {
        delete this.absences[name];
    }

    public getTeammates(): string[] {
        return Object.keys(this.absences);
    }

    public start() {
        this.isStarted = true;
        this.isFinished = false;
    }

    public finish() {
        this.isStarted = false;
        this.isFinished = true;
    }
}
