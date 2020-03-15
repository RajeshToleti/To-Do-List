export class Task {
  constructor(
    public id: number,
    public label: string,
    public description: string,
    public category: string,
    public done: boolean
  ) {}
}
