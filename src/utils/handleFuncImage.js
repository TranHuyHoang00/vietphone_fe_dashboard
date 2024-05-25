export function convertImageToBase64(imageValue, index) {
    return new Promise((resolve, reject) => {
        const file = imageValue.target.files[index ?? 0];
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
