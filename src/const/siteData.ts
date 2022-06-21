export const config = {
  siteName: 'PASOCOM MUSIC CLUB',
  baseUrl: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000',
  ogImage: 'https://pasoconongaku.club/ogp.jpg',
};

export const meta: StringKeyObject = {
  top: {
    title: config.siteName,
    description: '',
  },
  'activity-log': {
    title: 'アクティビティログ | ' + config.siteName,
    description: '',
  },
  topics: {
    title: 'トピックス | ' + config.siteName,
    description: '',
  },
  member: {
    title: '共創メンバー | ' + config.siteName,
    description: '',
  },
  404: {
    title: '404 Not Found | ' + config.siteName,
    description: '',
  },
  500: {
    title: '500 Page Error | ' + config.siteName,
    description: '',
  },
};

interface StringKeyObject {
  [key: string]: {
    title: string;
    description: string;
  };
}

export const LIST_LIMIT = 8;
