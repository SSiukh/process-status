import { EnvironmentType } from './environments.type';

export const environment: EnvironmentType = {
  production: false,
  services: {
    home: {
      apiUrl: 'https://rm-united24-rebuild-api-public.demo.ukrohost.com',
    },
    news: {
      apiUrl: 'http://localhost:3000',
    },
  },
};
