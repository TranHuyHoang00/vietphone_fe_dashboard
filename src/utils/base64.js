const convert_ImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
        const file = imageFile.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = error => {
                reject(error);
            };
            reader.readAsDataURL(file);
        }
    });
};
export {
    convert_ImageToBase64
}