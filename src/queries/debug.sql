-- psql -U pi_auth_user -d pi_auth_db

SELECT * FROM pi_auth.pi_users;
SELECT * FROM pi_auth.pi_token_whitelist;

SELECT *
FROM pi_auth.pi_token_whitelist
WHERE username = ''
  AND access_token = '';