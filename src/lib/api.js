const API_URL = import.meta.env.VITE_API_URL

/**
 * The method might be used to warp up the api.
 *
 * When apps deployed to free hostings, the hosting provider might put the service
 * to sleep if it's not being used for a period of time.
 * We can call the api to wake up our API earlier so that when a user
 * interacts with our app it will respond quickly (hopefully).
 */
export const ping = () => {
  return fetch(`${ API_URL }/`)
}

/**
 * Convert response body to json for corresponding content type
 * @param {Response} res
 * @returns {string|object}
 */
const handleResponse = (res) => {
  const isJSON = res.headers.get('content-type').includes('application/json')
  return isJSON ? res.json() : res.text()
}

/**
 * Upload a file to the server
 * @param {File} file
 * @param {string} token
 * @returns {Promise<{ name: string }>}
 */
export const uploadFile = (file, token) => {
  const formData = new FormData()
  formData.append('files', file)

  /** @type {ReqeustInit} */
  const req = {
    method: 'POST',
    headers: {
      'authorization': token,
    },
    body: formData
  }

  return fetch(`${ API_URL }/v1/image/upload`, req)
    .then(res => handleResponse(res))
}

export const getImageDisplayUrl = (filePayload) => {
  return `${ API_URL }/v1/image/${ filePayload.name }`
}

/**
 * @param {string} captchaResponse
 * @returns {Promise<{ status: 'success' | 'error', payload: { temp_token?: string } }>}
 */
export const validateCaptcha = (captchaResponse) => {
  /** @type {ReqeustInit} */
  const req = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      response: captchaResponse
    })
  }
  return fetch(`${ API_URL }/v1/validate-recaptcha`, req)
    .then(res => handleResponse(res))
    .then(res => res.json())
}
