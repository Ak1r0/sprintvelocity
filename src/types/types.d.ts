type Teammate = string;

type Sprint = {
    name: string,
    mandays: Map<Teammate, number>,
    weeks: number
}
