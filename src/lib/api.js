
export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('files', file)

  return fetch(`${ import.meta.VITE_API_URL }/v1/image/upload`, {
    body: formData
  })
}
