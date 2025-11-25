export interface EnvironmentType {
  production: boolean;
  services: {
    home: {
      apiUrl: string;
    };
    news: {
      apiUrl: string;
    };
  };
}
