SELECT password_hash
FROM pi_auth.pi_users
WHERE username = $1;