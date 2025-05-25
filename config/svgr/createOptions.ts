import type { Config as SvgrConfig } from '@svgr/core'
import { DEFAULT_REPLACE_ATTR_VALUES, DEFAULT_SVG_PROPS } from './constants'

export function createSvgrOptions(overrides: Partial<SvgrConfig> = {}): SvgrConfig {
  return {
    icon: true,
    ref: true,
    memo: true,
    titleProp: true,
    descProp: true,
    expandProps: 'end',
    svgProps: DEFAULT_SVG_PROPS,
    replaceAttrValues: DEFAULT_REPLACE_ATTR_VALUES,
    svgo: true,
    svgoConfig: {
      plugins: [
        { name: 'removeDimensions' },
        { name: 'removeViewBox' },
        { name: 'convertColors', params: { currentColor: true } },
        {
          name: 'removeAttrs',
          params: { attrs: ['stroke', 'style', 'class', 'data.*'] },
        },
        { name: 'removeTitle' },
        { name: 'removeDesc' },
      ],
    },
    ...overrides,
  }
}
