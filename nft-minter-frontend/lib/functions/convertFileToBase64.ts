const convertFileToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    return new Promise((res, rej) => {
        reader.onload = () => {
            res(reader.result)
        }
        reader.onerror = (err) => {
            rej(err)
        }
    })
}

export default convertFileToBase64