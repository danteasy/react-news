const fallbackImg =
    "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";

export const checkImageAccess = (url: string) => {
    return new Promise(resolve => {
        try {
            const image = new Image();
            image.onerror = () => {
                resolve(fallbackImg);
            };
            image.onload = () => {
                resolve(url);
            };
            image.src = url;
        } catch (err) {
            console.log((err as Error).message);
        }
    });
};
