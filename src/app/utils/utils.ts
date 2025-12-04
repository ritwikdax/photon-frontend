import { SelectedImage } from "../interfaces/data/interface";

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}

export function downloadImageList(
  selectedImages: SelectedImage[],
  projectName?: string
) {
  if (!selectedImages || selectedImages.length === 0) {
    return;
  }

  // Group images by folderId
  const groupedByFolder = selectedImages.reduce((acc, image) => {
    const folderId = image.folderId;
    if (!acc[folderId]) {
      acc[folderId] = {
        folderName: image.folderName,
        images: [],
      };
    }
    acc[folderId].images.push(image.imageFileName);
    return acc;
  }, {} as Record<string, { folderName: string; images: string[] }>);

  // Create formatted text content
  let textContent = `Selected Images for ${projectName || "Project"}\n`;
  textContent += `Total Images: ${selectedImages.length}\n`;
  textContent += `Generated on: ${new Date().toLocaleString()}\n`;
  textContent += "=".repeat(80) + "\n\n";

  // Add each folder section
  Object.entries(groupedByFolder).forEach(([folderId, data], folderIndex) => {
    textContent += `Folder ${folderIndex + 1}: ${data.folderName}\n`;
    textContent += `Image Count: ${data.images.length}\n`;
    textContent += "-".repeat(80) + "\n";

    data.images.forEach((imageName) => {
      textContent += `  ${imageName}\n`;
    });

    textContent += "\n";
  });

  // Add notes section
  const imagesWithNotes = selectedImages.filter(
    (img) => img.note && img.note.trim() !== ""
  );

  if (imagesWithNotes.length > 0) {
    textContent += "=".repeat(80) + "\n";
    textContent += "NOTES\n";
    textContent += "=".repeat(80) + "\n";
    textContent += "\n";

    imagesWithNotes.forEach((image, index) => {
      textContent += `${index + 1}. ${image.imageFileName}\n`;
      textContent += `   Folder: ${image.folderName}\n`;
      textContent += `   Note: ${image.note}\n`;
      textContent += "\n";
    });
  }

  // Create a blob with the text content
  const blob = new Blob([textContent], { type: "text/plain" });

  // Create a download link
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `selected-images-${projectName || "project"}.txt`;

  // Trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
