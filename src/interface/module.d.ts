interface ModuleResultI<T> {
  success: boolean;
  msg: string;
  data?: T;
}
