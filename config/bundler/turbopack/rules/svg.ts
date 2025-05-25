import type { NextConfig } from 'next'
import { createSvgrOptions } from '../../../svgr'

export const svgTurbopackRule = {
  '*.svg': {
    default: {
      loaders: [
        {
          loader: '@svgr/webpack',
          options: JSON.parse(JSON.stringify(createSvgrOptions())),
        },
      ],
      as: '*.js',
    },
  },
} satisfies NonNullable<NextConfig['turbopack']>['rules']
