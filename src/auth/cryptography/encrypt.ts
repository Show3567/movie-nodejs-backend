import crypto from "node:crypto";

export const encryptWithPublicKey = (
	publicKey:
		| crypto.RsaPublicKey
		| crypto.RsaPrivateKey
		| crypto.KeyLike,
	message:
		| WithImplicitCoercion<string>
		| { [Symbol.toPrimitive](hint: "string"): string }
) => {
	const bufferMessage = Buffer.from(message, "utf-8");
	return crypto.publicEncrypt(publicKey, bufferMessage);
};
