export function compareVersions(currentVersion: string, latestVersion: string) {
  // Split the version strings into components
  const currentComponents = currentVersion.split(".");
  const latestComponents = latestVersion.split(".");

  // Convert the components to integers for numerical comparison
  const currentA = parseInt(currentComponents[0]);
  const currentB = parseInt(currentComponents[1]);
  const currentC = parseInt(currentComponents[2]);

  const latestA = parseInt(latestComponents[0]);
  const latestB = parseInt(latestComponents[1]);
  const latestC = parseInt(latestComponents[2]);

  // Compare the components
  if (latestA > currentA) {
    return true;
  }
  if (latestB > currentB) {
    return true;
  }
  if (latestC - currentC > 1) {
    return true;
  }
  return false;
}
