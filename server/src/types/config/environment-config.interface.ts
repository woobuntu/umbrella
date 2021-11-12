type NodeEnv = 'development' | 'production';

export interface EnvironmentConfig {
  port: number;
  nodeEnv: NodeEnv;
}
