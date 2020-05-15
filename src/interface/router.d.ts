interface RouteConfigI {
  path: string;
  component: () => Promise<any>;
  exact?: boolean;
  auth?: boolean;
}
