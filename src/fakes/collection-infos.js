import imgPBack from "../assets/profile-back.png";
import imgPGorege from "../assets/profile-george.png";
import imgPDraw from "../assets/profile-draw.jpg";
import imgPUta from "../assets/profile-uta.jpg";
import imgPJiaozi from "../assets/profile-jiaozi.jpg";

const collectionInfos = [{
  id: 1,
  title: "想去的地方",
  titleImg: imgPBack,
  desc: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的地方，有五行有五行有五行有五行有五行有五行有五行有五行有五行有五行有五行有五行有五行有五行有五行有五行有五行有五行有五行有五行有五行有五行有五行有五行。',
  state: 1,
  first: {
    id: 1,
    name: "wsWmsw",
    avatar: "/src/assets/avatar.png",
  },
  postsNum: '10',
  keyIdx: 1,
  members: [{
    id: 2,
    name: "wsWmsword",
    avatar: "/src/assets/avatar2.png",
  }, {
    id: 1,
    name: "wsWmsw",
    avatar: "/src/assets/avatar.png",
  }],
}, {
  id: 2,
  title: "中文歌",
  titleImg: imgPGorege,
  desc: 'My favourite Chinese songs. ',
  state: 1,
  first: {
    id: 1,
    name: "wsWmsw",
    avatar: "/src/assets/avatar.png",
  },
  postsNum: '10',
  keyIdx: 1,
  members: [{
    id: 2,
    name: "wsWmsword",
    avatar: "/src/assets/avatar2.png",
  }, {
    id: 1,
    name: "wsWmsw",
    avatar: "/src/assets/avatar.png",
  }],
}, {
  id: 3,
  title: "绘画技巧",
  titleImg: imgPDraw,
  desc: "只要能握笔，就能学会作画！---《素描的诀窍》",
  state: 1,
  first: {
    id: 1,
    name: "wsWmsw",
    avatar: "/src/assets/avatar.png",
  },
  postsNum: '10',
  keyIdx: 1,
  members: [{
    id: 2,
    name: "wsWmsword",
    avatar: "/src/assets/avatar2.png",
  }, {
    id: 1,
    name: "wsWmsw",
    avatar: "/src/assets/avatar.png",
  }],
}, {
  id: 4,
  title: "算法",
  titleImg: imgPUta,
  desc: "我的算法不是最快的，但却是最有爱的。",
  state: 1,
  first: {
    id: 1,
    name: "wsWmsw",
    avatar: "/src/assets/avatar.png",
  },
  postsNum: '10',
  keyIdx: 1,
  members: [{
    id: 2,
    name: "wsWmsword",
    avatar: "/src/assets/avatar2.png",
  }, {
    id: 1,
    name: "wsWmsw",
    avatar: "/src/assets/avatar.png",
  }],
}, {
  id: 5,
  title: "开发",
  titleImg: imgPJiaozi,
  desc: "开发和设计一样，“🎶再来一遍，重复又一遍，跌倒爬起，年复一年，反复演练，推倒重建，闪✨闪✨发光。🎶”。",
  state: 1,
  first: {
    id: 1,
    name: "wsWmsw",
    avatar: "/src/assets/avatar.png",
  },
  postsNum: '10',
  keyIdx: 1,
  members: [{
    id: 2,
    name: "wsWmsword",
    avatar: "/src/assets/avatar2.png",
  }, {
    id: 1,
    name: "wsWmsw",
    avatar: "/src/assets/avatar.png",
  }],
}];

const getCollectionInfoById = id => {
  const numberId = Number(id);
  return new Promise(resolve => {
    setTimeout(() => {
      const matchedInfo = collectionInfos.filter(info => info.id === numberId)[0];
      resolve(matchedInfo);
    }, 700);
  });
};

export default getCollectionInfoById;