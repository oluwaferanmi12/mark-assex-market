function encryptAES256(encryptionKey: string, paymentData: string) {
  //   const iv = crypto.randomBytes(16);
  //   const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, iv);
  //   const encrypted = cipher.update(paymentData);
  //   const ivToHex = iv.toString('hex');
  //   const encryptedToHex = Buffer.concat([encrypted, cipher.final()]).toString('hex');
  //   return ⁠ ${ivToHex}:${encryptedToHex}:${cipher.getAuthTag().toString('hex')} ⁠;
}
