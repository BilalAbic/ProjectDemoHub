import jwt from 'jsonwebtoken';

/**
 * JWT Token Payload Interface
 */
export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Generate JWT access token
 * @param payload - User data to encode in token
 * @returns JWT token string
 */
export const generateAccessToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const expiresIn = process.env.JWT_EXPIRES_IN || '30m'; // Changed from 15m to 30m
  
  // @ts-ignore - JWT library type issue with string literal
  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Generate JWT refresh token
 * @param payload - User data to encode in token
 * @returns JWT token string
 */
export const generateRefreshToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_REFRESH_SECRET;
  
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined in environment variables');
  }

  const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
  
  // @ts-ignore - JWT library type issue with string literal
  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Verify JWT access token
 * @param token - JWT token string
 * @returns Decoded payload
 */
export const verifyAccessToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Verify JWT refresh token
 * @param token - JWT token string
 * @returns Decoded payload
 */
export const verifyRefreshToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_REFRESH_SECRET;
  
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined in environment variables');
  }

  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

/**
 * Decode JWT token without verification (for debugging)
 * @param token - JWT token string
 * @returns Decoded payload
 */
export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch (error) {
    return null;
  }
};
