/**
 * Structured Logging System
 *
 * Centralized logging using Pino for structured, performant logging
 * across the application. Replaces console.log with proper structured logging.
 *
 * @module lib/logging/logger
 */

import pino from 'pino'
import type { Logger as PinoLogger } from 'pino'

/**
 * Log context for adding metadata to log entries
 */
export interface LogContext {
  [key: string]: unknown
  requestId?: string
  userId?: string
  namespace?: string
  resourceType?: string
  resourceName?: string
  duration?: number
  statusCode?: number
}

/**
 * Log levels (Pino standard)
 */
export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'

/**
 * Environment-based configuration
 */
const isDevelopment = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'
const logLevel = (process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info')) as LogLevel

/**
 * Create base Pino logger instance
 */
function createLogger(): PinoLogger {
  // In test environment, create a silent logger
  if (isTest) {
    return pino({ level: 'silent' })
  }

  // Development configuration with pretty printing
  if (isDevelopment) {
    return pino({
      level: logLevel,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
          singleLine: false,
        },
      },
    })
  }

  // Production configuration with JSON output
  return pino({
    level: logLevel,
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() }
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  })
}

/**
 * Base logger instance
 */
export const baseLogger = createLogger()

/**
 * Logger class with convenience methods
 */
export class Logger {
  private logger: PinoLogger
  private defaultContext: LogContext

  constructor(context: LogContext = {}) {
    this.logger = baseLogger
    this.defaultContext = context
  }

  /**
   * Create a child logger with additional context
   */
  child(context: LogContext): Logger {
    const childLogger = new Logger({
      ...this.defaultContext,
      ...context,
    })
    childLogger.logger = this.logger.child(context)
    return childLogger
  }

  /**
   * Log at trace level (very detailed, usually disabled in production)
   */
  trace(message: string, context?: LogContext): void {
    this.logger.trace({ ...this.defaultContext, ...context }, message)
  }

  /**
   * Log at debug level (detailed information for debugging)
   */
  debug(message: string, context?: LogContext): void {
    this.logger.debug({ ...this.defaultContext, ...context }, message)
  }

  /**
   * Log at info level (general informational messages)
   */
  info(message: string, context?: LogContext): void {
    this.logger.info({ ...this.defaultContext, ...context }, message)
  }

  /**
   * Log at warn level (warning messages that don't prevent operation)
   */
  warn(message: string, context?: LogContext): void {
    this.logger.warn({ ...this.defaultContext, ...context }, message)
  }

  /**
   * Log at error level (error messages)
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext: LogContext = {
      ...this.defaultContext,
      ...context,
    }

    if (error instanceof Error) {
      errorContext.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      }
    } else if (error) {
      errorContext.error = error
    }

    this.logger.error(errorContext, message)
  }

  /**
   * Log at fatal level (critical errors that require immediate attention)
   */
  fatal(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext: LogContext = {
      ...this.defaultContext,
      ...context,
    }

    if (error instanceof Error) {
      errorContext.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      }
    } else if (error) {
      errorContext.error = error
    }

    this.logger.fatal(errorContext, message)
  }

  /**
   * Log HTTP request
   */
  httpRequest(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    context?: LogContext
  ): void {
    this.info('HTTP Request', {
      ...context,
      method,
      path,
      statusCode,
      duration,
    })
  }

  /**
   * Log Kubernetes API call
   */
  k8sApiCall(
    operation: string,
    resourceType: string,
    resourceName: string,
    namespace: string | undefined,
    duration: number,
    success: boolean,
    context?: LogContext
  ): void {
    const logFn = success ? this.debug.bind(this) : this.error.bind(this)
    logFn(`K8s API: ${operation}`, {
      ...context,
      operation,
      resourceType,
      resourceName,
      namespace,
      duration,
      success,
    })
  }

  /**
   * Log GitHub API call
   */
  githubApiCall(
    operation: string,
    owner: string,
    repo: string,
    duration: number,
    success: boolean,
    context?: LogContext
  ): void {
    const logFn = success ? this.debug.bind(this) : this.error.bind(this)
    logFn(`GitHub API: ${operation}`, {
      ...context,
      operation,
      owner,
      repo,
      duration,
      success,
    })
  }

  /**
   * Log rate limit hit
   */
  rateLimitHit(identifier: string, endpoint: string, limit: number, context?: LogContext): void {
    this.warn('Rate limit hit', {
      ...context,
      identifier,
      endpoint,
      limit,
    })
  }

  /**
   * Log authentication event
   */
  authEvent(event: string, userId?: string, success: boolean = true, context?: LogContext): void {
    const logFn = success ? this.info.bind(this) : this.warn.bind(this)
    logFn(`Auth: ${event}`, {
      ...context,
      event,
      userId,
      success,
    })
  }

  /**
   * Log database query
   */
  dbQuery(query: string, duration: number, success: boolean, context?: LogContext): void {
    const logFn = success ? this.debug.bind(this) : this.error.bind(this)
    logFn('Database Query', {
      ...context,
      query: query.substring(0, 200), // Limit query length in logs
      duration,
      success,
    })
  }
}

/**
 * Create a default logger instance
 */
export const logger = new Logger()

/**
 * Create a logger for a specific module
 */
export function createModuleLogger(module: string, context?: LogContext): Logger {
  return logger.child({
    module,
    ...context,
  })
}

/**
 * Create a logger for API routes
 */
export function createApiLogger(route: string, requestId?: string): Logger {
  return logger.child({
    module: 'api',
    route,
    requestId,
  })
}

/**
 * Create a logger for K8s operations
 */
export function createK8sLogger(context?: LogContext): Logger {
  return logger.child({
    module: 'k8s',
    ...context,
  })
}

/**
 * Create a logger for GitHub operations
 */
export function createGitHubLogger(context?: LogContext): Logger {
  return logger.child({
    module: 'github',
    ...context,
  })
}

/**
 * Create a logger for database operations
 */
export function createDbLogger(context?: LogContext): Logger {
  return logger.child({
    module: 'database',
    ...context,
  })
}
