const image_to_base64 = (imageFile) => {
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
    image_to_base64
}