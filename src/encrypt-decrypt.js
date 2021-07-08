const crypto = require("crypto");

const algorithm = "aes-256-ctr";
const seperator = "::";

function encrypt(text, secretKey) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + seperator + encrypted.toString("hex");
}

function decrypt(text, secretKey) {
  try {
    const textParts = text.split(seperator);
    const iv = Buffer.from(textParts[0], "hex");
    const encryptedText = Buffer.from(textParts[1], "hex");
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (e) {
    console.log("unable to decrypt... master password might be wrong!");
    return null;
  }
}

module.exports = { encrypt, decrypt };
