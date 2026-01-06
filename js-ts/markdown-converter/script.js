const markdownInputEl = document.getElementById("markdown-input");
const htmlOutputEl = document.getElementById("html-output");
const htmlPreviewEl = document.getElementById("preview");

/**
 * ^     -> Start of the line.
 * (     -> Start of Capture Group
 * \#    -> Matches the literal pound/hash symbol (#). It must be escaped with a backslash.
 * {1,6} -> Quantifier: Matches the preceding item (\#) between 1 and 6 times (for $\text{H}1$ through $\text{H}6$).
 * )     -> End of Capture Group 1 (This captures the # symbols, which we use to determine the heading level).
 * \s*  -> Matches zero or more whitespace characters that follow the hashes.
 * (     -> Start of Capture Group 2.
 * .*    -> Matches any character (.) zero or more times (*) until the end of the line.
 * )     -> End of Capture Group 2 (This captures the actual heading text).
 * $     -> End of the line.
 * /g   -> Global flag: Finds all matches in the string, not just the first one.
 * /m   -> Multiline flag: Makes ^ and $ match the start and end of each line instead of just the start and end of the entire string.
 *
 **/

const regexPatterns = [
  {
    hashRegex: /^(\#{1,6})\s*(.*)$/gm,
    boldRegex: /(\*{2}|\_{2})(.*)(\*{2}|\_{2})/gm,
    italicRegex: /(\*{1}|\_{1})(.*)(\*{1}|\_{1})/gm,
    imageRegex: /!\[(.*?)\]\((.*?)\)/gm,
    linkRegex: /\[(.*?)\]\((.*?)\)/gm,
    quoteRegex: /^(\>)\s*(.*)$/gm,
  },
];

const convertMarkdown = () => {
  let conversionResult = markdownInputEl.value;
  regexPatterns.forEach(
    ({ hashRegex, boldRegex, italicRegex, imageRegex, linkRegex, quoteRegex }) => {
      switch (true) {
        case hashRegex.test(conversionResult):
          conversionResult = conversionResult.replace(hashRegex, (_, hashes, content) => {
            const level = hashes.length;
            return `<h${level}>${content}</h${level}>`;
          });
        case boldRegex.test(conversionResult):
          conversionResult = conversionResult.replace(boldRegex, (_, __, content) => {
            return `<strong>${content}</strong>`;
          });
        case italicRegex.test(conversionResult):
          conversionResult = conversionResult.replace(italicRegex, (_, __, content) => {
            return `<em>${content}</em>`;
          });
        case quoteRegex.test(conversionResult):
          conversionResult = conversionResult.replace(quoteRegex, (_, __, content) => {
            return `<blockquote>${content}</blockquote>`;
          });
        case imageRegex.test(conversionResult):
          conversionResult = conversionResult.replace(imageRegex, (_, altText, url) => {
            return `<img alt="${altText}" src="${url}">`;
          });
        case linkRegex.test(conversionResult):
          conversionResult = conversionResult.replace(linkRegex, (_, linkText, url) => {
            return `<a href="${url}">${linkText}</a>`;
          });
        default:
          return conversionResult;
      }
    }
  );
  return conversionResult;
};

markdownInputEl.addEventListener("input", () => {
  const html = convertMarkdown();
  htmlOutputEl.innerText = html;
  htmlPreviewEl.innerHTML = html;
});
