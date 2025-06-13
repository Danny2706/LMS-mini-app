export async function parseForm(request) {
  const formData = await request.formData()

  const fields = {}
  const files = {}

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      const arrayBuffer = await value.arrayBuffer()
      files[key] = {
        filename: value.name,
        mimetype: value.type,
        buffer: Buffer.from(arrayBuffer),
      }
    } else {
      fields[key] = value
    }
  }

  return { fields, files }
}
