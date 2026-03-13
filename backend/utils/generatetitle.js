const generateTitle = (errorText) => {
    //  take first line
    const firstLine = errorText.split("\n")[0];

    // remove extra spaces
    const cleaned = firstLine.trim();

    // limit length for sidebar
    const title = cleaned.slice(0, 50);

    return title || "Error Explanation";
}
export default generateTitle