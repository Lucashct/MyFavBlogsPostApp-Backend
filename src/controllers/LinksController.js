import {
  createTableLinks,
  saveLink,
  selectLinks,
  updateLink,
  updateForRemoveLink
} from '../dao/Link.js'
import { getPostsFromRocketSeat, getPostsFromVidaDeGamer } from './WebCrawler.js'

export const linksStorage = async () => {
  await createTableLinks();

  const postsFromRocketSeat = await getPostsFromRocketSeat();
  const postsFromVidaDeGamer = await getPostsFromVidaDeGamer();

  const allPostsCrawled = [...postsFromRocketSeat, ...postsFromVidaDeGamer];

  allPostsCrawled.forEach(content => {
    try {
      saveLink({...content, blog: `${content.blog === 'rocket_seat' ? 'RocketSeat' : 'Vida de Gamer'}`});
    } catch(error) {
      console.log(error);
    }
  });
}

export const selectLinksFromDb = async() => {
  const listOfLinks = await selectLinks();

  return listOfLinks;
}

export const updateLinkFromDb = async(linkReq) => {
  await updateLink(linkReq);

  return { message: 'Link atualizado com sucesso' }
}

export const updateRemoveLinkFromDb = async(linkReq) => {
  await updateForRemoveLink(linkReq);

  return { message: 'Link removido com sucesso' }
}