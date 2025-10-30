import { describe, it, expect, vi } from 'vitest';
import {
  formatDate,
  truncateString,
  getInitials,
  isValidUrl,
  debounce,
  generateId,
  capitalize,
  isEmpty,
} from './utils';

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const result = formatDate('2023-01-15');
      expect(result).toBe('Jan 2023');
    });

    it('should handle custom format options', () => {
      const result = formatDate('2023-01-15', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      expect(result).toContain('January');
      expect(result).toContain('15');
      expect(result).toContain('2023');
    });

    it('should handle invalid date', () => {
      const result = formatDate('invalid-date');
      expect(result).toBe('Invalid Date');
    });
  });

  describe('truncateString', () => {
    it('should truncate long strings', () => {
      const result = truncateString('This is a very long string', 10);
      expect(result).toBe('This is a ...');
    });

    it('should not truncate short strings', () => {
      const result = truncateString('Short', 10);
      expect(result).toBe('Short');
    });

    it('should handle exact length', () => {
      const result = truncateString('Exactly10!', 10);
      expect(result).toBe('Exactly10!');
    });

    it('should handle empty string', () => {
      const result = truncateString('', 10);
      expect(result).toBe('');
    });
  });

  describe('getInitials', () => {
    it('should get initials from full name', () => {
      expect(getInitials('John Doe')).toBe('JD');
    });

    it('should get initials from single name', () => {
      expect(getInitials('John')).toBe('J');
    });

    it('should get initials from three names', () => {
      expect(getInitials('John Michael Doe')).toBe('JM');
    });

    it('should convert to uppercase', () => {
      expect(getInitials('john doe')).toBe('JD');
    });

    it('should handle empty string', () => {
      expect(getInitials('')).toBe('');
    });
  });

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://example.com/path')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not a url')).toBe(false);
      expect(isValidUrl('example.com')).toBe(false);
      expect(isValidUrl('')).toBe(false);
    });

    it('should handle special protocols', () => {
      expect(isValidUrl('ftp://example.com')).toBe(true);
      expect(isValidUrl('mailto:test@example.com')).toBe(true);
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', async () => {
      vi.useFakeTimers();
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);

      vi.useRealTimers();
    });

    it('should pass arguments correctly', async () => {
      vi.useFakeTimers();
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('arg1', 'arg2');

      vi.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');

      vi.useRealTimers();
    });
  });

  describe('generateId', () => {
    it('should generate a string', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
    });

    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('should generate IDs of consistent length', () => {
      const id = generateId();
      expect(id.length).toBe(7);
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should lowercase rest of string', () => {
      expect(capitalize('HELLO')).toBe('Hello');
    });

    it('should handle single character', () => {
      expect(capitalize('h')).toBe('H');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle mixed case', () => {
      expect(capitalize('hELLo')).toBe('Hello');
    });
  });

  describe('isEmpty', () => {
    it('should detect null and undefined', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });

    it('should detect empty strings', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
    });

    it('should detect non-empty strings', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty(' hello ')).toBe(false);
    });

    it('should detect empty arrays', () => {
      expect(isEmpty([])).toBe(true);
    });

    it('should detect non-empty arrays', () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
    });

    it('should detect empty objects', () => {
      expect(isEmpty({})).toBe(true);
    });

    it('should detect non-empty objects', () => {
      expect(isEmpty({ a: 1 })).toBe(false);
    });

    it('should handle numbers', () => {
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(123)).toBe(false);
    });

    it('should handle booleans', () => {
      expect(isEmpty(false)).toBe(false);
      expect(isEmpty(true)).toBe(false);
    });
  });
});
