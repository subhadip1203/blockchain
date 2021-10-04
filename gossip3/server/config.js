const CONFIG = {
  REDIS : {
    PORT : 7000,
    HOST : "127.0.0.1", // Redis host
    PASSWORD: 'password123',
    FAMILY:4, // 4 (IPv4) or 6 (IPv6)
    DB: 0,
  },
  REDIS_EXPIRY_SECOND : 10*60 // 10 minutes
  
};

module.exports = CONFIG