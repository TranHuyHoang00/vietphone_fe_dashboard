export function image_to_base64(imageFile, index) {
    return new Promise((resolve, reject) => {
        const file = imageFile.target.files[(index === null || index === undefined) ? 0 : index];
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
