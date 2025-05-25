import type { NextConfig } from 'next'
import type { RuleSetRule } from 'webpack'

import { svgTurbopackRule } from '@config/bundler/turbopack'
import { createSvgWebpackRule } from '@config/bundler/webpack'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NEXT_BUNDLE_ANALYZE === 'true',
})

const baseConfig: NextConfig = {
  turbopack: {
    rules: svgTurbopackRule,
  },
  webpack(config) {
    const rules = config.module.rules as RuleSetRule[]

    const svgRule = rules.find(
      (rule): rule is RuleSetRule =>
        typeof rule === 'object' &&
        rule !== null &&
        rule.test instanceof RegExp &&
        rule.test.test('.svg'),
    )

    if (svgRule) {
      svgRule.exclude = /\.svg$/i
      rules.push(createSvgWebpackRule(svgRule.issuer))
    } else {
      console.warn('[webpack] Could not find existing SVG rule to exclude')
    }

    return config
  },
}

export default withBundleAnalyzer(baseConfig)
