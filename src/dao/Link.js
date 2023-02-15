import { openDb } from "../configdb.js";

export async function createTableLinks() {
  openDb().then(db => {
    try {
      db.exec('CREATE TABLE IF NOT EXISTS Links (id INTEGER PRIMARY KEY, label TEXT, link TEXT, blog TEXT, imgSrc TEXT, categorie TEXT, removed BOOLEAN DEFAULT 0, UNIQUE(link))');
    } catch(error) {
      console.log(error);
    }
  })
}

export async function saveLink(link) {
  openDb().then(db => {
    try {
      db.run('INSERT OR IGNORE INTO Links (label, link, blog, imgSrc, categorie) VALUES (?, ?, ?, ?, ?)',
      [link.linkInfos.label, link.linkInfos.link, link.blog, link.srcImage, link.tag]);
    } catch(error) {
      console.log(error);
    }
  });
}

export async function selectLinks() {
  return openDb().then(db => {
    return db.all('SELECT * FROM Links WHERE removed != 1')
      .then(res => res);
  })
}

export async function updateLink(link) {
  openDb().then(db => {
    try {
      db.run('UPDATE links SET label = ?, link = ?, imgSrc = ? WHERE id = ?', 
      [link.label, link.link, link.imgSrc, link.id]);
    } catch(error) {
      console.log(error);
    }
  })
}

export async function updateForRemoveLink(link) {
  openDb().then(db => {
    try {
      db.run('UPDATE links SET removed = 1 WHERE id = ?', [link.id]);
    } catch(error) {
      console.log(error);
    }
  })
}