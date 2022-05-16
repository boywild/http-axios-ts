export interface IGetParams {
  offset: number;
  limit: number;
}
export interface IGetRes {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: Array<string>;
  trans: string;
  musicSize: number;
  topicPerson: number;
  showPrivateMsg?: string;
  isSubed?: boolean;
  accountId?: string;
  picId_str: string;
  img1v1Id_str: string;
  transNames?: string;
  followed: boolean;
  mvSize?: string;
  publishTime?: number;
  identifyTag?: string;
  alg?: string;
  fansCount?: string;
}
