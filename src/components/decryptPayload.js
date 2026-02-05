import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_QR_SECRET;
const HMAC_KEY = process.env.REACT_APP_QR_HMAC;

/**
 * Decrypt and validate QR token
 * @param {string} token
 * @returns {object} payload
 */
export function decryptPayload(token) {
  if (!token || typeof token !== "string") {
    throw new Error("Missing or invalid token");
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    throw new Error("Invalid token format");
  }

  const [encrypted, signature] = parts;

  // 1️⃣ Verify signature (anti-tampering)
  const expectedSignature = CryptoJS.HmacSHA256(encrypted, HMAC_KEY).toString();

  if (expectedSignature !== signature) {
    throw new Error("Invalid token signature");
  }

  // 2️⃣ Decrypt AES payload
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
  const json = bytes.toString(CryptoJS.enc.Utf8);

  if (!json) {
    throw new Error("Decryption failed");
  }

  const payload = JSON.parse(json);

  // 3️⃣ Optional expiration check
  if (payload.exp && Date.now() > payload.exp) {
    throw new Error("QR token expired");
  }

  return payload;
}
