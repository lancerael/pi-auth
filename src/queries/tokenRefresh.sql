INSERT INTO pi_auth.pi_token_whitelist (username, access_token, refresh_token)
VALUES ($1, $2, $3)
ON CONFLICT (username)
DO UPDATE SET
  access_token = $2,
  refresh_token = $3;
