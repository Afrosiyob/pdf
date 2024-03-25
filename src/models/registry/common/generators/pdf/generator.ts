import * as configs from '../../../../../common/configs';

import fs from 'fs';
import nunjucks from 'nunjucks';
import path from 'path';
import puppeteer from 'puppeteer';

const generator = async ({ dir, filePath, content }) => {
  if (configs.global.env !== 'development') {
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const htmlContent = await html({ content });
  const footer = await htmlFooter();

  return new Promise((resolve, reject) => {
    pdf({ content: htmlContent, filePath, footer })
      .then(() => resolve(filePath))
      .catch(e => reject(e));
  });
};

const pdf = async ({ filePath, content, footer }) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    defaultViewport: null
  });
  const page = await browser.newPage();

  await page.goto('data:text/html;charset=UTF-8,', { waitUntil: ['domcontentloaded', 'networkidle2'] });
  await page.setContent(content);

  await page.pdf({
    path: filePath,
    width: 842,
    height: 595,
    displayHeaderFooter: true,
    footerTemplate: footer,
    printBackground: true,
    scale: 1
  });
  await browser.close();
};

const html = ({ content }) => {
  nunjucks.configure(path.join(__dirname, '/views'), {
    autoescape: true
  });

  return new Promise(resolve => {
    resolve(nunjucks.render('index.html', content));
  });
};

const htmlFooter = () => {
  nunjucks.configure(path.join(__dirname, '/views'), {
    autoescape: true
  });

  return new Promise(resolve => {
    resolve(nunjucks.render('footer.html'));
  });
};

export default generator;
