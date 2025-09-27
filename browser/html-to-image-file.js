// This code doesn't work because of some limitation e.g. cors issue.
function convertHTMLToImageFile(html, width = 300, height = 450, type = "image/png") {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <foreignObject>
            <div xmlns="http://www.w3.org/1999/xhtml">${html}</div>
        </foreignObject>
    </svg>
    `;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  return new Promise((res, rej) => {
    const img = new Image();
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    img.onload = function () {
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((b) => (b ? res(b) : rej("Failed to convert HTML to image")), type);
      URL.revokeObjectURL(url);
    };

    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      rej(new Error("Failed to load SVG image into Canvas"));
    };

    img.crossOrigin = "anonymous";
    img.src = url;
  });
}
