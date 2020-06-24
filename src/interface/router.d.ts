interface RouteConfigI {
  path: string;
  component: any;
  exact?: boolean;
  auth?: boolean;
}
