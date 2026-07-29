import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const eslintConfig = [
  {
    ignores: ['**/node_modules/**', '**/.next/**', '**/build/**', '**/dist/**'],
  },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]

export default eslintConfig