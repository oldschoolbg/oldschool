'use strict'

module.exports = {
  jwt_hashing_secret : process.env.jwt_hashing_secret || 'franwalsh_phillpaboyens_peterjackson',
  cryptographic_key: process.env.cryptographic_key || '792F423F4528482B4D6251655468576D5A7134743777397A24432646294A404E',
  allow_adhoc_querying: process.env.allow_adhoc_querying || true,
  jwt_refresh : process.env.jwt_refresh || 43200,
  jwt_timeout : process.env.jwt_timeout || 172800
};