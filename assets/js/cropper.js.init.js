document.addEventListener('DOMContentLoaded', function () {
    const inputImage = document.getElementById('inputImage');
    const image = document.getElementById('cropperimage');
    const saveButton = document.getElementById('saveButton');
    let cropper;

    inputImage.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                if (cropper) {
                    cropper.destroy();
                }
                image.src = event.target.result;
                cropper = new Cropper(image, {
                    aspectRatio: 1 / 1,
                    viewMode: 1,
                    dragMode: 'move',
                    restore: false,
                    guides: true,
                    center: true,
                    highlight: true,
                    cropBoxMovable: true,
                    cropBoxResizable: true,
                    toggleDragModeOnDblclick: false,
                    preview: '.cropperpreview',
                    background: false,
                    zoomOnWheel: false
                });

                // Show the save button after the image is loaded
                saveButton.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Save the cropped image when the button is clicked
    saveButton.addEventListener('click', function () {
        if (cropper) {
            const croppedCanvas = cropper.getCroppedCanvas();
            if (croppedCanvas) {
                // Convert the canvas to a data URL
                const croppedImageURL = croppedCanvas.toDataURL('image/png');

                // Create a temporary link to trigger the download
                const link = document.createElement('a');
                link.href = croppedImageURL;
                link.download = 'yeah.png'; // Set the filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    });
});