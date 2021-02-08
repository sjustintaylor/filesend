const express = require("express");
const router = express.Router();

const {
  exchangeTokens,
  createSession,
  deleteSession,
  refreshSession,
} = require("./providers");

/**
 * Email a magic link to the user. While this can be called multiple times, the link can only be used once.
 */
router.get("/", createSession);

/**
 * Create a session for the user by exchanging a magic link token for an authentication and refresh token pair.
 * This will invalidate all previously issued links
 */
router.put("/", exchangeTokens);

/**
 * Destroy a session (log out)
 */
router.delete("/", deleteSession);

/**
 * Refresh the session by using a refresh token.
 * This will invalidate the previous token pair (auth/refresh)
 */
router.patch("/", refreshSession);

module.exports = router;
