import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Mock MUI icons
vi.mock('@mui/icons-material', () => ({
  Speed: () => 'Speed Icon',
  AccountTree: () => 'AccountTree Icon',
  Visibility: () => 'Visibility Icon',
  CloudSync: () => 'CloudSync Icon',
  Terminal: () => 'Terminal Icon',
  Security: () => 'Security Icon',
  GitHub: () => 'GitHub Icon',
  Brightness4: () => 'Brightness4 Icon',
  Brightness7: () => 'Brightness7 Icon',
}))
