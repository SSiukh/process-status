export interface UniqueCheckConfig<TReq, TRes, TValue = TReq> {
  endpoint: string;
  body: (controlValue: TValue) => TReq;
  isUnique: (response: TRes) => boolean;
}
