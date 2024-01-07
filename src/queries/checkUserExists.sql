SELECT *
FROM pi_auth.pi_users
WHERE username = $1
  OR email = $2;