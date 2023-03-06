export interface IParams {
  _start?: number;
  _limit?: number;
}

export const defaultParams: IParams = {
  _start: 0,
  _limit: 5,
};
