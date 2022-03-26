import uniqueId from 'lodash/uniqueId.js';

const parser = new DOMParser();

export default (url) => {
  const parsedDoc = parser.parseFromString(url.data.contents, 'application/xml');
  const feedTitle = parsedDoc.querySelector('channel>title').textContent;
  const feedID = uniqueId();
  const feedDescription = parsedDoc.querySelector('channel>description').textContent;
  const link = url.data.status.url;
  const postTitles = Array.from(parsedDoc.querySelectorAll('item>title')).map((item) => item.textContent);
  const postLinks = Array.from(parsedDoc.querySelectorAll('item>link')).map((item) => item.textContent);
  const postDescr = Array.from(parsedDoc.querySelectorAll('item>description')).map((item) => item.textContent);
  const posts = [];
  for (let i = 0; i < postTitles.length; i += 1) {
    posts.push([postTitles[i], postLinks[i], postDescr[i]]);
  }
  return {
    feedID,
    feedTitle,
    feedDescription,
    link,
    posts,
  };
};