SELECT *
FROM pi_auth.pi_token_whitelist
WHERE {token_type} = $1;