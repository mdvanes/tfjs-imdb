export const loadHostedMetadata = async (url) => {
  console.log('Loading metadata from ' + url);
  try {
    const metadataJson = await fetch(url);
    console.log(metadataJson)
    const metadata = await metadataJson.json();
    // ui.status('Done loading metadata.');
    return metadata;
  } catch (err) {
    console.error(err);
    // ui.status('Loading metadata failed.');
  }
};
