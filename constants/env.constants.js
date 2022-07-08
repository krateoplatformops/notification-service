module.exports = {
  PORT: process.env.PORT || 8080,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'krateo-platformops',
  COOKIE_NAME: process.env.COOKIE_NAME || 'krateo-platformops',
  REQUIRE_AUTHENTICATION: process.env.REQUIRE_AUTHENTICATION || 'true'
}
