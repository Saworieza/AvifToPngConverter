function handleFiles() {
    const fileList = document.getElementById("fileList");
    const files = document.getElementById("files").files;

    fileList.innerHTML = "";

    for (let i = 0; i < files.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = files[i].name;
        fileList.appendChild(listItem);
    }
}

function convertToPNG() {
    const files = document.getElementById("files").files;
    const downloadLinks = document.getElementById("downloadLinks");

    downloadLinks.innerHTML = "";

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(event) {
            const avifData = event.target.result;

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            const img = new Image();

            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);

                canvas.toBlob(function(blob) {
                    const pngUrl = URL.createObjectURL(blob);

                    const downloadLink = document.createElement("a");
                    downloadLink.href = pngUrl;
                    downloadLink.download = file.name.replace(".avif", ".png");
                    downloadLink.textContent = file.name.replace(".avif", ".png");

                    downloadLinks.appendChild(downloadLink);
                    downloadLinks.appendChild(document.createElement("br"));
                }, "image/png");
            };

            img.src = avifData;
        };

        reader.readAsDataURL(file);
    }
}
