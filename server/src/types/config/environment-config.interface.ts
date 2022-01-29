type NodeEnv = 'development' | 'production';

export interface EnvironmentConfig {
  port: number;
  nodeEnv: NodeEnv;
  clientUrl: string;
  domain: string;
  expires: number;
  region: string;
}
