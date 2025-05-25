import type { RuleSetRule } from 'webpack'
import { createSvgrOptions } from '../../../svgr'

export function createSvgWebpackRule(issuer?: RuleSetRule['issuer']): RuleSetRule {
  return {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: createSvgrOptions(),
      },
    ],
    ...(issuer && { issuer }),
  }
}
