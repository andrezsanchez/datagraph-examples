export enum UniformType {
  f1,
  f2,
  f3,
  f4,
  ui1,
  ui2,
  ui3,
  ui4,
  i1,
  i2,
  i3,
  i4,
  m2,
  m3,
  m4,
}

export interface Uniform {
  name: string;
  type: UniformType;
  data: Float64Array;
}
