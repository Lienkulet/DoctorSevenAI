// ImageCompressor.js
export const compressImage = (file, callback) => {
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
  
        const quality = 0.1; // Adjust quality as needed
        const dataURL = canvas.toDataURL('image/jpeg', quality);
  
        const byteString = atob(dataURL.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const compressedFile = new File([ab], file.name, { type: 'image/jpeg' });
  
        callback(compressedFile);
      };
      img.src = e.target.result;
    };
  
    reader.readAsDataURL(file);
  };