import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '@/utils/catchAsync';

describe('catchAsync Utility', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  it('should call the async function with req, res, next', async () => {
    const asyncFn = jest.fn().mockResolvedValue(undefined);
    const wrappedFn = catchAsync(asyncFn);

    await wrappedFn(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(asyncFn).toHaveBeenCalledWith(mockRequest, mockResponse, mockNext);
  });

  it('should not call next if async function succeeds', async () => {
    const asyncFn = jest.fn().mockResolvedValue({ success: true });
    const wrappedFn = catchAsync(asyncFn);

    await wrappedFn(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next with error if async function throws', async () => {
    const error = new Error('Test error');
    const asyncFn = jest.fn().mockRejectedValue(error);
    const wrappedFn = catchAsync(asyncFn);

    await wrappedFn(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it('should handle multiple errors correctly', async () => {
    const error1 = new Error('First error');
    const error2 = new Error('Second error');

    const asyncFn1 = jest.fn().mockRejectedValue(error1);
    const asyncFn2 = jest.fn().mockRejectedValue(error2);

    const wrappedFn1 = catchAsync(asyncFn1);
    const wrappedFn2 = catchAsync(asyncFn2);

    await wrappedFn1(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );
    expect(mockNext).toHaveBeenCalledWith(error1);

    mockNext = jest.fn(); // Reset mock

    await wrappedFn2(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );
    expect(mockNext).toHaveBeenCalledWith(error2);
  });

  it('should call async function and handle promise', async () => {
    const returnValue = { data: 'test data' };
    const asyncFn = jest.fn().mockResolvedValue(returnValue);
    const wrappedFn = catchAsync(asyncFn);

    // catchAsync doesn't return the value, it just handles the promise
    wrappedFn(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    // Wait for promise to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(asyncFn).toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle async functions that return undefined', async () => {
    const asyncFn = jest.fn().mockResolvedValue(undefined);
    const wrappedFn = catchAsync(asyncFn);

    wrappedFn(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    // Wait for promise to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(asyncFn).toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle async functions with custom error types', async () => {
    class CustomError extends Error {
      statusCode: number;
      constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
      }
    }

    const customError = new CustomError('Custom error', 400);
    const asyncFn = jest.fn().mockRejectedValue(customError);
    const wrappedFn = catchAsync(asyncFn);

    await wrappedFn(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).toHaveBeenCalledWith(customError);
    expect((mockNext as jest.Mock).mock.calls[0][0].statusCode).toBe(400);
  });

  it('should work with async functions that use request data', async () => {
    mockRequest = {
      body: { name: 'Test' },
      params: { id: '123' },
      query: { filter: 'active' },
    };

    const asyncFn = jest.fn(async (req: Request) => {
      return {
        body: req.body,
        params: req.params,
        query: req.query,
      };
    });

    const wrappedFn = catchAsync(asyncFn);

    wrappedFn(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    // Wait for promise to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(asyncFn).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      mockNext
    );
    expect(mockNext).not.toHaveBeenCalled();
  });
});
