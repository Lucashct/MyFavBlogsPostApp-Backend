import 'dotenv/config'
import puppeteer from 'puppeteer'

const favBlogs = {
  rocketSeat: { name: 'Rocketseat', link: 'https://blog.rocketseat.com.br/' },
  vidaDeGamer: { name: 'Vida de Gamer', link: 'https://www.vidadegamer.com.br/category/games/' }
}

export const getPostsFromRocketSeat = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(favBlogs.rocketSeat.link, {waitUntil: 'load', timeout: 0});

  const selectContentPage = await page.evaluate(() => {
    const divContent = document.querySelectorAll('article div a, article div img');
    
    const arrayDivContent = [...divContent];

    const list = arrayDivContent.map(({ ariaLabel, href, className, src, textContent }) => ({
      ariaLabel, href, className, src, textContent
    })).filter(content => {
      return content.className == 'm-article-card__info-link' || content.className == 'm-article-card__tag' ||
      content.className == 'm-article-card__picture-background';
    });
    
    return list;
  });

  await browser.close();

  let blogPostsObjects = [];
  
  let count = 1;

  let objectPost = {}

  selectContentPage.forEach(content => {
    switch (content.className) {
      case 'm-article-card__picture-background':
        objectPost.srcImage = content.src;
        break;
      case 'm-article-card__tag':
        objectPost.tag = content.textContent;
        break;
      case 'm-article-card__info-link':
        objectPost.linkInfos = { link: content.href, label: content.ariaLabel }
        break;
    }

    if(count === 3) {
      objectPost.blog = 'rocket_seat'
      blogPostsObjects.push(objectPost);

      count = 1;
      objectPost = {};
    } else {
      count += 1;
    }
  });

  return blogPostsObjects;
}

export const getPostsFromVidaDeGamer = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(favBlogs.vidaDeGamer.link, { waitUntil: 'load', timeout: 0 });

  const selectContentPageImg = await page.evaluate(() => {
    const articleImgContent = document.querySelectorAll('div.post-thumbnail a img');

    const arrayArticleImgContent = [...articleImgContent];

    const srcImages = arrayArticleImgContent.map(({src}) => ({
      src
    }));

    return srcImages;
  });

  const selectContentPagePost = await page.evaluate(() => {
    const articlePostTitleContent = document.querySelectorAll('h2.post-title a');

    const arrayArticlePostTitleContent = [...articlePostTitleContent];

    const contentPostTitle = arrayArticlePostTitleContent.map(({ text, href }) => ({
      text, href
    }));

    return contentPostTitle;
  });

  const selectContentPageCategorie = await page.evaluate(() => {
    const articlePostTagContent = document.querySelectorAll('div.post-meta.group p.post-category a');

    const arrayArticlePostTagContent = [...articlePostTagContent];

    const contentPostTag = arrayArticlePostTagContent.map(({ text }) => ({
      text
    }));

    return contentPostTag;
  });

  await browser.close();

  let blogPosts = []

  for(let i = 0; i < selectContentPagePost.length; i++) {
    let post = {}

    post.srcImage = selectContentPageImg[i].src;
    post.tag = selectContentPageCategorie[i].text;
    post.linkInfos = { label: selectContentPagePost[i].text, link: selectContentPagePost[i].href }
    post.blog = 'vida_de_gamer'

    blogPosts.push(post)
  }

  return blogPosts;
}
