const API_URL = import.meta.env.VITE_API_URL

export const uploadFile = async (file, token) => {
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
    .then(res => res.json())
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
    .then(res => res.json())
}
