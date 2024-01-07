SELECT EXISTS (
  SELECT 1
  FROM   information_schema.tables
  WHERE  table_schema = $1
  AND    table_name = $2
) AS exists;