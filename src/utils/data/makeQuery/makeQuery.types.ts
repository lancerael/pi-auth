/**
 * Options for making a PG query using the makeQuery function.
 * @interface QueryOptions
 */
export interface QueryOptions {
  /**
   * A custom SQL query to be executed.
   */
  customQuery?: string

  /**
   * An array of messages for success and error logging.
   * The first element is the success message, and the second is the error message.
   */
  messages?: [string, string]

  /**
   * An object representing column replacements in the query.
   * Each key is the placeholder in the query, and its value is the replacement value.
   */
  cols?: Record<string, string>

  /**
   * An object or array representing parameterized values for the query.
   * If it's an object, keys are placeholders, and values are the corresponding values.
   * If it's an array, values are used directly as parameters in the order they appear in the query.
   */
  args?: Record<string, string> | string[]
}
