import { validateArtifact } from '../scripts/validate-artifact.mjs';

describe('Artifact Validation', () => {
  test('should validate correct artifact structure', () => {
    const result = validateArtifact({ version: '1.0.0' });
    expect(result.valid).toBe(true);
  });

  test('should fail on missing version', () => {
    const result = validateArtifact({});
    expect(result.valid).toBe(false);
  });
});
