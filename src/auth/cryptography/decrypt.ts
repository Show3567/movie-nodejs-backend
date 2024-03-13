import crypto from "node:crypto";

export const decryptWithPrivateKey = (
	privateKey: crypto.RsaPrivateKey | crypto.KeyLike,
	encryptedMessage: NodeJS.ArrayBufferView
) => {
	return crypto.privateDecrypt(privateKey, encryptedMessage);
};
