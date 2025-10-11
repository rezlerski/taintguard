import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      all: true,
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/__tests__/**',
        'src/**/*.d.ts',
        'src/**/index.ts',
        'examples/**',
        'test/**'
      ],
      lines: 80,
      functions: 80,
      branches: 70,
      statements: 80
    }
  }
});
