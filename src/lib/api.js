export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('files', file)

  const req = {
    method: 'POST',
    body: formData
  }

  return fetch(`${ import.meta.env.VITE_API_URL }/v1/image/upload`, req)
    .then(res => res.json())
}

export const getImageDisplayUrl = (filePayload) => {
  return `${ import.meta.env.VITE_API_URL }/v1/image/${ filePayload.name }`
}
