export const config = {
  siteName: 'PASOCOM MUSIC CLUB',
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://pasoconongaku.club' : 'http://localhost:3000',
  ogImage: 'https://pmc-hp-git-develop-ishiyamayama.vercel.app/ogp.png',
};

export const meta: StringKeyObject = {
  top: {
    title: config.siteName,
    description: 'ここのテキストどうしますかここのテキストどうしますかここのテキストどうしますかここのテキストどうしますかここのテキストどうしますかここのテキストどうしますかここのテキスト',
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
