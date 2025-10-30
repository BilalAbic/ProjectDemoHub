import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
  JwtPayload,
} from '@/utils/jwt';

describe('JWT Utilities', () => {
  const mockPayload: JwtPayload = {
    userId: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
    role: 'admin',
  };

  describe('generateAccessToken', () => {
    it('should generate a valid access token', () => {
      const token = generateAccessToken(mockPayload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    it('should throw error if JWT_SECRET is not defined', () => {
      const originalSecret = process.env.JWT_SECRET;
      delete process.env.JWT_SECRET;

      expect(() => generateAccessToken(mockPayload)).toThrow(
        'JWT_SECRET is not defined in environment variables'
      );

      process.env.JWT_SECRET = originalSecret;
    });

    it('should generate different tokens for different payloads', () => {
      const token1 = generateAccessToken(mockPayload);
      const token2 = generateAccessToken({
        ...mockPayload,
        userId: 'different-id',
      });

      expect(token1).not.toBe(token2);
    });
  });

  describe('generateRefreshToken', () => {
    it('should generate a valid refresh token', () => {
      const token = generateRefreshToken(mockPayload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });

    it('should throw error if JWT_REFRESH_SECRET is not defined', () => {
      const originalSecret = process.env.JWT_REFRESH_SECRET;
      delete process.env.JWT_REFRESH_SECRET;

      expect(() => generateRefreshToken(mockPayload)).toThrow(
        'JWT_REFRESH_SECRET is not defined in environment variables'
      );

      process.env.JWT_REFRESH_SECRET = originalSecret;
    });
  });

  describe('verifyAccessToken', () => {
    it('should verify a valid access token', () => {
      const token = generateAccessToken(mockPayload);
      const decoded = verifyAccessToken(token);

      expect(decoded).toBeDefined();
      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.email).toBe(mockPayload.email);
      expect(decoded.role).toBe(mockPayload.role);
    });

    it('should throw error for invalid token', () => {
      expect(() => verifyAccessToken('invalid-token')).toThrow(
        'Invalid or expired token'
      );
    });

    it('should throw error for expired token', () => {
      // Create a token that expires immediately
      const originalExpiry = process.env.JWT_EXPIRES_IN;
      process.env.JWT_EXPIRES_IN = '0s';
      
      const token = generateAccessToken(mockPayload);
      
      // Wait a bit to ensure expiration
      setTimeout(() => {
        expect(() => verifyAccessToken(token)).toThrow(
          'Invalid or expired token'
        );
      }, 100);

      process.env.JWT_EXPIRES_IN = originalExpiry;
    });

    it('should throw error if JWT_SECRET is not defined', () => {
      const originalSecret = process.env.JWT_SECRET;
      delete process.env.JWT_SECRET;

      expect(() => verifyAccessToken('some-token')).toThrow(
        'JWT_SECRET is not defined in environment variables'
      );

      process.env.JWT_SECRET = originalSecret;
    });
  });

  describe('verifyRefreshToken', () => {
    it('should verify a valid refresh token', () => {
      const token = generateRefreshToken(mockPayload);
      const decoded = verifyRefreshToken(token);

      expect(decoded).toBeDefined();
      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.email).toBe(mockPayload.email);
      expect(decoded.role).toBe(mockPayload.role);
    });

    it('should throw error for invalid refresh token', () => {
      expect(() => verifyRefreshToken('invalid-token')).toThrow(
        'Invalid or expired refresh token'
      );
    });

    it('should throw error if JWT_REFRESH_SECRET is not defined', () => {
      const originalSecret = process.env.JWT_REFRESH_SECRET;
      delete process.env.JWT_REFRESH_SECRET;

      expect(() => verifyRefreshToken('some-token')).toThrow(
        'JWT_REFRESH_SECRET is not defined in environment variables'
      );

      process.env.JWT_REFRESH_SECRET = originalSecret;
    });
  });

  describe('decodeToken', () => {
    it('should decode a valid token without verification', () => {
      const token = generateAccessToken(mockPayload);
      const decoded = decodeToken(token);

      expect(decoded).toBeDefined();
      expect(decoded?.userId).toBe(mockPayload.userId);
      expect(decoded?.email).toBe(mockPayload.email);
      expect(decoded?.role).toBe(mockPayload.role);
    });

    it('should return null for invalid token', () => {
      const decoded = decodeToken('invalid-token');
      expect(decoded).toBeNull();
    });

    it('should decode expired token without throwing error', () => {
      const originalExpiry = process.env.JWT_EXPIRES_IN;
      process.env.JWT_EXPIRES_IN = '0s';
      
      const token = generateAccessToken(mockPayload);
      const decoded = decodeToken(token);

      expect(decoded).toBeDefined();
      expect(decoded?.userId).toBe(mockPayload.userId);

      process.env.JWT_EXPIRES_IN = originalExpiry;
    });
  });

  describe('Token Integration', () => {
    it('should generate and verify access token successfully', () => {
      const token = generateAccessToken(mockPayload);
      const decoded = verifyAccessToken(token);

      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.email).toBe(mockPayload.email);
      expect(decoded.role).toBe(mockPayload.role);
    });

    it('should generate and verify refresh token successfully', () => {
      const token = generateRefreshToken(mockPayload);
      const decoded = verifyRefreshToken(token);

      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.email).toBe(mockPayload.email);
      expect(decoded.role).toBe(mockPayload.role);
    });

    it('should not verify access token with refresh secret', () => {
      const token = generateAccessToken(mockPayload);
      
      expect(() => verifyRefreshToken(token)).toThrow(
        'Invalid or expired refresh token'
      );
    });

    it('should not verify refresh token with access secret', () => {
      const token = generateRefreshToken(mockPayload);
      
      expect(() => verifyAccessToken(token)).toThrow(
        'Invalid or expired token'
      );
    });
  });
});
