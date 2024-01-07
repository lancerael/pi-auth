import { Pool } from 'pg'
import { readFileSync } from 'fs'
import dotenv from 'dotenv'
import { QueryOptions } from './makeQuery.types'

dotenv.config()

// Keep a pool of PG clients
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
})

// Cache queries once loaded
const queries: Record<string, string> = {}

/**
 * Asynchronously makes a PostgreSQL query.
 *
 * @param {string} queryName - The name of the SQL query (without extension) to execute.
 * @param {Object} options - Query options.
 * @param {string} [options.customQuery] - Custom SQL query string to execute.
 * @param {string[]} options.messages - An array of two strings representing success and error messages.
 * @param {Object} options.cols - Object containing key-value pairs for replacing columns in the SQL query.
 * @param {Object} options.args - Object or array containing query parameters.
 * @returns {Promise<QueryResult>} - A promise that resolves to the query result.
 */
const makeQuery = async (
  queryName: string,
  {
    customQuery,
    messages: [errorMessage, successMessage] = ['', ''],
    cols = {},
    args = {},
  }: QueryOptions = {}
) => {
  // Check for malformed request
  if (Object.keys(args).length && !Object.keys(args).every(Boolean)) {
    console.log('Incorrectly formed request - please try again.')
    return
  }

  const client = await pool.connect()

  // Set up query
  let query: string
  let queryVals: string[] = []
  if (customQuery) {
    query = customQuery
  } else {
    // Load from file if needed
    queries[queryName] ??= readFileSync(
      `./src/queries/${queryName}.sql`,
      'utf8'
    )
    query = queries[queryName]

    // Replace columns if needed
    Object.entries(cols).forEach(([key, val]) => {
      query = query.replace(`{${key}}`, val)
    })
    // Prepare queryVals, from array or object
    if (Array.isArray(args)) {
      queryVals = args
    } else {
      queryVals = (query.match(/\b([a-zA-Z0-9_]+)\s*=\s*\$\d+/g) ?? [])?.map(
        (match) => args[match.split(' = ')[0]]
      )
      if (queryVals.length !== Object.keys(args).length) {
        queryVals = Object.values(args)
      }
    }
  }

  // Get result
  let queryResult
  try {
    queryResult = await client.query(query, queryVals)
    successMessage && console.log(`${successMessage} successfully`)
  } catch (error) {
    errorMessage && console.error(`Error ${errorMessage}:`, error)
  } finally {
    client.release()
  }

  return queryResult
}

export default makeQuery
