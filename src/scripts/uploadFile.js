import { createFile } from "../scripts/cloudStorage";

export default async function uploadFiles(documents, title) {
  let collectedURL = [];
  for (let doc of documents) {
    let documentName = doc.name;
    let documentPath = `artSchool/${title}/${documentName}`;
    if (doc === null) continue;

    const documentURL = await createFile(documentPath, doc);
    collectedURL.push(documentURL);
  }

  return collectedURL;
}
