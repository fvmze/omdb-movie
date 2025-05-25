import { createSvgWebpackRule } from './rules/svg'

export function buildWebpackModuleRules() {
  return [createSvgWebpackRule()]
}
