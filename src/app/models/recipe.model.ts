export class Recipe {
  constructor(
    public title: string,
    public description: string,
    public image: string,
    public uid: string,
    public id?: string
  ) {}
}
