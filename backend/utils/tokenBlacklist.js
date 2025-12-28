// Token blacklist stored in memory
// Note: This will be cleared on server restart
// For production, consider using Redis or a database
const blacklist = new Set();

exports.addToBlacklist = (token) => {
  blacklist.add(token);
};

exports.isBlacklisted = (token) => {
  return blacklist.has(token);
};

exports.removeFromBlacklist = (token) => {
  blacklist.delete(token);
};

