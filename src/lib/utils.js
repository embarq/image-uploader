/**
 * @returns {Promise<string>}
 */
 export const blobToBase64 = blob => {
	const reader = new FileReader()
	reader.readAsDataURL(blob)

	return new Promise((resolve, reject) => {
		reader.onerror = (err) => {
			reject(err)
		}
		reader.onloadend = () => {
			resolve(reader.result)
		}
	})
}
