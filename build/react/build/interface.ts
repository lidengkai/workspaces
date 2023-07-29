export interface Options {
  /** 静态资源目录 */
  publicPath?: string
  /** 使用rem */
  remUnit?: number | false
}

export interface EnvConfig extends Required<Options> {
  name: string
  version: string
  mode: 'development' | 'production'
  env: 'dev' | 'test' | 'prod' | 'watch'
  isWatch: boolean
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

export interface DevelopmentConfig extends Options {
  /** 启用eslint */
  useEslint?: boolean
}

export interface ProductionConfig extends Options {
  /** source-map */
  sourceMap?: boolean
  /** 压缩 */
  gzip?: boolean
}

export interface Callback {
  (envConfig: EnvConfig): any
}
