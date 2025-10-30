import { describe, it, expect } from 'vitest';

describe('Example Test Suite', () => {
  describe('Basic Math', () => {
    it('should add two numbers correctly', () => {
      expect(1 + 1).toBe(2);
    });

    it('should subtract two numbers correctly', () => {
      expect(5 - 3).toBe(2);
    });

    it('should multiply two numbers correctly', () => {
      expect(3 * 4).toBe(12);
    });
  });

  describe('String Operations', () => {
    it('should concatenate strings', () => {
      expect('Hello' + ' ' + 'World').toBe('Hello World');
    });

    it('should check string length', () => {
      expect('test'.length).toBe(4);
    });

    it('should convert to uppercase', () => {
      expect('hello'.toUpperCase()).toBe('HELLO');
    });
  });

  describe('Array Operations', () => {
    it('should create an array', () => {
      const arr = [1, 2, 3];
      expect(arr).toHaveLength(3);
    });

    it('should filter array', () => {
      const arr = [1, 2, 3, 4, 5];
      const filtered = arr.filter(n => n > 3);
      expect(filtered).toEqual([4, 5]);
    });

    it('should map array', () => {
      const arr = [1, 2, 3];
      const mapped = arr.map(n => n * 2);
      expect(mapped).toEqual([2, 4, 6]);
    });
  });

  describe('Object Operations', () => {
    it('should create an object', () => {
      const obj = { name: 'Test', value: 123 };
      expect(obj.name).toBe('Test');
      expect(obj.value).toBe(123);
    });

    it('should check object properties', () => {
      const obj = { a: 1, b: 2 };
      expect(obj).toHaveProperty('a');
      expect(obj).toHaveProperty('b');
    });

    it('should compare objects', () => {
      const obj1 = { x: 1, y: 2 };
      const obj2 = { x: 1, y: 2 };
      expect(obj1).toEqual(obj2);
    });
  });

  describe('Boolean Logic', () => {
    it('should evaluate true', () => {
      expect(true).toBe(true);
    });

    it('should evaluate false', () => {
      expect(false).toBe(false);
    });

    it('should evaluate truthy values', () => {
      expect('hello').toBeTruthy();
      expect(1).toBeTruthy();
      expect([]).toBeTruthy();
    });

    it('should evaluate falsy values', () => {
      expect('').toBeFalsy();
      expect(0).toBeFalsy();
      expect(null).toBeFalsy();
      expect(undefined).toBeFalsy();
    });
  });
});
