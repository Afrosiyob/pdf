import fs from 'fs';
import nodeHtmlToImage from 'node-html-to-image';
import path from 'path';

const generator = async ({ output, content, view = 'index.html' }) => {
  try {
    return await nodeHtmlToImage({
      output,
      html: fs.readFileSync(path.resolve(__dirname + path.sep + 'views' + path.sep + view), 'utf8'),
      content,
      type: 'png',
      quality: 100,
      puppeteerArgs: {
        args: ['--no-sandbox'],
        defaultViewport: {
          width: 876,
          height: 200,
          deviceScaleFactor: 1
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export default generator;
