export interface Game {
  ID: number,
  Name: string,
  SupportsAddons: boolean,
  SupportsVoice: boolean,
  Order: number,
  Slug: string,
  Icon: string,
  GameFiles: Array<any>,
  CategorySections: Array<any>
}
