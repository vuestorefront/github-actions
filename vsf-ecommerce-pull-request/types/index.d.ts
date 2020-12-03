export type TODO = any

export interface LightHouseConfig {
  urls: string
  token: string
  report: string
}
export interface LightHouseResponse {
  data: LightHouseResult[]
  code: string
  emulatedFormFactor: string
}
export interface LightHouseResult {
  url: string
  type: string
  scores: {}
}

export interface TestConfig {
  command: string
}
export interface CoverageConfig extends TestConfig {
  token: string
  report: string
}

export interface ReporterConfig {
  token: string
  comment: string
}
