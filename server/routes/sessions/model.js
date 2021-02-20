const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  userID: { type: String, unique: true, required: true },
  inviteCode: { type: String, unique: true, required: true },
  invitedBy: { type: String, unique: true, required: false },
  magicLinkJTIWhitelist: [
    {
      jti: { type: String, required: true },
      issuedAt: { type: Date, required: true },
    },
  ],
  refreshToken: {
    jti: { type: String, unique: true },
    issuedAt: { type: Date },
    expires: { type: Date },
  },
});

sessionSchema.statics.findSession = async function (key, value) {
  let session = await this.findOne({ [key]: value });
  return session;
};

module.exports = mongoose.model("sessions", sessionSchema);
