/**
 * Cnovert blob to data-url
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

export const captchaReady = () => {
	if (grecaptcha) {
		return new Promise(resolve =>
			grecaptcha.ready(() => resolve(grecaptcha))
		)
	}

	const err = new Error('grecaptcha is not defined')
	err['code'] = 'missing_grecaptcha'
	return Promise.reject(err)
}
