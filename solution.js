function cleanBulletsAndJoin() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const paragraphs = body.getParagraphs();

  for (let i = 0; i < paragraphs.length - 1; i++) {
    const current = paragraphs[i];
    const next = paragraphs[i + 1];

    // Only clean list items (bulleted or numbered)
    if (current.getType() === DocumentApp.ElementType.LIST_ITEM) {
      const listItem = current.asListItem();

      // Store original attributes (bullet style, indentation, etc.)
      const attrs = listItem.getAttributes();

      // Trim trailing spaces safely
      const cleanText = listItem.getText().replace(/\s+$/g, "");
      if (cleanText !== listItem.getText()) {
        listItem.setText(cleanText);
        listItem.setAttributes(attrs); // restore bullet style
      }

      // Remove blank line after bullet (only if it's not a list item)
      if (
        next.getText().trim() === "" &&
        next.getType() !== DocumentApp.ElementType.LIST_ITEM
      ) {
        const parent = next.getParent();
        try {
          parent.removeChild(next);
          i--; // adjust index
        } catch (e) {
          Logger.log("Skipped a nested or invalid paragraph: " + e);
        }
      }
    }
  }

  Logger.log("Cleaned bullets and kept original styles intact!");
}


// function cleanBulletsAndJoin() {
//   const doc = DocumentApp.getActiveDocument();
//   const body = doc.getBody();
//   const paragraphs = body.getParagraphs();

//   for (let i = 0; i < paragraphs.length - 1; i++) {
//     const current = paragraphs[i];
//     const next = paragraphs[i + 1];

//     // Only process bullet or numbered list items
//     if (current.getType() === DocumentApp.ElementType.LIST_ITEM) {
//       // Remove trailing spaces
//       const clean = current.getText().replace(/\s+$/g, "");
//       if (clean !== current.getText()) current.setText(clean);

//       // Try to delete a blank next line (like pressing Delete)
//       if (next.getText().trim() === "" && next.getType() !== DocumentApp.ElementType.LIST_ITEM) {
//         const parent = next.getParent();
//         try {
//           parent.removeChild(next); // safer than body.removeChild(next)
//           i--; // Adjust index since we removed one
//         } catch (e) {
//           Logger.log("Skipped a nested or invalid paragraph: " + e);
//         }
//       }
//     }
//   }

//   Logger.log("Blank lines after bullets removed safely (including nested lists).");
// }

