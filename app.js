function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const {
  useState,
  useEffect,
  useRef,
  useCallback
} = React;

// ═══════════════════════════════════════════════════════
// FISH DATABASE — 65 species, 8 zones
// quality: 1=普通 2=优质 3=稀有 4=传说
// ═══════════════════════════════════════════════════════
const FISH = {
  // ── 珊瑚礁 浅海 ──
  sardine: {
    n: "沙丁鱼",
    e: "🐟",
    z: "coral",
    d: "shallow",
    hp: 8,
    w: 0.3,
    v: 50,
    xp: 5,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 1,
    desc: "成群游动，极易捕捉",
    cook: "沙丁鱼握寿司",
    basePrice: 80,
    cookTime: 8,
    taste: 1
  },
  starfish: {
    n: "海星",
    e: "⭐",
    z: "coral",
    d: "shallow",
    hp: 5,
    w: 0.6,
    v: 90,
    xp: 6,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 1,
    desc: "静止不动，极易捕捉",
    cook: "海星烤串",
    basePrice: 150,
    cookTime: 10,
    taste: 1
  },
  crab: {
    n: "螃蟹",
    e: "🦀",
    z: "coral",
    d: "shallow",
    hp: 22,
    w: 0.9,
    v: 160,
    xp: 11,
    ag: true,
    dmg: 3,
    rare: false,
    prot: false,
    q: 2,
    desc: "大钳攻击3伤",
    cook: "螃蟹味噌汤",
    basePrice: 280,
    cookTime: 15,
    taste: 2
  },
  clownfish: {
    n: "小丑鱼",
    e: "🐠",
    z: "coral",
    d: "shallow",
    hp: 12,
    w: 0.4,
    v: 220,
    xp: 15,
    ag: false,
    dmg: 0,
    rare: true,
    prot: false,
    q: 3,
    desc: "藏身海葵，珍稀美丽",
    cook: "小丑鱼特制卷",
    basePrice: 780,
    cookTime: 20,
    taste: 3
  },
  puffer: {
    n: "河豚",
    e: "🐡",
    z: "coral",
    d: "shallow",
    hp: 28,
    w: 1.2,
    v: 520,
    xp: 26,
    ag: true,
    dmg: 6,
    rare: false,
    prot: false,
    q: 3,
    desc: "膨胀反击6伤",
    cook: "河豚刺身(危)",
    basePrice: 1200,
    cookTime: 25,
    taste: 4
  },
  seahorse: {
    n: "海马",
    e: "🐴",
    z: "coral",
    d: "shallow",
    hp: 6,
    w: 0.1,
    v: 280,
    xp: 20,
    ag: false,
    dmg: 0,
    rare: true,
    prot: false,
    q: 3,
    desc: "极稀有，游速极慢",
    cook: "海马药膳汤",
    basePrice: 950,
    cookTime: 22,
    taste: 3
  },
  // 珊瑚礁 中层
  jellyfish: {
    n: "水母",
    e: "🪼",
    z: "coral",
    d: "mid",
    hp: 10,
    w: 0.2,
    v: 110,
    xp: 8,
    ag: true,
    dmg: 4,
    rare: false,
    prot: false,
    q: 1,
    desc: "触须麻痹4伤"
  },
  parrotfish: {
    n: "鹦鹉鱼",
    e: "🐠",
    z: "coral",
    d: "mid",
    hp: 35,
    w: 1.8,
    v: 300,
    xp: 20,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 2,
    desc: "色彩鲜艳啃食珊瑚",
    cook: "鹦鹉鱼刺身",
    basePrice: 460,
    cookTime: 14,
    taste: 2
  },
  lionfish: {
    n: "狮子鱼",
    e: "🦁",
    z: "coral",
    d: "mid",
    hp: 55,
    w: 2.0,
    v: 680,
    xp: 40,
    ag: true,
    dmg: 12,
    rare: true,
    prot: false,
    q: 3,
    desc: "毒刺美丽危险12伤",
    cook: "狮子鱼刺身",
    basePrice: 1300,
    cookTime: 22,
    taste: 3
  },
  nudibranch: {
    n: "海蛞蝓",
    e: "🌈",
    z: "coral",
    d: "mid",
    hp: 4,
    w: 0.05,
    v: 350,
    xp: 22,
    ag: false,
    dmg: 0,
    rare: true,
    prot: false,
    q: 3,
    desc: "彩虹色极珍稀",
    cook: "海蛞蝓冻",
    basePrice: 700,
    cookTime: 18,
    taste: 2
  },
  // ── 海藻森林 ──
  mackerel: {
    n: "鲭鱼",
    e: "🐟",
    z: "kelp",
    d: "shallow",
    hp: 20,
    w: 1.0,
    v: 130,
    xp: 11,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 1,
    desc: "穿行海藻之间",
    cook: "鲭鱼押寿司",
    basePrice: 160,
    cookTime: 10,
    taste: 1
  },
  seabream: {
    n: "鲷鱼",
    e: "🐠",
    z: "kelp",
    d: "shallow",
    hp: 30,
    w: 1.5,
    v: 210,
    xp: 16,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 2,
    desc: "肉质鲜美常见鱼类",
    cook: "鲷鱼握寿司",
    basePrice: 320,
    cookTime: 12,
    taste: 2
  },
  flounder: {
    n: "比目鱼",
    e: "🐟",
    z: "kelp",
    d: "shallow",
    hp: 25,
    w: 2.2,
    v: 190,
    xp: 14,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 2,
    desc: "扁平藏于沙底",
    cook: "比目鱼刺身",
    basePrice: 300,
    cookTime: 12,
    taste: 2
  },
  lobster: {
    n: "龙虾",
    e: "🦞",
    z: "kelp",
    d: "shallow",
    hp: 45,
    w: 2.0,
    v: 440,
    xp: 28,
    ag: true,
    dmg: 8,
    rare: false,
    prot: false,
    q: 3,
    desc: "大螯攻击8伤",
    cook: "龙虾全餐",
    basePrice: 1100,
    cookTime: 28,
    taste: 4
  },
  seaurchin: {
    n: "海胆",
    e: "🦔",
    z: "kelp",
    d: "mid",
    hp: 15,
    w: 0.4,
    v: 380,
    xp: 22,
    ag: true,
    dmg: 5,
    rare: false,
    prot: false,
    q: 3,
    desc: "刺扎5伤，肉质极鲜",
    cook: "海胆军舰卷",
    basePrice: 750,
    cookTime: 15,
    taste: 4
  },
  grouper: {
    n: "石斑鱼",
    e: "🐠",
    z: "kelp",
    d: "mid",
    hp: 55,
    w: 4.0,
    v: 460,
    xp: 30,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 2,
    desc: "藏于礁石缝隙",
    cook: "石斑鱼清蒸",
    basePrice: 650,
    cookTime: 20,
    taste: 3
  },
  eel: {
    n: "电鳗",
    e: "🐍",
    z: "kelp",
    d: "mid",
    hp: 70,
    w: 3.0,
    v: 620,
    xp: 38,
    ag: true,
    dmg: 10,
    rare: false,
    prot: false,
    q: 3,
    desc: "电击麻痹10伤",
    cook: "电鳗蒲烧",
    basePrice: 1200,
    cookTime: 22,
    taste: 4
  },
  octopus: {
    n: "章鱼",
    e: "🐙",
    z: "kelp",
    d: "mid",
    hp: 80,
    w: 5.0,
    v: 660,
    xp: 40,
    ag: true,
    dmg: 12,
    rare: false,
    prot: false,
    q: 3,
    desc: "喷墨触手攻击12伤",
    cook: "章鱼小丸子",
    basePrice: 400,
    cookTime: 16,
    taste: 3
  },
  morayeel: {
    n: "海鳗",
    e: "🐍",
    z: "kelp",
    d: "deep",
    hp: 120,
    w: 6.0,
    v: 980,
    xp: 60,
    ag: true,
    dmg: 18,
    rare: false,
    prot: false,
    q: 3,
    desc: "藏洞突袭18伤",
    cook: "海鳗炭烤",
    basePrice: 1600,
    cookTime: 28,
    taste: 4
  },
  // ── 深蓝大洋 ──
  flyingfish: {
    n: "飞鱼",
    e: "🕊️",
    z: "ocean",
    d: "shallow",
    hp: 15,
    w: 0.5,
    v: 200,
    xp: 14,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 2,
    desc: "跃出水面难以瞄准",
    cook: "飞鱼子军舰卷",
    basePrice: 420,
    cookTime: 12,
    taste: 2
  },
  yellowtail: {
    n: "黄尾鱼",
    e: "🐠",
    z: "ocean",
    d: "shallow",
    hp: 40,
    w: 3.0,
    v: 320,
    xp: 22,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 2,
    desc: "成群结队味道鲜美",
    cook: "黄尾鱼刺身",
    basePrice: 520,
    cookTime: 14,
    taste: 2
  },
  tuna: {
    n: "金枪鱼",
    e: "🐟",
    z: "ocean",
    d: "shallow",
    hp: 60,
    w: 8.0,
    v: 900,
    xp: 45,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 3,
    desc: "高速游动难以追踪",
    cook: "金枪鱼大腹刺身",
    basePrice: 980,
    cookTime: 18,
    taste: 4
  },
  dolphin: {
    n: "海豚",
    e: "🐬",
    z: "ocean",
    d: "shallow",
    hp: 100,
    w: 80,
    v: 0,
    xp: 40,
    ag: false,
    dmg: 0,
    rare: true,
    prot: true,
    q: 4,
    desc: "保护动物！拍照+40XP"
  },
  swordfish: {
    n: "旗鱼",
    e: "🐡",
    z: "ocean",
    d: "mid",
    hp: 110,
    w: 15,
    v: 1400,
    xp: 65,
    ag: true,
    dmg: 15,
    rare: false,
    prot: false,
    q: 3,
    desc: "冲刺攻击15伤",
    cook: "旗鱼豪华套餐",
    basePrice: 1800,
    cookTime: 30,
    taste: 4
  },
  manta: {
    n: "魔鬼鱼",
    e: "🦅",
    z: "ocean",
    d: "mid",
    hp: 90,
    w: 20,
    v: 1100,
    xp: 55,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 3,
    desc: "巨大扁平游速缓慢",
    cook: "魔鬼鱼软骨冻",
    basePrice: 1600,
    cookTime: 28,
    taste: 3
  },
  hammerhead: {
    n: "双髻鲨",
    e: "🦈",
    z: "ocean",
    d: "mid",
    hp: 180,
    w: 60,
    v: 2800,
    xp: 120,
    ag: true,
    dmg: 22,
    rare: true,
    prot: false,
    q: 4,
    desc: "360°视野极难逃脱",
    cook: "软骨鱼翅汤",
    basePrice: 4500,
    cookTime: 45,
    taste: 4
  },
  oarfish: {
    n: "皇带鱼",
    e: "🐟",
    z: "ocean",
    d: "deep",
    hp: 200,
    w: 30,
    v: 3500,
    xp: 160,
    ag: false,
    dmg: 0,
    rare: true,
    prot: false,
    q: 4,
    desc: "传说海蛇原型极稀有",
    cook: "皇带鱼极品刺身",
    basePrice: 7500,
    cookTime: 50,
    taste: 5
  },
  whaleshark: {
    n: "鲸鲨",
    e: "🦈",
    z: "ocean",
    d: "deep",
    hp: 400,
    w: 200,
    v: 0,
    xp: 200,
    ag: false,
    dmg: 0,
    rare: true,
    prot: true,
    q: 4,
    desc: "世界最大鱼类保护动物"
  },
  // ── 海底火山 ──
  triggerfish: {
    n: "炮弹鱼",
    e: "🐠",
    z: "volcano",
    d: "mid",
    hp: 40,
    w: 1.5,
    v: 350,
    xp: 22,
    ag: true,
    dmg: 6,
    rare: false,
    prot: false,
    q: 2,
    desc: "领地意识强攻击6伤"
  },
  lavafish: {
    n: "熔岩鱼",
    e: "🔴",
    z: "volcano",
    d: "mid",
    hp: 140,
    w: 6.0,
    v: 1800,
    xp: 85,
    ag: true,
    dmg: 20,
    rare: false,
    prot: false,
    q: 3,
    desc: "高温灼烧20伤",
    cook: "熔岩鱼铁板烧",
    basePrice: 2900,
    cookTime: 35,
    taste: 4
  },
  ventshrip: {
    n: "热泉虾",
    e: "🦐",
    z: "volcano",
    d: "mid",
    hp: 8,
    w: 0.1,
    v: 400,
    xp: 25,
    ag: false,
    dmg: 0,
    rare: true,
    prot: false,
    q: 3,
    desc: "热泉周围特有极珍稀",
    cook: "温泉虾刺身",
    basePrice: 900,
    cookTime: 16,
    taste: 3
  },
  anglerfish: {
    n: "鮟鱇鱼",
    e: "🎣",
    z: "volcano",
    d: "deep",
    hp: 160,
    w: 20,
    v: 2200,
    xp: 100,
    ag: true,
    dmg: 18,
    rare: false,
    prot: false,
    q: 3,
    desc: "发光诱惑后突袭18伤",
    cook: "鮟鱇鱼火锅",
    basePrice: 2800,
    cookTime: 38,
    taste: 4
  },
  viperfish: {
    n: "蝰蛇鱼",
    e: "🐍",
    z: "volcano",
    d: "deep",
    hp: 130,
    w: 4.0,
    v: 1900,
    xp: 90,
    ag: true,
    dmg: 22,
    rare: true,
    prot: false,
    q: 4,
    desc: "超长尖牙22伤深海杀手",
    cook: "蝰蛇鱼黑料理",
    basePrice: 3500,
    cookTime: 40,
    taste: 4
  },
  // ── 北极水域 ──
  icefish: {
    n: "冰鱼",
    e: "🧊",
    z: "arctic",
    d: "shallow",
    hp: 20,
    w: 0.8,
    v: 280,
    xp: 18,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 2,
    desc: "血液防冻晶莹剔透",
    cook: "冰鱼水晶卷",
    basePrice: 500,
    cookTime: 14,
    taste: 2
  },
  pollock: {
    n: "鳕鱼",
    e: "🐟",
    z: "arctic",
    d: "shallow",
    hp: 35,
    w: 2.5,
    v: 220,
    xp: 16,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 2,
    desc: "北极常见肉质白嫩",
    cook: "鳕鱼天妇罗",
    basePrice: 380,
    cookTime: 16,
    taste: 2
  },
  halibut: {
    n: "大比目鱼",
    e: "🐟",
    z: "arctic",
    d: "shallow",
    hp: 50,
    w: 5.0,
    v: 380,
    xp: 26,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 2,
    desc: "巨型扁鱼肉质鲜美",
    cook: "大比目鱼握寿司",
    basePrice: 620,
    cookTime: 18,
    taste: 3
  },
  seal: {
    n: "海豹",
    e: "🦭",
    z: "arctic",
    d: "shallow",
    hp: 80,
    w: 60,
    v: 0,
    xp: 25,
    ag: false,
    dmg: 0,
    rare: false,
    prot: true,
    q: 3,
    desc: "保护动物！拍照+25XP"
  },
  arcticchar: {
    n: "北极红点鲑",
    e: "🐟",
    z: "arctic",
    d: "mid",
    hp: 45,
    w: 3.5,
    v: 480,
    xp: 30,
    ag: false,
    dmg: 0,
    rare: true,
    prot: false,
    q: 3,
    desc: "色泽橙红极为珍贵",
    cook: "北极红鲑刺身",
    basePrice: 900,
    cookTime: 20,
    taste: 3
  },
  beluga: {
    n: "白鲸",
    e: "🐳",
    z: "arctic",
    d: "mid",
    hp: 300,
    w: 400,
    v: 0,
    xp: 100,
    ag: false,
    dmg: 0,
    rare: true,
    prot: true,
    q: 4,
    desc: "保护动物·拍照+100XP"
  },
  polarshark: {
    n: "格陵兰鲨",
    e: "🦈",
    z: "arctic",
    d: "deep",
    hp: 300,
    w: 180,
    v: 4500,
    xp: 200,
    ag: true,
    dmg: 30,
    rare: true,
    prot: false,
    q: 4,
    desc: "迟缓但力大无穷30伤",
    cook: "格陵兰鲨肉冻",
    basePrice: 7000,
    cookTime: 50,
    taste: 4
  },
  narwhal: {
    n: "独角鲸",
    e: "🦄",
    z: "arctic",
    d: "deep",
    hp: 200,
    w: 300,
    v: 0,
    xp: 150,
    ag: false,
    dmg: 0,
    rare: true,
    prot: true,
    q: 4,
    desc: "保护动物·传说之角"
  },
  // ── 沉船区域 ──
  wrasse: {
    n: "濑鱼",
    e: "🐠",
    z: "wreck",
    d: "shallow",
    hp: 18,
    w: 0.6,
    v: 140,
    xp: 10,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 1,
    desc: "色彩斑斓沉船常客",
    cook: "濑鱼握寿司",
    basePrice: 200,
    cookTime: 10,
    taste: 1
  },
  barracuda: {
    n: "梭鱼",
    e: "🐟",
    z: "wreck",
    d: "shallow",
    hp: 65,
    w: 3.5,
    v: 520,
    xp: 34,
    ag: true,
    dmg: 14,
    rare: false,
    prot: false,
    q: 2,
    desc: "高速突袭14伤",
    cook: "梭鱼刺身",
    basePrice: 820,
    cookTime: 16,
    taste: 3
  },
  snapper: {
    n: "笛鲷",
    e: "🐠",
    z: "wreck",
    d: "mid",
    hp: 40,
    w: 2.0,
    v: 260,
    xp: 18,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 2,
    desc: "红色身体礁石藏身",
    cook: "笛鲷握寿司",
    basePrice: 400,
    cookTime: 14,
    taste: 2
  },
  moray: {
    n: "花斑裸胸鳝",
    e: "🐍",
    z: "wreck",
    d: "mid",
    hp: 90,
    w: 4.0,
    v: 780,
    xp: 50,
    ag: true,
    dmg: 16,
    rare: false,
    prot: false,
    q: 3,
    desc: "船舱洞口突袭16伤",
    cook: "花鳝炭烤",
    basePrice: 1300,
    cookTime: 24,
    taste: 3
  },
  treasurefish: {
    n: "宝藏鱼",
    e: "🌟",
    z: "wreck",
    d: "mid",
    hp: 30,
    w: 1.0,
    v: 1500,
    xp: 80,
    ag: false,
    dmg: 0,
    rare: true,
    prot: false,
    q: 4,
    desc: "传说中与宝藏共生",
    cook: "宝藏鱼特制刺身",
    basePrice: 3500,
    cookTime: 35,
    taste: 5
  },
  ghostshark: {
    n: "幽灵鲨",
    e: "🦈",
    z: "wreck",
    d: "deep",
    hp: 250,
    w: 70,
    v: 3800,
    xp: 170,
    ag: true,
    dmg: 26,
    rare: true,
    prot: false,
    q: 4,
    desc: "半透明极难发现26伤",
    cook: "幽灵鲨软骨汤",
    basePrice: 5500,
    cookTime: 45,
    taste: 4
  },
  // ── 红树林 ──
  mudskipper: {
    n: "弹涂鱼",
    e: "🐟",
    z: "mangrove",
    d: "shallow",
    hp: 10,
    w: 0.2,
    v: 120,
    xp: 8,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 1,
    desc: "会爬树的奇特鱼类",
    cook: "弹涂鱼握寿司",
    basePrice: 180,
    cookTime: 10,
    taste: 1
  },
  archerfish: {
    n: "射水鱼",
    e: "🎯",
    z: "mangrove",
    d: "shallow",
    hp: 20,
    w: 0.5,
    v: 200,
    xp: 14,
    ag: true,
    dmg: 2,
    rare: false,
    prot: false,
    q: 2,
    desc: "喷水射击2伤"
  },
  mangrovecat: {
    n: "石首鱼",
    e: "🐠",
    z: "mangrove",
    d: "shallow",
    hp: 30,
    w: 1.2,
    v: 180,
    xp: 13,
    ag: false,
    dmg: 0,
    rare: false,
    prot: false,
    q: 1,
    desc: "红树根间穿梭",
    cook: "石首鱼清汤",
    basePrice: 260,
    cookTime: 12,
    taste: 1
  },
  tarpon: {
    n: "大海鲢",
    e: "🐟",
    z: "mangrove",
    d: "mid",
    hp: 80,
    w: 10,
    v: 600,
    xp: 38,
    ag: true,
    dmg: 8,
    rare: false,
    prot: false,
    q: 2,
    desc: "跳跃攻击8伤",
    cook: "大海鲢刺身",
    basePrice: 950,
    cookTime: 20,
    taste: 3
  },
  sawfish: {
    n: "锯鳐",
    e: "🔪",
    z: "mangrove",
    d: "mid",
    hp: 150,
    w: 25,
    v: 2500,
    xp: 110,
    ag: true,
    dmg: 20,
    rare: true,
    prot: false,
    q: 4,
    desc: "锯齿吻部横扫20伤",
    cook: "锯鳐刺身",
    basePrice: 4000,
    cookTime: 40,
    taste: 4
  },
  // ── 深渊裂谷 ──
  phantom: {
    n: "幽灵鱼",
    e: "👻",
    z: "abyss",
    d: "deep",
    hp: 100,
    w: 3.0,
    v: 2800,
    xp: 110,
    ag: true,
    dmg: 20,
    rare: true,
    prot: false,
    q: 4,
    desc: "隐形突袭20伤"
  },
  crystalfish: {
    n: "水晶鱼",
    e: "💎",
    z: "abyss",
    d: "deep",
    hp: 50,
    w: 0.8,
    v: 4200,
    xp: 180,
    ag: false,
    dmg: 0,
    rare: true,
    prot: false,
    q: 4,
    desc: "极稀有发光如宝石",
    cook: "水晶鱼冻",
    basePrice: 6500,
    cookTime: 45,
    taste: 5
  },
  whiteshark: {
    n: "大白鲨",
    e: "🦈",
    z: "abyss",
    d: "deep",
    hp: 240,
    w: 80,
    v: 3200,
    xp: 140,
    ag: true,
    dmg: 28,
    rare: false,
    prot: false,
    q: 3,
    desc: "嗅血追击咬伤28伤",
    cook: "软骨汤",
    basePrice: 5000,
    cookTime: 45,
    taste: 4
  },
  giantsquid: {
    n: "大王乌贼",
    e: "🦑",
    z: "abyss",
    d: "deep",
    hp: 400,
    w: 120,
    v: 6000,
    xp: 220,
    ag: true,
    dmg: 35,
    rare: true,
    prot: false,
    q: 4,
    desc: "BOSS·触手缠绕35伤",
    cook: "大王乌贼盛宴",
    basePrice: 9500,
    cookTime: 55,
    taste: 5
  },
  seadragon: {
    n: "深渊海龙",
    e: "🐉",
    z: "abyss",
    d: "deep",
    hp: 700,
    w: 50,
    v: 10000,
    xp: 350,
    ag: true,
    dmg: 45,
    rare: true,
    prot: false,
    q: 4,
    desc: "最终BOSS·45伤极难击杀"
  },
  whale: {
    n: "抹香鲸",
    e: "🐋",
    z: "abyss",
    d: "deep",
    hp: 1000,
    w: 280,
    v: 15000,
    xp: 500,
    ag: false,
    dmg: 0,
    rare: true,
    prot: false,
    q: 4,
    desc: "传说·需超大货舱",
    cook: "鲸鱼传说宴",
    basePrice: 22000,
    cookTime: 70,
    taste: 5
  }
};

// ═══════════════════════════════════════════════════════
// ZONES
// ═══════════════════════════════════════════════════════
const ZONES = {
  coral: {
    id: "coral",
    name: "珊瑚礁",
    emoji: "🪸",
    color: "#00aaff",
    bg: "linear-gradient(180deg,#003d6b,#005f8a,#007aaa)",
    depths: ["shallow", "mid"],
    minSuit: "s1",
    desc: "新手水域·色彩斑斓",
    supplyO2: 40,
    supplyHp: 20,
    cost: 200
  },
  kelp: {
    id: "kelp",
    name: "海藻森林",
    emoji: "🌿",
    color: "#00cc88",
    bg: "linear-gradient(180deg,#001d0e,#003322,#004433)",
    depths: ["shallow", "mid", "deep"],
    minSuit: "s1",
    desc: "昏暗幽静·猎手猎物",
    supplyO2: 50,
    supplyHp: 30,
    cost: 350
  },
  ocean: {
    id: "ocean",
    name: "深蓝大洋",
    emoji: "🌊",
    color: "#3388ff",
    bg: "linear-gradient(180deg,#001433,#002255,#003077)",
    depths: ["shallow", "mid", "deep"],
    minSuit: "s2",
    desc: "广阔无垠·大型鱼群",
    supplyO2: 60,
    supplyHp: 35,
    cost: 500
  },
  volcano: {
    id: "volcano",
    name: "海底火山",
    emoji: "🌋",
    color: "#ff6633",
    bg: "linear-gradient(180deg,#1a0800,#2d1000,#3d1800)",
    depths: ["mid", "deep"],
    minSuit: "s2",
    desc: "高温水域·稀有热带鱼",
    supplyO2: 45,
    supplyHp: 25,
    cost: 700
  },
  arctic: {
    id: "arctic",
    name: "北极水域",
    emoji: "❄️",
    color: "#88ddff",
    bg: "linear-gradient(180deg,#001a2a,#002233,#003344)",
    depths: ["shallow", "mid", "deep"],
    minSuit: "s3",
    desc: "冰封之海·神秘极地",
    supplyO2: 70,
    supplyHp: 45,
    cost: 800
  },
  wreck: {
    id: "wreck",
    name: "神秘沉船",
    emoji: "⚓",
    color: "#cc9944",
    bg: "linear-gradient(180deg,#1a1000,#2a1800,#1a1000)",
    depths: ["shallow", "mid", "deep"],
    minSuit: "s2",
    desc: "宝藏与危险并存",
    supplyO2: 55,
    supplyHp: 30,
    cost: 600
  },
  mangrove: {
    id: "mangrove",
    name: "红树林",
    emoji: "🌴",
    color: "#44bb44",
    bg: "linear-gradient(180deg,#001a00,#002800,#001a00)",
    depths: ["shallow", "mid"],
    minSuit: "s1",
    desc: "奇特浅滩·跳跃鱼类",
    supplyO2: 40,
    supplyHp: 20,
    cost: 250
  },
  abyss: {
    id: "abyss",
    name: "深渊裂谷",
    emoji: "🕳️",
    color: "#aa44ff",
    bg: "linear-gradient(180deg,#04001a,#0a0030,#120040)",
    depths: ["deep"],
    minSuit: "s4",
    desc: "极度危险·传说BOSS",
    supplyO2: 100,
    supplyHp: 60,
    cost: 1500
  }
};

// ═══════════════════════════════════════════════════════
// EQUIPMENT
// ═══════════════════════════════════════════════════════
const EQUIP = {
  harpoon: [{
    id: "h1",
    name: "木制鱼叉",
    rate: 0.40,
    dmg: 5,
    price: 0,
    desc: "初始·命中率40%"
  }, {
    id: "h2",
    name: "钢制鱼叉",
    rate: 0.60,
    dmg: 14,
    price: 2000,
    desc: "命中率60%"
  }, {
    id: "h3",
    name: "电磁鱼叉",
    rate: 0.78,
    dmg: 28,
    price: 8000,
    desc: "命中率78%"
  }, {
    id: "h4",
    name: "量子鱼叉",
    rate: 0.92,
    dmg: 45,
    price: 25000,
    desc: "命中率92%"
  }, {
    id: "h5",
    name: "神话鱼叉",
    rate: 0.99,
    dmg: 80,
    price: 80000,
    desc: "近乎满命中"
  }],
  gun: [{
    id: "g0",
    name: "无枪械",
    dmg: 0,
    ammo: 0,
    price: 0,
    desc: ""
  }, {
    id: "g1",
    name: "气枪",
    dmg: 25,
    ammo: 20,
    price: 3000,
    desc: "轻型·射速快"
  }, {
    id: "g2",
    name: "鱼雷枪",
    dmg: 70,
    ammo: 10,
    price: 15000,
    desc: "重型·高伤害"
  }, {
    id: "g3",
    name: "深海炮",
    dmg: 160,
    ammo: 5,
    price: 45000,
    desc: "可击杀BOSS"
  }, {
    id: "g4",
    name: "龙神炮",
    dmg: 400,
    ammo: 3,
    price: 180000,
    desc: "传说级毁灭"
  }],
  tank: [{
    id: "t1",
    name: "标准氧气瓶",
    o2: 100,
    price: 0,
    desc: "初始"
  }, {
    id: "t2",
    name: "强化氧气瓶",
    o2: 160,
    price: 4000,
    desc: "+60%"
  }, {
    id: "t3",
    name: "双联氧气瓶",
    o2: 250,
    price: 12000,
    desc: "深海用"
  }, {
    id: "t4",
    name: "核动力氧气",
    o2: 400,
    price: 40000,
    desc: "超长续航"
  }, {
    id: "t5",
    name: "无限氧气罐",
    o2: 9999,
    price: 150000,
    desc: "永不缺氧"
  }],
  suit: [{
    id: "s1",
    name: "普通潜水服",
    maxD: "shallow",
    zones: ["coral", "kelp", "mangrove"],
    price: 0,
    desc: "浅海专用"
  }, {
    id: "s2",
    name: "加压潜水服",
    maxD: "mid",
    zones: ["coral", "kelp", "ocean", "volcano", "wreck", "mangrove"],
    price: 5000,
    desc: "解锁大洋·火山·沉船"
  }, {
    id: "s3",
    name: "深海战斗服",
    maxD: "deep",
    zones: ["coral", "kelp", "ocean", "volcano", "wreck", "mangrove", "arctic"],
    price: 22000,
    desc: "解锁北极"
  }, {
    id: "s4",
    name: "神话深海甲",
    maxD: "deep",
    zones: ["coral", "kelp", "ocean", "volcano", "wreck", "mangrove", "arctic", "abyss"],
    price: 90000,
    desc: "全区通行+防御+20"
  }],
  cargo: [{
    id: "c1",
    name: "小型装载箱",
    cap: 30,
    price: 0,
    desc: "30kg"
  }, {
    id: "c2",
    name: "中型装载箱",
    cap: 80,
    price: 3000,
    desc: "80kg"
  }, {
    id: "c3",
    name: "大型装载箱",
    cap: 200,
    price: 12000,
    desc: "200kg"
  }, {
    id: "c4",
    name: "巨型货舱",
    cap: 500,
    price: 40000,
    desc: "500kg"
  }, {
    id: "c5",
    name: "无限空间包",
    cap: 9999,
    price: 120000,
    desc: "无限容量"
  }]
};

// ═══════════════════════════════════════════════════════
// RESTAURANT — dishes, customers, upgrades
// ═══════════════════════════════════════════════════════
// Build dish list from fish data (only fish with cook field)
const ALL_DISHES = Object.entries(FISH).filter(([, f]) => f.cook).map(([id, f]) => ({
  id,
  fishId: id,
  name: f.cook,
  emoji: f.e,
  basePrice: f.basePrice,
  cookTime: f.cookTime,
  taste: f.taste,
  // 1-5 star taste
  fishName: f.n,
  quality: f.q,
  unlockRest: f.q === 1 ? 1 : f.q === 2 ? 2 : f.q === 3 ? 3 : f.q === 4 ? 4 : 5
}));

// Customer types with preferences
const CUSTOMER_TYPES = [{
  type: "tourist",
  name: "游客",
  emoji: "🧳",
  budget: 500,
  patience: 45,
  tip: 0.05,
  prefer: 1,
  spendMult: 0.8
}, {
  type: "local",
  name: "本地客",
  emoji: "👤",
  budget: 1200,
  patience: 55,
  tip: 0.10,
  prefer: 2,
  spendMult: 1.0
}, {
  type: "foodie",
  name: "美食家",
  emoji: "🍽️",
  budget: 3000,
  patience: 65,
  tip: 0.20,
  prefer: 3,
  spendMult: 1.3
}, {
  type: "vip",
  name: "VIP客",
  emoji: "💎",
  budget: 8000,
  patience: 75,
  tip: 0.30,
  prefer: 4,
  spendMult: 1.8
}, {
  type: "critic",
  name: "美食评论家",
  emoji: "📝",
  budget: 5000,
  patience: 80,
  tip: 0.25,
  prefer: 4,
  spendMult: 2.0,
  reviewBonus: true
}, {
  type: "couple",
  name: "情侣",
  emoji: "💑",
  budget: 2000,
  patience: 60,
  tip: 0.15,
  prefer: 2,
  spendMult: 1.1
}, {
  type: "family",
  name: "家庭客",
  emoji: "👨‍👩‍👧",
  budget: 1800,
  patience: 50,
  tip: 0.08,
  prefer: 2,
  spendMult: 0.9
}];

// Restaurant upgrades purchasable
const REST_UPGRADES = [{
  id: "r1",
  name: "精美装潢",
  emoji: "🏮",
  cost: 5000,
  desc: "客单价+15%",
  effect: "price15"
}, {
  id: "r2",
  name: "高档餐具",
  emoji: "🍶",
  cost: 8000,
  desc: "客人满意度+10",
  effect: "sat10"
}, {
  id: "r3",
  name: "音乐演奏",
  emoji: "🎵",
  cost: 12000,
  desc: "客人耐心+20秒",
  effect: "patience20"
}, {
  id: "r4",
  name: "私人包厢",
  emoji: "🏠",
  cost: 20000,
  desc: "解锁VIP座位",
  effect: "vip"
}, {
  id: "r5",
  name: "米其林申请",
  emoji: "⭐",
  cost: 50000,
  desc: "评分加成+20%",
  effect: "rating20"
}, {
  id: "r6",
  name: "海景落地窗",
  emoji: "🌊",
  cost: 35000,
  desc: "吸引美食家×2",
  effect: "foodie2"
}, {
  id: "r7",
  name: "专业中央厨房",
  emoji: "👨‍🍳",
  cost: 80000,
  desc: "烹饪时间-40%",
  effect: "cook40"
}, {
  id: "r8",
  name: "外卖系统",
  emoji: "🛵",
  cost: 30000,
  desc: "夜晚多加一轮",
  effect: "extra"
}];
const STAFF = [{
  id: "w1",
  name: "小美",
  role: "服务员",
  salary: 500,
  bonus: "上菜速度+25%",
  emoji: "👩",
  fx: "speed"
}, {
  id: "w2",
  name: "老张",
  role: "主厨",
  salary: 1000,
  bonus: "菜品售价+20%",
  emoji: "👨‍🍳",
  fx: "price"
}, {
  id: "w3",
  name: "小李",
  role: "收银员",
  salary: 400,
  bonus: "小费+15%",
  emoji: "💁",
  fx: "tip"
}, {
  id: "w4",
  name: "阿海",
  role: "潜水助手",
  salary: 600,
  bonus: "补给费用-25%",
  emoji: "🤿",
  fx: "supply"
}, {
  id: "w5",
  name: "博士",
  role: "研究员",
  salary: 1500,
  bonus: "稀有鱼XP×2",
  emoji: "🔬",
  fx: "xp"
}, {
  id: "w6",
  name: "阿强",
  role: "保镖",
  salary: 800,
  bonus: "受伤减少30%",
  emoji: "💪",
  fx: "defense"
}, {
  id: "w7",
  name: "鱼师",
  role: "鱼类专家",
  salary: 1200,
  bonus: "捕获率+8%",
  emoji: "🎣",
  fx: "catch"
}, {
  id: "w8",
  name: "营养师",
  role: "营养师",
  salary: 700,
  bonus: "餐厅XP+25%",
  emoji: "🥗",
  fx: "restxp"
}, {
  id: "w9",
  name: "侍酒师",
  role: "饮品师",
  salary: 900,
  bonus: "客单价+10%·额外饮品收入",
  emoji: "🍶",
  fx: "drink"
}, {
  id: "w10",
  name: "清洁工",
  role: "保洁",
  salary: 300,
  bonus: "桌子翻台速度+30%",
  emoji: "🧹",
  fx: "turnover"
}];
const WEATHER = [{
  id: "clear",
  name: "晴天",
  emoji: "☀️",
  desc: "无特效",
  catchMod: 0,
  o2Mod: 1.0,
  xpMod: 1,
  custMod: 1.0
}, {
  id: "storm",
  name: "暴风雨",
  emoji: "⛈️",
  desc: "氧耗×1.5",
  catchMod: -0.08,
  o2Mod: 1.5,
  xpMod: 1,
  custMod: 0.6
}, {
  id: "fog",
  name: "大雾",
  emoji: "🌫️",
  desc: "额外+2鱼",
  catchMod: 0.05,
  o2Mod: 1.0,
  xpMod: 1,
  custMod: 0.8
}, {
  id: "aurora",
  name: "极光",
  emoji: "🌌",
  desc: "XP×2",
  catchMod: 0,
  o2Mod: 0.8,
  xpMod: 2,
  custMod: 1.2
}, {
  id: "current",
  name: "洋流",
  emoji: "🌀",
  desc: "捕获率+10%",
  catchMod: 0.10,
  o2Mod: 1.2,
  xpMod: 1,
  custMod: 1.0
}, {
  id: "biolum",
  name: "生物发光",
  emoji: "✨",
  desc: "稀有鱼×2",
  catchMod: 0.03,
  o2Mod: 1.0,
  xpMod: 1,
  custMod: 1.1
}];
const QUEST_POOL = [{
  id: "q1",
  desc: "捕获5条沙丁鱼",
  fish: "sardine",
  need: 5,
  reward: 500,
  xpR: 50
}, {
  id: "q2",
  desc: "捕获3条章鱼",
  fish: "octopus",
  need: 3,
  reward: 1500,
  xpR: 120
}, {
  id: "q3",
  desc: "捕获1条金枪鱼",
  fish: "tuna",
  need: 1,
  reward: 2000,
  xpR: 150
}, {
  id: "q4",
  desc: "捕获2条电鳗",
  fish: "eel",
  need: 2,
  reward: 1800,
  xpR: 130
}, {
  id: "q5",
  desc: "拍到1头海豚",
  fish: "dolphin",
  need: 1,
  reward: 3000,
  xpR: 200
}, {
  id: "q6",
  desc: "捕获1条鮟鱇鱼",
  fish: "anglerfish",
  need: 1,
  reward: 4000,
  xpR: 300
}, {
  id: "q7",
  desc: "捕获1条小丑鱼",
  fish: "clownfish",
  need: 1,
  reward: 2500,
  xpR: 180
}, {
  id: "q8",
  desc: "捕获3条龙虾",
  fish: "lobster",
  need: 3,
  reward: 2200,
  xpR: 160
}, {
  id: "q9",
  desc: "捕获1条旗鱼",
  fish: "swordfish",
  need: 1,
  reward: 5000,
  xpR: 350
}, {
  id: "q10",
  desc: "拍到1只独角鲸",
  fish: "narwhal",
  need: 1,
  reward: 8000,
  xpR: 500
}, {
  id: "q11",
  desc: "上菜10次",
  fish: null,
  need: 10,
  reward: 3000,
  xpR: 200,
  type: "serve"
}, {
  id: "q12",
  desc: "赚取¥5000营收",
  fish: null,
  need: 5000,
  reward: 4000,
  xpR: 300,
  type: "earn"
}, {
  id: "q13",
  desc: "让3位VIP满意",
  fish: null,
  need: 3,
  reward: 6000,
  xpR: 400,
  type: "vip"
}];

// ═══════════════════════════════════════════════════════
// CALENDAR — 30-day month cycle, seasons, festivals
// ═══════════════════════════════════════════════════════
const SEASONS = [{
  id: "spring",
  name: "春季",
  emoji: "🌸",
  days: [1, 10],
  color: "#ff88aa",
  desc: "万物复苏，浅海鱼类繁殖旺季",
  catchBonus: {
    coral: 0.15,
    kelp: 0.10,
    mangrove: 0.20
  },
  spawnBonus: ["sardine", "clownfish", "seahorse", "crab"],
  restBonus: 1.1,
  weatherPool: ["clear", "fog", "current"]
}, {
  id: "summer",
  name: "夏季",
  emoji: "☀️",
  days: [11, 20],
  color: "#ffcc00",
  desc: "烈日高照，大洋鱼群南迁",
  catchBonus: {
    ocean: 0.20,
    volcano: 0.15,
    wreck: 0.10
  },
  spawnBonus: ["tuna", "swordfish", "manta", "hammerhead"],
  restBonus: 1.3,
  weatherPool: ["clear", "current", "biolum", "storm"]
}, {
  id: "autumn",
  name: "秋季",
  emoji: "🍂",
  days: [21, 25],
  color: "#ff8844",
  desc: "鱼肥季节，餐厅最旺",
  catchBonus: {
    kelp: 0.15,
    ocean: 0.10,
    arctic: 0.10
  },
  spawnBonus: ["grouper", "lobster", "octopus", "morayeel"],
  restBonus: 1.5,
  weatherPool: ["clear", "fog", "aurora", "current"]
}, {
  id: "winter",
  name: "冬季",
  emoji: "❄️",
  days: [26, 30],
  color: "#88ddff",
  desc: "极地水域开放，深渊现身",
  catchBonus: {
    arctic: 0.25,
    abyss: 0.20,
    deep: 0.10
  },
  spawnBonus: ["polarshark", "crystalfish", "phantom", "giantsquid"],
  restBonus: 1.0,
  weatherPool: ["storm", "fog", "aurora", "clear"]
}];

// 30-day festival calendar — day of month → festival
const FESTIVALS = {
  1: {
    name: "新年开海节",
    emoji: "🎆",
    color: "#ff4444",
    desc: "新年第一天！全区鱼类出现率+50%，餐厅收入×2",
    effect: {
      catchAll: 0.50,
      restMult: 2.0,
      specialFish: "whale",
      bonusDays: 1
    },
    specialMenu: {
      name: "新年全鱼宴",
      price: 5000,
      fish: "tuna",
      desc: "新年特供，限定套餐！"
    }
  },
  5: {
    name: "珊瑚节",
    emoji: "🪸",
    color: "#00aaff",
    desc: "珊瑚礁生态保护日！珊瑚区珍稀鱼×3，且价格×1.5",
    effect: {
      zone: "coral",
      rareBoost: 3.0,
      priceMult: 1.5,
      bonusDays: 1
    },
    specialFish: ["clownfish", "seahorse", "nudibranch", "lionfish"]
  },
  8: {
    name: "章鱼祭",
    emoji: "🐙",
    color: "#cc44ff",
    desc: "章鱼大爆发！海藻森林章鱼数量×5，章鱼料理打折",
    effect: {
      zone: "kelp",
      fishBoost: "octopus",
      boostMult: 5,
      dishDiscount: "octopus",
      bonusDays: 2
    },
    specialMenu: {
      name: "章鱼祭限定拼盘",
      price: 800,
      fish: "octopus",
      desc: "节日限定，今日最低价！"
    }
  },
  10: {
    name: "深海探险日",
    emoji: "🕳️",
    color: "#8844ff",
    desc: "深渊裂谷特别开放！无需神话装备也可进入深渊1次",
    effect: {
      unlockAbyss: true,
      bonusDays: 1
    },
    specialFish: ["seadragon", "giantsquid", "crystalfish"]
  },
  12: {
    name: "金枪鱼节",
    emoji: "🐟",
    color: "#ffd700",
    desc: "金枪鱼大迁徙！大洋区金枪鱼数量×4，刺身价格翻倍",
    effect: {
      zone: "ocean",
      fishBoost: "tuna",
      boostMult: 4,
      priceMult: 2.0,
      bonusDays: 2
    },
    specialMenu: {
      name: "金枪鱼节特选大腹",
      price: 2500,
      fish: "tuna",
      desc: "节日限定·今日双倍价值！"
    }
  },
  15: {
    name: "渔民感恩节",
    emoji: "🎣",
    color: "#44cc88",
    desc: "感谢大海！今日所有鱼类价格+30%，捕获率+20%",
    effect: {
      catchAll: 0.20,
      priceMult: 1.3,
      bonusDays: 1
    },
    specialMenu: {
      name: "渔夫感恩套餐",
      price: 1200,
      fish: "sardine",
      desc: "朴素而美味的感恩料理"
    }
  },
  18: {
    name: "龙虾盛宴节",
    emoji: "🦞",
    color: "#ff6633",
    desc: "龙虾大丰收！海藻森林龙虾×6，龙虾全餐半价出售",
    effect: {
      zone: "kelp",
      fishBoost: "lobster",
      boostMult: 6,
      dishDiscount: "lobster",
      bonusDays: 1
    },
    specialMenu: {
      name: "节日龙虾大餐",
      price: 600,
      fish: "lobster",
      desc: "节日限定半价！"
    }
  },
  20: {
    name: "海豚友谊日",
    emoji: "🐬",
    color: "#00ccff",
    desc: "海豚频繁出现！拍照XP×5，且有概率送你鱼",
    effect: {
      zone: "ocean",
      fishBoost: "dolphin",
      boostMult: 8,
      photoXpMult: 5,
      bonusDays: 1
    }
  },
  22: {
    name: "深海灯节",
    emoji: "✨",
    color: "#ffaa00",
    desc: "生物发光节！所有深海区稀有鱼×4，水晶鱼必出现",
    effect: {
      rareBoostDeep: 4.0,
      guaranteedFish: "crystalfish",
      bonusDays: 2
    },
    specialMenu: {
      name: "星光冻鱼",
      price: 8000,
      fish: "crystalfish",
      desc: "传说限定·节日独有！"
    }
  },
  25: {
    name: "鲸鱼节",
    emoji: "🐋",
    color: "#4488ff",
    desc: "抹香鲸迁徙季！深渊必定出现抹香鲸，全区收入+50%",
    effect: {
      guaranteedFish: "whale",
      restMult: 1.5,
      bonusDays: 2
    },
    specialMenu: {
      name: "鲸鱼传说宴席",
      price: 25000,
      fish: "whale",
      desc: "一生一次的传说料理！"
    }
  },
  28: {
    name: "北极探索节",
    emoji: "❄️",
    color: "#88eeff",
    desc: "北极水域大开放！格陵兰鲨和独角鲸大量出现",
    effect: {
      zone: "arctic",
      rareBoost: 3.0,
      priceMult: 1.4,
      bonusDays: 2
    },
    specialFish: ["polarshark", "narwhal", "beluga", "arcticchar"]
  },
  30: {
    name: "深渊最终挑战",
    emoji: "🐉",
    color: "#ff2222",
    desc: "月末大BOSS！深渊海龙必定出现，击杀奖励×3",
    effect: {
      zone: "abyss",
      guaranteedFish: "seadragon",
      killRewardMult: 3,
      bonusDays: 1
    }
  }
};

// Helper: get current month-day from game day
function getMonthDay(gameDay) {
  return (gameDay - 1) % 30 + 1;
}
function getSeason(monthDay) {
  return SEASONS.find(s => monthDay >= s.days[0] && monthDay <= s.days[1]) || SEASONS[3];
}
function getFestival(monthDay) {
  return FESTIVALS[monthDay] || null;
}
function getUpcomingFestivals(monthDay, count = 3) {
  const result = [];
  for (let i = 1; i <= 30 && result.length < count; i++) {
    const d = (monthDay - 1 + i) % 30 + 1;
    if (FESTIVALS[d]) result.push({
      daysLeft: i,
      day: d,
      festival: FESTIVALS[d]
    });
  }
  return result;
}
const DEPTH_ORDER = ["shallow", "mid", "deep"];
function getFish(z, d) {
  return Object.entries(FISH).filter(([, f]) => f.z === z && f.d === d).map(([id, f]) => ({
    ...f,
    id
  }));
}
function getEq(equip, type) {
  return EQUIP[type].find(e => e.id === equip[type]);
}
function starStr(n) {
  return "⭐".repeat(Math.min(5, n));
}

// ═══════════════════════════════════════════════════════
// MAIN GAME
// ═══════════════════════════════════════════════════════
function DeepCatch() {
  // ── core ──
  const [screen, setScreen] = useState("title");
  const [gold, setGold] = useState(3000);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [inv, setInv] = useState({});
  const [equip, setEquip] = useState({
    harpoon: "h1",
    gun: "g0",
    tank: "t1",
    suit: "s1",
    cargo: "c1"
  });
  const [ammo, setAmmo] = useState(0);
  const [staff, setStaff] = useState([]);
  // ── time ──
  const [day, setDay] = useState(1);
  const [phase, setPhase] = useState("day");
  const [dives, setDives] = useState(0);
  const [dayEarn, setDayEarn] = useState(0);
  const [weather, setWeather] = useState(WEATHER[0]);
  // ── restaurant ──
  const [restLv, setRestLv] = useState(1);
  const [restXp, setRestXp] = useState(0);
  const [restUpgrades, setRestUpgrades] = useState([]);
  const [reputation, setReputation] = useState(50); // 0-100
  const [rating, setRating] = useState(3.0); // 1-5
  const [totalServed, setTotalServed] = useState(0);
  const [totalVipSat, setTotalVipSat] = useState(0);
  // ── restaurant live sim ──
  const [customers, setCustomers] = useState([]); // active customers at tables
  const [cookQueue, setCookQueue] = useState([]); // dishes being cooked
  const [restLog, setRestLog] = useState([]);
  const [tableCount, setTableCount] = useState(4); // max tables
  const [nightServeCount, setNightServeCount] = useState(0);
  const [nightEarnings, setNightEarnings] = useState(0);
  const NIGHT_DURATION = 180000; // 3分钟夜晚营业时间
  const NIGHT_CUSTOMER_LIMIT = 12; // 每晚最多接待人数，到量后自动打烊
  // ── dive ──
  const [dive, setDive] = useState(null);
  const [fishTalk, setFishTalk] = useState(null);
  const [fishing, setFishing] = useState(null);
  // ── UI ──
  const [tab, setTab] = useState("map");
  const [selZone, setSelZone] = useState("coral");
  const [gLog, setGLog] = useState(["🌊 欢迎来到深海捕手！8大水域，65种鱼类等你探索！"]);
  const [notif, setNotif] = useState(null);
  // ── progress ──
  const [codex, setCodex] = useState({});
  const [quests, setQuests] = useState([]);
  const [qProg, setQProg] = useState({});
  const [serveCount, setServeCount] = useState(0);
  // ── calendar / festival ──
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeFestival, setActiveFestival] = useState(null);
  const [festivalMenu, setFestivalMenu] = useState(null); // unlocked special dish
  const [abyssUnlocked, setAbyssUnlocked] = useState(false); // temp unlock on festival day
  // ── AI ──
  const [aiHist, setAiHist] = useState([]);
  const [aiIn, setAiIn] = useState("");
  const [aiLoad, setAiLoad] = useState(false);
  const diveRef = useRef(null);
  diveRef.current = dive;
  const fishingRef = useRef(null);
  fishingRef.current = fishing;
  const fishCtrlRef = useRef(0);
  const custRef = useRef(null);
  custRef.current = customers;
  const cookRef = useRef(null);
  cookRef.current = cookQueue;
  const servedRef = useRef(0);
  servedRef.current = nightServeCount;
  const nightEndedRef = useRef(false);
  const addLog = m => setGLog(p => [m, ...p].slice(0, 80));
  const addRLog = m => setRestLog(p => [{
    msg: m,
    t: Date.now()
  }, ...p].slice(0, 40));
  const notify = m => {
    setNotif(m);
    setTimeout(() => setNotif(null), 2800);
  };
  const eq = t => getEq(equip, t);
  const hasS = id => staff.find(s => s.id === id);
  const hasU = id => restUpgrades.includes(id);

  // ── calendar helpers ──
  const monthDay = getMonthDay(day);
  const curSeason = getSeason(monthDay);
  const curFestival = getFestival(monthDay);
  const upcoming = getUpcomingFestivals(monthDay);

  // festival effective catch modifier
  const festCatchBonus = curFestival?.effect?.catchAll || 0;
  const festPriceMult = curFestival?.effect?.priceMult || 1.0;
  const festRestMult = curFestival?.effect?.restMult || 1.0;
  const seasonRestBonus = curSeason.restBonus || 1.0;

  // unlock dishes based on restaurant level
  const availDishes = ALL_DISHES.filter(d => d.unlockRest <= restLv);
  const getOpenOrders = (list = customers) => list.filter(c => (c.status === "waiting" || c.status === "eating") && c.orderFishId).reduce((m, c) => ({
    ...m,
    [c.orderFishId]: (m[c.orderFishId] || 0) + 1
  }), {});
  const getAvailableOrderDishes = (list = customers) => {
    const reserved = getOpenOrders(list);
    return availDishes.filter(d => (inv[d.fishId] || 0) - (reserved[d.fishId] || 0) > 0);
  };
  const isBossFish = f => f.hp >= 300;
  const getDishForCustomer = (base, list = customers) => {
    const stocked = getAvailableOrderDishes(list);
    if (!stocked.length) return null;
    const preferred = stocked.filter(d => d.taste >= base.prefer);
    const pool = preferred.length ? preferred : stocked;
    return pool[Math.floor(Math.random() * pool.length)];
  };
  function finishNight(reason = "🌙 营业结束，进入下一天！", restReason = null) {
    if (nightEndedRef.current || phase !== "night") return;
    nightEndedRef.current = true;
    addLog(reason);
    if (restReason) addRLog(restReason);
    setPhase("day");
    setDives(0);
    setDay(p => p + 1);
    setDayEarn(0);
    setCustomers([]);
    setCookQueue([]);
    rollWeather();
    if (day % 3 === 0) {
      const newQ = QUEST_POOL.sort(() => Math.random() - 0.5).slice(0, 4).map(q => ({
        ...q,
        done: false,
        progress: 0
      }));
      setQuests(newQ);
      setQProg({});
      addLog("📋 新任务已刷新！");
    }
    const rxpMult = hasS("w8") ? 1.25 : 1.0;
    setRestXp(prev => {
      const next = prev + nightServeCount * 50 * rxpMult;
      const need = restLv * 1000;
      if (next >= need) {
        setRestLv(l => {
          notify(`🍣 餐厅升级→${l + 1}★！解锁更多菜品！`);
          return l + 1;
        });
        return 0;
      }
      return next;
    });
    const nextDay = day + 1;
    const nextMD = getMonthDay(nextDay);
    const nextFest = getFestival(nextMD);
    const nextSeason = getSeason(nextMD);
    const curMD = getMonthDay(day);
    const curSeas = getSeason(curMD);
    if (nextSeason.id !== curSeas.id) {
      addLog(`${nextSeason.emoji} 季节更替！进入${nextSeason.name} — ${nextSeason.desc}`);
    }
    if (nextFest) {
      addLog(`🎉 明天是【${nextFest.name}】${nextFest.emoji} ${nextFest.desc}`);
      setActiveFestival(nextFest);
      if (nextFest.effect?.unlockAbyss) setAbyssUnlocked(true);
      if (nextFest.specialMenu) setFestivalMenu(nextFest.specialMenu);
    } else {
      setActiveFestival(null);
      setAbyssUnlocked(false);
      setFestivalMenu(null);
    }
    addLog(`☀️ 第${day + 1}天开始！夜间营收¥${nightEarnings.toLocaleString()}，接待${nightServeCount}桌`);
    setNightServeCount(0);
    setNightEarnings(0);
    setTab("map");
  }

  // ── init quests ──
  useEffect(() => {
    if (!quests.length) {
      setQuests(QUEST_POOL.slice(0, 4).map(q => ({
        ...q,
        done: false,
        progress: 0
      })));
    }
  }, []);

  // ── XP ──
  const gainXp = amt => {
    const mult = hasS("w5") ? weather.xpMod * 2 : weather.xpMod;
    setXp(prev => {
      const next = prev + Math.floor(amt * mult);
      const need = level * 300;
      if (next >= need) {
        setLevel(l => {
          notify(`🎉 升级！Lv.${l + 1}！`);
          return l + 1;
        });
        return next - need;
      }
      return next;
    });
  };

  // ── quest update ──
  const updateQuest = (type, fishId, amount = 1) => {
    setQuests(qs => qs.map(q => {
      if (q.done) return q;
      let prog = q.progress || 0;
      if (type === "fish" && q.fish === fishId) prog += amount;else if (type === "serve" && q.type === "serve") prog += amount;else if (type === "earn" && q.type === "earn") prog += amount;else if (type === "vip" && q.type === "vip") prog += amount;else return q;
      if (prog >= q.need) {
        setGold(g => g + q.reward);
        gainXp(q.xpR);
        notify(`✅ 任务完成！${q.desc} +¥${q.reward}`);
        return {
          ...q,
          done: true,
          progress: q.need
        };
      }
      return {
        ...q,
        progress: prog
      };
    }));
  };

  // ── SURFACE REF (氧气不再自动消耗，改为换区域/被攻击时扣除) ──
  const surfaceRef = useRef(null);
  useEffect(() => {
    surfaceRef.current = doSurface;
  });
  useEffect(() => {
    if (!fishing || screen !== "dive") return;
    const t = setInterval(() => {
      setFishing(g => {
        if (!g) return g;
        const nextTurn = Math.max(0, (g.turn || 0) - 1);
        let dir = g.dir;
        if (nextTurn <= 0 || Math.random() < g.turnChance) dir = Math.random() > .5 ? 1 : -1;
        let velocity = (Number.isFinite(g.velocity) ? g.velocity : 0) * 0.82 + dir * g.targetAccel + (Math.random() - .5) * g.jitter;
        velocity = Math.max(-g.targetMaxSpeed, Math.min(g.targetMaxSpeed, velocity));
        let target = g.target + velocity;
        if (target > 92) {
          target = 92;
          dir = -1;
          velocity = -Math.abs(velocity) * 0.7;
        }
        if (target < 8) {
          target = 8;
          dir = 1;
          velocity = Math.abs(velocity) * 0.7;
        }
        const cursor = Math.max(4, Math.min(96, g.cursor + fishCtrlRef.current * g.cursorSpeed));
        const distance = Math.abs(cursor - target);
        const good = distance < g.hitWindow;
        const active = fishCtrlRef.current !== 0;
        const delta = active && good ? g.lockPower : -(good ? g.decay * 0.45 : g.decay);
        const progress = Math.max(0, Math.min(100, g.progress + delta));
        if (progress >= 100) {
          setTimeout(() => finishFishing(true), 0);
          return {
            ...g,
            progress: 100,
            target,
            cursor,
            dir
          };
        }
        if (progress <= 0) {
          setTimeout(() => finishFishing(false), 0);
          return {
            ...g,
            progress: 0,
            target,
            cursor,
            dir
          };
        }
        return {
          ...g,
          target,
          cursor,
          dir,
          velocity,
          turn: nextTurn <= 0 ? g.turnEvery : nextTurn,
          progress,
          active,
          good
        };
      });
    }, 80);
    return () => clearInterval(t);
  }, [fishing, screen]);
  const steerFishing = dir => {
    fishCtrlRef.current = dir;
    setFishing(g => g ? {
      ...g,
      cursor: Math.max(4, Math.min(96, g.cursor + dir * g.tapStep)),
      active: true
    } : g);
  };
  const stopFishing = () => {
    fishCtrlRef.current = 0;
    setFishing(g => g ? {
      ...g,
      active: false
    } : g);
  };
  const pullFishing = () => steerFishing(-1);
  const pushFishing = () => steerFishing(1);
  const ctrlProps = dir => ({
    onMouseDown: e => {
      e.preventDefault();
      steerFishing(dir);
    },
    onMouseUp: stopFishing,
    onMouseLeave: stopFishing,
    onTouchStart: e => {
      e.preventDefault();
      steerFishing(dir);
    },
    onTouchEnd: e => {
      e.preventDefault();
      stopFishing();
    },
    onClick: e => {
      e.preventDefault();
      steerFishing(dir);
      setTimeout(stopFishing, 90);
    }
  });
  useEffect(() => {
    const up = () => {
      fishCtrlRef.current = 0;
    };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchcancel", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchcancel", up);
    };
  }, []);

  // ── RESTAURANT live tick: customer patience & cook timer ──
  useEffect(() => {
    if (screen !== "main" || phase !== "night") return;
    const t = setInterval(() => {
      const now = Date.now();
      // cook queue: finish dishes
      setCookQueue(prev => {
        const done = [];
        const remaining = prev.filter(item => {
          if (now >= item.finishAt) {
            done.push(item);
            return false;
          }
          return true;
        });
        if (done.length) {
          done.forEach(item => {
            // give dish to customer
            setCustomers(cs => cs.map(c => {
              if (c.uid === item.custUid && c.status === "waiting") {
                addRLog(`🍱 ${item.dishName} 上桌！→ ${c.name}`);
                return {
                  ...c,
                  status: "eating",
                  eatFinishAt: now + 15000,
                  satisfied: true
                };
              }
              return c;
            }));
          });
        }
        return remaining;
      });
      // customers: check if patience expired or eating done
      setCustomers(prev => {
        return prev.map(c => {
          if (c.status === "waiting" && now > c.patienceEnd) {
            addRLog(`😤 ${c.name}(${c.customerEmoji})等太久离开了！-声誉`);
            setReputation(r => Math.max(0, r - 3));
            return {
              ...c,
              status: "left_angry",
              leaveAt: now
            };
          }
          if (c.status === "eating" && now > c.eatFinishAt) {
            // pay and leave
            const tipMult = hasS("w3") ? 1.15 : 1.0;
            const priceMult = (hasS("w2") ? 1.20 : 1.0) * (hasU("r1") ? 1.15 : 1.0) * (hasU("r5") ? 1.20 : 1.0) * (hasS("w9") ? 1.10 : 1.0) * festRestMult * seasonRestBonus;
            const bill = Math.floor(c.bill * priceMult);
            const tip = Math.floor(bill * c.tipRate * tipMult);
            const total = bill + tip;
            setGold(g => g + total);
            setDayEarn(e => e + total);
            setNightEarnings(e => e + total);
            setNightServeCount(n => n + 1);
            setTotalServed(n => n + 1);
            const satisfied = c.satisfied;
            setReputation(r => Math.min(100, r + (satisfied ? 2 : -1)));
            setRating(r => {
              const score = satisfied ? c.customerType === "critic" ? 0.3 : 0.1 : -0.05;
              return Math.min(5, Math.max(1, parseFloat((r + score).toFixed(1))));
            });
            if (c.customerType === "critic" && satisfied) {
              updateQuest("vip", null, 1);
            }
            if (c.customerType === "vip" && satisfied) {
              setTotalVipSat(n => n + 1);
              updateQuest("vip", null, 1);
            }
            addRLog(`✅ ${c.name} 结账 ¥${total}（含小费¥${tip}）${satisfied ? "😊" : "😐"}`);
            updateQuest("earn", null, total);
            return {
              ...c,
              status: "paid",
              leaveAt: now
            };
          }
          return c;
        }).filter(c => c.status !== "paid" && c.status !== "left_angry" || now - (c.leaveAt || 0) < 3000);
      });
    }, 1000);
    return () => clearInterval(t);
  }, [screen, phase, hasS, hasU, weather]);

  // ── spawn customers at night ──
  useEffect(() => {
    if (screen !== "main" || phase !== "night") return;
    const spawnCustomer = () => {
      const cs = custRef.current;
      const maxTables = tableCount + (hasU("r4") ? 2 : 0);
      const activeCount = cs.filter(c => c.status === "waiting" || c.status === "eating").length;
      if (activeCount >= maxTables) return;
      if (servedRef.current + activeCount >= NIGHT_CUSTOMER_LIMIT) return;
      // pick customer type based on restaurant level & upgrades
      let pool = [...CUSTOMER_TYPES];
      if (restLv < 3) pool = pool.filter(c => c.prefer <= 2);
      if (!hasU("r4")) pool = pool.filter(c => c.type !== "vip");
      if (hasU("r6")) pool = [...pool, ...CUSTOMER_TYPES.filter(c => c.type === "foodie")]; // extra foodie
      const custMod = weather.custMod;
      if (Math.random() > custMod) return; // weather reduces spawns
      let base = null,
        order = null;
      for (let tries = 0; tries < 12; tries++) {
        base = pool[Math.floor(Math.random() * pool.length)];
        order = getDishForCustomer(base, cs);
        if (order) break;
      }
      if (!order) return;
      const patience = (base.patience + (hasU("r3") ? 20 : 0)) * 1000;
      const now = Date.now();
      const newCust = {
        uid: `c${Math.random()}`,
        customerType: base.type,
        name: base.name,
        customerEmoji: base.emoji,
        status: "waiting",
        patienceEnd: now + patience,
        patienceMs: patience,
        bill: 0,
        tipRate: base.tip + (hasS("w3") ? 0.05 : 0),
        prefer: base.prefer,
        spendMult: base.spendMult,
        orderDishId: order.id,
        orderFishId: order.fishId,
        orderName: order.name,
        orderEmoji: order.emoji,
        satisfied: false,
        arrivedAt: now
      };
      setCustomers(p => [...p, newCust]);
      addRLog(`🚶 ${base.emoji}${base.name}点了 ${order.emoji}${order.name}`);
    };
    // 夜晚开始立刻来2个客人
    spawnCustomer();
    setTimeout(spawnCustomer, 600);

    // 更快刷新客人
    const interval = 900;
    const t = setInterval(spawnCustomer, interval);
    return () => clearInterval(t);
  }, [screen, phase, restLv, hasU, hasS, tableCount, weather, inv, nightServeCount]);

  // ── AUTO END NIGHT ──
  useEffect(() => {
    if (screen !== "main" || phase !== "night") return;
    const timer = setTimeout(() => {
      finishNight("🌙 营业时间到，自动进入下一天！", "🕛 时间到，今晚营业结束。");
    }, NIGHT_DURATION);
    return () => clearTimeout(timer);
  }, [screen, phase, day]);

  // ── AUTO SKIP NIGHT WHEN SOLD OUT ──
  useEffect(() => {
    if (screen !== "main" || phase !== "night") return;
    const totalStock = getAvailableOrderDishes(customers).length;
    const activeCustomers = customers.filter(c => c.status === "waiting" || c.status === "eating").length;
    const activeCooking = cookQueue.length;
    if (totalStock <= 0 && activeCustomers === 0 && activeCooking === 0) {
      setTimeout(() => {
        finishNight("🍽️ 菜品已售罄，自动结束营业！", "🍽️ 食材卖完，提前打烊。");
      }, 1000);
    } else if (nightServeCount >= NIGHT_CUSTOMER_LIMIT && activeCustomers === 0 && activeCooking === 0) {
      setTimeout(() => {
        finishNight(`🏮 已接待${NIGHT_CUSTOMER_LIMIT}桌，自动结束营业！`, "🏮 今晚客流已满，收摊休息。");
      }, 1000);
    }
  }, [screen, phase, inv, customers, cookQueue, nightServeCount]);

  // ── SERVE DISH to customer ──
  const serveDish = (custUid, dish) => {
    const cust = customers.find(c => c.uid === custUid);
    if (!cust || cust.status !== "waiting") return;
    const ordered = availDishes.find(d => d.fishId === cust.orderFishId) || dish;
    if (!ordered) return;
    dish = ordered;
    if ((inv[dish.fishId] || 0) <= 0) {
      notify(`❌ 没有 ${dish.fishName}！`);
      return;
    }
    const cookMult = hasU("r7") ? 0.6 : 1.0;
    const cookMs = Math.floor(dish.cookTime * 1000 * cookMult * (hasS("w1") ? 0.80 : 1.0));
    const bill = Math.floor(dish.basePrice * cust.spendMult);
    setInv(p => ({
      ...p,
      [dish.fishId]: p[dish.fishId] - 1
    }));
    const now = Date.now();
    setCookQueue(p => [...p, {
      uid: `cook${Math.random()}`,
      custUid,
      dishName: dish.name,
      fishId: dish.fishId,
      startAt: now,
      finishAt: now + cookMs,
      cookMs
    }]);
    setCustomers(p => p.map(c => c.uid === custUid ? {
      ...c,
      bill,
      orderedDish: dish.name,
      status: "waiting"
    } : c));
  };

  // ── START DIVE ──
  const startDive = (zoneId, depth) => {
    if (phase !== "day") {
      addLog("🌙 夜晚请经营餐厅！");
      return;
    }
    if (dives >= 2) {
      addLog("😴 今天已潜水2次！");
      return;
    }
    const s = eq("suit");
    if (!s.zones.includes(zoneId)) {
      addLog("🤿 潜水服无法进入此水域！");
      return;
    }
    if (DEPTH_ORDER.indexOf(depth) > DEPTH_ORDER.indexOf(s.maxD)) {
      addLog("🤿 潜水服深度不足！");
      return;
    }
    // festival abyss unlock
    if (zoneId === "abyss" && !eq("suit").zones.includes("abyss") && !abyssUnlocked) {
      addLog("🔒 深渊需要神话深海甲才能进入！（等待深渊节解锁）");
      return;
    }
    const pool = getFish(zoneId, depth);
    if (!pool.length) {
      addLog("该区域暂无鱼类");
      return;
    }
    const extra = weather.id === "fog" ? 2 : 0;
    const biolum = weather.id === "biolum" || curFestival?.effect?.rareBoostDeep > 1;
    // festival guaranteed fish injection
    const guaranteedId = curFestival?.effect?.guaranteedFish;
    const festZoneBoost = curFestival?.effect?.zone === zoneId;
    const festFishBoost = curFestival?.effect?.fishBoost;
    const festBoostMult = curFestival?.effect?.boostMult || 1;
    const count = Math.floor(Math.random() * 3) + 4 + extra + (festZoneBoost ? 2 : 0);
    const list = Array.from({
      length: count
    }, () => {
      const rareChance = biolum ? 0.35 : curFestival?.effect?.rareBoost ? 0.30 : 0.15;
      const candidates = pool.filter(f => f.v > 0 || f.prot);
      let f;
      // festival fish boost: if this zone has a boosted fish, increase its appearance
      if (festFishBoost && Math.random() < Math.min(0.9, (festBoostMult - 1) * 0.15)) {
        const boostedPool = pool.filter(x => x.id === festFishBoost);
        if (boostedPool.length) {
          f = boostedPool[0];
        }
      }
      if (!f) {
        if (Math.random() < rareChance) {
          const r = candidates.filter(x => x.rare);
          f = r.length ? r[Math.floor(Math.random() * r.length)] : candidates[Math.floor(Math.random() * candidates.length)];
        } else {
          const c = candidates.filter(x => !x.rare);
          f = c.length ? c[Math.floor(Math.random() * c.length)] : candidates[Math.floor(Math.random() * candidates.length)];
        }
      }
      return {
        ...f,
        curHp: f.hp,
        caught: false,
        fled: false,
        uid: `${Math.random()}`
      };
    });
    // inject guaranteed festival fish if in correct zone
    if (guaranteedId && FISH[guaranteedId] && (curFestival?.effect?.zone === zoneId || !curFestival?.effect?.zone)) {
      const gf = FISH[guaranteedId];
      if (gf.z === zoneId || !gf.z) {
        list.push({
          ...gf,
          id: guaranteedId,
          curHp: gf.hp,
          caught: false,
          fled: false,
          uid: `guaranteed-${Math.random()}`
        });
        addLog(`✨ 节日效果：${gf.e}${gf.n} 出现了！`);
      }
    }
    const baseHp = 100 + (s.id === "s4" ? 20 : 0);
    setAmmo(eq("gun").ammo || 0);
    setDive({
      zone: zoneId,
      depth,
      fish: list,
      o2: eq("tank").o2,
      maxO2: eq("tank").o2,
      hp: baseHp,
      maxHp: baseHp,
      cargo: 0,
      maxCargo: eq("cargo").cap,
      caughtMap: {},
      dlog: [`🤿 进入${ZONES[zoneId].name}·${depth === "shallow" ? "浅海" : depth === "mid" ? "中层" : "深海"}，发现${count}种生物！`]
    });
    setScreen("dive");
  };
  const doSurface = ds => {
    const s = ds || diveRef.current;
    if (!s) return;
    const cm = s.caughtMap;
    const newInv = {
      ...inv
    };
    let totalVal = 0;
    const festMult = festPriceMult || 1.0;
    const killMult = curFestival?.effect?.killRewardMult || 1;
    Object.entries(cm).forEach(([id, n]) => {
      const f = FISH[id];
      if (!f || f.prot || f.v === 0) return;
      newInv[id] = (newInv[id] || 0) + n;
      totalVal += Math.floor(f.v * n * festMult);
    });
    setInv(newInv);
    setCodex(prev => {
      const next = {
        ...prev
      };
      Object.entries(cm).forEach(([id, n]) => {
        next[id] = (next[id] || 0) + n;
      });
      return next;
    });
    const total = Object.values(cm).reduce((a, b) => a + b, 0);
    addLog(`🏖️ 上岸！捕获${total}条，估值¥${totalVal.toLocaleString()}`);
    setDives(p => p + 1);
    setDive(null);
    setScreen("main");
    setTab("map");
  };
  const startFishingChallenge = fish => {
    if (!dive || fish.caught || fish.fled) return;
    if (fish.prot || fish.v === 0) {
      setDive(p => ({
        ...p,
        dlog: [`📷 ${fish.n}是保护动物！拍照 +${fish.xp}XP`, ...p.dlog],
        fish: p.fish.filter(f => f.uid !== fish.uid),
        caughtMap: {
          ...p.caughtMap,
          [fish.id]: (p.caughtMap[fish.id] || 0) + 1
        }
      }));
      gainXp(fish.xp);
      updateQuest("fish", fish.id, 1);
      return;
    }
    if (dive.cargo + fish.w > dive.maxCargo) {
      setDive(p => ({
        ...p,
        dlog: [`📦 装载箱满！${fish.n}放不下`, ...p.dlog]
      }));
      return;
    }
    const harpoon = eq("harpoon");
    const catchBonus = hasS("w7") ? 6 : 0;
    const fishPower = fish.q * 9 + (fish.rare ? 10 : 0) + (fish.ag ? 7 : 0) + (isBossFish(fish) ? 14 : 0);
    const equipPower = harpoon.rate * 26 + catchBonus + festCatchBonus * 80;
    const difficulty = Math.max(8, Math.min(62, fishPower + 8 - equipPower));
    const hitWindow = Math.max(8, Math.min(28, 28 - difficulty * 0.22 + harpoon.rate * 7));
    const targetMaxSpeed = Math.max(.72, Math.min(2.7, .58 + fishPower / 34));
    const targetAccel = Math.max(.10, Math.min(.34, .08 + fishPower / 160));
    const cursorSpeed = Math.max(1.35, Math.min(3.7, 1.15 + harpoon.rate * 2.15 + catchBonus * .06));
    const tapStep = cursorSpeed * 1.55;
    const lockPower = Math.max(1.55, Math.min(4.2, 2.4 + harpoon.rate * 1.25 - difficulty / 55));
    const decay = Math.max(.45, Math.min(1.65, .52 + difficulty / 70));
    setFishing({
      fishUid: fish.uid,
      fishId: fish.id,
      name: fish.n,
      emoji: fish.e,
      weight: fish.w,
      xp: fish.xp,
      progress: 38,
      cursor: 50,
      target: 36 + Math.random() * 28,
      dir: Math.random() > .5 ? 1 : -1,
      difficulty,
      hitWindow,
      lockPower,
      decay,
      targetMaxSpeed,
      targetAccel,
      cursorSpeed,
      tapStep,
      velocity: 0,
      jitter: Math.max(.08, Math.min(.46, .08 + fishPower / 150)),
      turnEvery: Math.max(10, Math.floor(28 - fishPower / 3)),
      turn: 8 + Math.floor(Math.random() * 10),
      turnChance: Math.max(.015, Math.min(.08, .015 + fishPower / 900)),
      active: false,
      good: false,
      o2Penalty: Math.max(3, Math.floor((fish.dmg || fish.q * 3) * (fish.ag ? 1.0 : 0.55) + fish.q)),
      rare: fish.rare,
      ag: fish.ag
    });
    if (fish.ag) {
      const lines = ["别靠近我的水域！", "想抓我？先追上我！", "水流会替我挡住你！", "看准了再下叉！"];
      setFishTalk(`${fish.e} ${fish.n}：${lines[Math.floor(Math.random() * lines.length)]}`);
      setTimeout(() => setFishTalk(null), 2500);
    }
  };
  const catchFish = startFishingChallenge;
  const finishFishing = ok => {
    const game = fishingRef.current;
    if (!game) return;
    const defMult = hasS("w6") ? 0.7 : 1.0;
    const logs = [];
    if (ok) {
      const current = diveRef.current;
      const nm = {
        ...(current?.caughtMap || {}),
        [game.fishId]: ((current?.caughtMap || {})[game.fishId] || 0) + 1
      };
      logs.push(`✅ 捕获${game.name}(${game.weight}kg) +${game.xp}XP`);
      if (festPriceMult > 1) logs.push(`🎉 节日加成·价值×${festPriceMult}！`);
      setDive(p => ({
        ...p,
        fish: p.fish.filter(f => f.uid !== game.fishUid),
        caughtMap: nm,
        cargo: p.cargo + game.weight,
        dlog: [...logs, ...p.dlog]
      }));
      gainXp(game.xp);
      updateQuest("fish", game.fishId, 1);
    } else {
      const o2dmg = Math.floor(game.o2Penalty * defMult + Math.random() * 6);
      logs.push(`❌ ${game.name}挣脱了！氧气 -${o2dmg}`);
      setDive(p => {
        const newO2 = Math.max(0, p.o2 - o2dmg);
        const fled = {
          ...p,
          fish: p.fish.filter(f => f.uid !== game.fishUid),
          o2: newO2,
          dlog: [...logs, ...p.dlog]
        };
        if (newO2 <= 0) {
          addLog("💀 氧气耗尽！紧急上浮！");
          setTimeout(() => {
            if (surfaceRef.current) surfaceRef.current(fled);
          }, 100);
        }
        return fled;
      });
    }
    setFishing(null);
  };
  const shootFish = fish => {
    if (!dive || fish.caught || fish.fled || fish.prot) return;
    const gun = eq("gun");
    if (gun.id === "g0" || ammo <= 0) {
      addLog("⚠️ 没有弹药！");
      return;
    }
    const dmg = gun.dmg + Math.floor(Math.random() * 20);
    const newHp = fish.curHp - dmg;
    const newAmmo = ammo - 1;
    setAmmo(newAmmo);
    if (newHp <= 0) {
      if (dive.cargo + fish.w > dive.maxCargo) {
        setDive(p => ({
          ...p,
          dlog: [`📦 箱满，${fish.n}尸体无法装入`, ...p.dlog]
        }));
        return;
      }
      const nm = {
        ...dive.caughtMap,
        [fish.id]: (dive.caughtMap[fish.id] || 0) + 1
      };
      setDive(p => ({
        ...p,
        fish: p.fish.filter(f => f.uid !== fish.uid),
        caughtMap: nm,
        cargo: p.cargo + fish.w,
        dlog: [`💀 击杀${fish.n}！+${fish.xp * 2}XP 弹药剩${newAmmo}`, ...p.dlog]
      }));
      gainXp(fish.xp * 2);
      updateQuest("fish", fish.id, 1);
    } else {
      setDive(p => ({
        ...p,
        fish: p.fish.map(f => f.uid === fish.uid ? {
          ...f,
          curHp: newHp
        } : f),
        dlog: [`🔫 射击${fish.n} -${dmg}HP (${newHp}/${fish.hp}) 弹药剩${newAmmo}`, ...p.dlog]
      }));
    }
  };
  const useSupply = () => {
    if (!dive) return;
    const z = ZONES[dive.zone];
    const disc = hasS("w4") ? 0.75 : 1.0;
    const cost = Math.floor(z.cost * disc);
    if (gold < cost) {
      setDive(p => ({
        ...p,
        dlog: [`💸 金币不足¥${cost}`, ...p.dlog]
      }));
      return;
    }
    setGold(p => p - cost);
    setDive(p => ({
      ...p,
      o2: Math.min(p.maxO2, p.o2 + z.supplyO2),
      hp: Math.min(p.maxHp, p.hp + z.supplyHp),
      dlog: [`⛽ 补给！+${z.supplyO2}氧 +${z.supplyHp}HP -¥${cost}`, ...p.dlog]
    }));
  };
  // ── 换区域（替换冲刺）──
  const switchArea = () => {
    if (!dive) return;
    const O2_COST = 10;
    if (dive.o2 < O2_COST) {
      setDive(p => ({
        ...p,
        dlog: [`⚠️ 氧气不足${O2_COST}，无法换区！`, ...p.dlog]
      }));
      return;
    }
    const z = ZONES[dive.zone];
    const pool = getFish(dive.zone, dive.depth);
    if (!pool.length) {
      setDive(p => ({
        ...p,
        dlog: ["❌ 该深度没有其他鱼类区域", ...p.dlog]
      }));
      return;
    }
    // 生成全新一批鱼，旧鱼标记为 fled
    const biolum = weather.id === "biolum" || curFestival?.effect?.rareBoostDeep > 1;
    const festZoneBoost = curFestival?.effect?.zone === dive.zone;
    const festFishBoost = curFestival?.effect?.fishBoost;
    const festBoostMult = curFestival?.effect?.boostMult || 1;
    const count = Math.floor(Math.random() * 3) + 3 + (festZoneBoost ? 2 : 0);
    const newFish = Array.from({
      length: count
    }, () => {
      const rareChance = biolum ? 0.35 : curFestival?.effect?.rareBoost ? 0.30 : 0.15;
      const candidates = pool.filter(f => f.v > 0 || f.prot);
      let f;
      if (festFishBoost && Math.random() < Math.min(0.9, (festBoostMult - 1) * 0.15)) {
        const bp = pool.filter(x => x.id === festFishBoost);
        if (bp.length) f = bp[0];
      }
      if (!f) {
        if (Math.random() < rareChance) {
          const r = candidates.filter(x => x.rare);
          f = r.length ? r[Math.floor(Math.random() * r.length)] : candidates[Math.floor(Math.random() * candidates.length)];
        } else {
          const c = candidates.filter(x => !x.rare);
          f = c.length ? c[Math.floor(Math.random() * c.length)] : candidates[Math.floor(Math.random() * candidates.length)];
        }
      }
      return {
        ...f,
        curHp: f.hp,
        caught: false,
        fled: false,
        uid: `sw${Math.random()}`
      };
    });
    // 检查节日保底鱼
    const guaranteedId = curFestival?.effect?.guaranteedFish;
    if (guaranteedId && FISH[guaranteedId] && (curFestival?.effect?.zone === dive.zone || !curFestival?.effect?.zone)) {
      const gf = FISH[guaranteedId];
      if (gf.z === dive.zone || !gf.z) {
        newFish.push({
          ...gf,
          id: guaranteedId,
          curHp: gf.hp,
          caught: false,
          fled: false,
          uid: `guar${Math.random()}`
        });
      }
    }
    setDive(p => ({
      ...p,
      fish: [...p.fish.map(f => !f.caught && !f.fled ? {
        ...f,
        fled: true
      } : f),
      // 旧鱼全部标记为逃跑
      ...newFish],
      o2: p.o2 - O2_COST,
      dlog: [`🌊 换到新区域！发现${count}种新生物 -${O2_COST}氧气`, ...p.dlog]
    }));
    notify(`🌊 换区成功！-${O2_COST}氧气`);
  };
  const rollWeather = () => {
    const season = getSeason(getMonthDay(day + 1));
    const pool = season.weatherPool || WEATHER.map(w => w.id);
    const candidates = WEATHER.filter(w => pool.includes(w.id));
    const w = candidates[Math.floor(Math.random() * candidates.length)] || WEATHER[0];
    setWeather(w);
    addLog(`${w.emoji} 今日天气：${w.name}（${w.desc}）`);
  };
  const endDay = () => {
    nightEndedRef.current = false;
    setPhase("night");
    setTab("restaurant");
    setCustomers([]);
    setCookQueue([]);
    setNightEarnings(0);
    setNightServeCount(0);
    addLog(`🌙 第${day}天夜晚·餐厅开始营业！声誉${reputation}·评分${rating}`);
    addRLog("🏮 餐厅开门！迎接今夜的客人…");
  };
  const endNight = () => {
    finishNight("☀️ 结束营业，进入新的一天！", "🏮 店铺打烊，今日结算完成。");
  };
  const buyEq = (type, item) => {
    if (gold < item.price) {
      addLog("💸 金币不足！");
      return;
    }
    setGold(p => p - item.price);
    setEquip(p => ({
      ...p,
      [type]: item.id
    }));
    if (type === "gun") setAmmo(item.ammo || 0);
    addLog(`🛒 购买 ${item.name}！`);
  };
  const hire = s => {
    if (staff.find(x => x.id === s.id)) return;
    if (gold < s.salary * 3) {
      addLog(`💸 押金¥${s.salary * 3}`);
      return;
    }
    setGold(p => p - s.salary * 3);
    setStaff(p => [...p, s]);
    addLog(`👤 雇用 ${s.name}！`);
  };
  const buyUpgrade = u => {
    if (restUpgrades.includes(u.id)) {
      notify("已购买");
      return;
    }
    if (gold < u.cost) {
      notify("💸 金币不足！");
      return;
    }
    setGold(p => p - u.cost);
    setRestUpgrades(p => [...p, u.id]);
    if (u.effect === "extra") addLog("🛵 外卖系统开通！夜晚客流量增加");
    addLog(`✨ 购买餐厅升级：${u.name}！`);
  };
  const ADVISOR_PROFILE = {
    name: "深海顾问",
    emoji: "🤖",
    desc: "读取阶段、库存、装备、客人和图鉴状态，给出下一步玩法建议"
  };
  const AI_QUESTIONS = ["现在最该做什么？", "今晚怎么营业最稳？", "去哪潜水收益最高？", "库存如何配菜？", "下一步升级什么？", "鱼枪怎么更容易命中？", "BOSS和稀有鱼怎么抓？", "图鉴怎么收集更快？", "我快没氧气了怎么办？", "帮我安排今天路线"];
  const getAdvisorState = () => ({
    gold,
    level,
    xp,
    day,
    phase,
    dives,
    weather: {
      name: weather.name,
      desc: weather.desc
    },
    restaurant: {
      level: restLv,
      reputation,
      rating,
      servedTonight: nightServeCount,
      earningsTonight: nightEarnings,
      customerLimit: NIGHT_CUSTOMER_LIMIT
    },
    equipment: {
      harpoon: eq("harpoon").name,
      gun: eq("gun").id !== "g0" ? `${eq("gun").name}(${ammo}发)` : "无枪械",
      tank: eq("tank").name,
      suit: eq("suit").name,
      cargo: eq("cargo").name
    },
    inventory: Object.entries(inv).filter(([, n]) => n > 0).map(([id, n]) => ({
      id,
      name: FISH[id]?.n || id,
      count: n,
      value: FISH[id]?.v || 0,
      cook: FISH[id]?.cook || ""
    })).slice(0, 40),
    codexCount: Object.keys(codex).length,
    totalFish: Object.keys(FISH).length,
    activeCustomers: customers.filter(c => c.status === "waiting" || c.status === "eating").map(c => ({
      type: c.name,
      order: c.orderName,
      status: c.status
    })).slice(0, 8),
    selectedAgent: ADVISOR_PROFILE,
    fishingRule: "捕捉会进入鱼枪抓捕小游戏；小游戏过程中不持续消耗氧气；失败扣氧气。夜晚客人只点库存可做的菜，卖完或达接待上限会自动打烊。"
  });
  const localAdvisorAnswer = msg => {
    const agent = ADVISOR_PROFILE;
    const stock = Object.entries(inv).filter(([, n]) => n > 0).sort((a, b) => (FISH[b[0]]?.basePrice || FISH[b[0]]?.v || 0) - (FISH[a[0]]?.basePrice || FISH[a[0]]?.v || 0));
    const topStock = stock.slice(0, 3).map(([id, n]) => `${FISH[id]?.n || id}×${n}`).join("、") || "暂无库存";
    const bestDish = stock[0] ? FISH[stock[0][0]] : null;
    const openTables = customers.filter(c => c.status === "waiting" || c.status === "eating").length;
    const bestZone = ZONES[selZone]?.name || "当前水域";
    if (msg.includes("最该") || msg.includes("路线") || msg.includes("今天") || msg.includes("任务")) return `【${agent.emoji}${agent.name}】今天建议：先去${bestZone}补到3-5条能做菜的鱼，再开夜晚营业。当前库存：${topStock}。氧气充足就抓一条高价鱼当主菜；氧气低就上浮保收益。`;
    if (msg.includes("潜水") || msg.includes("去哪") || msg.includes("收益")) return `当前${phase === "day" ? "白天" : "夜晚"}，建议去${bestZone}补货。普通鱼保证今晚不断菜，稀有鱼等氧气和装载空间都够再追。装载箱超过80%就上浮，收益会更稳。`;
    if (msg.includes("赚钱") || msg.includes("菜品") || msg.includes("配菜") || msg.includes("库存")) return `库存扫描：${topStock}。建议把${bestDish?.n || "最高价鱼"}留给夜晚做${bestDish?.cook || "主菜"}；低价鱼用于稳定接待。库存少于3条时不要拖长营业，卖完会自动打烊。`;
    if (msg.includes("装备") || msg.includes("升级")) return `升级路线：先装载箱，再氧气瓶，再潜水服，最后补强鱼枪。装载提高每次下潜收入，氧气提高容错，潜水服解锁高价值区域；当前金币¥${gold.toLocaleString()}，不够就刷浅海稳定鱼。`;
    if (msg.includes("评分") || msg.includes("营业") || msg.includes("客人")) return `经营判断：当前在店${openTables}桌，今晚已接待${nightServeCount}/${NIGHT_CUSTOMER_LIMIT}。客人只会点库存里能做的菜；先保证3条以上食材再营业，评分会稳很多。`;
    if (msg.includes("BOSS") || msg.includes("稀有")) return `稀有鱼策略：氧气低于35%别挑战；如果有枪械，先削血再用鱼枪抓捕。高星和稀有目标移动更快，最好等鱼枪升级后再硬追。失败只扣一次氧气，不会在小游戏里持续耗氧。`;
    if (msg.includes("图鉴")) return `图鉴路线：每次下潜换一个深度，优先拍保护动物、抓未发现鱼。节日当天看地图加成，稀有鱼等氧气瓶和装载箱升级后再追。当前图鉴${codexCount}/${Object.keys(FISH).length}。`;
    if (msg.includes("氧气") || msg.includes("危险") || msg.includes("上浮")) return `氧气建议：低于35%不要碰BOSS和稀有鱼，低于20%直接上浮。鱼枪抓捕中不会持续掉氧，但失败会扣一次氧气，所以残氧少时别赌高星鱼。`;
    if (msg.includes("捕鱼") || msg.includes("抓鱼") || msg.includes("鱼枪") || msg.includes("命中")) return "鱼枪抓捕提示：绿色区域是游动目标，白色竖线是鱼枪杆。长按或连续点击左右按钮跟住目标，贴住绿色区才涨进度；普通鱼速度慢，稀有鱼和BOSS会更快，高级鱼枪能提高杆速和容错。";
    return `【${agent.emoji}${agent.name}】态势判断：${phase === "day" ? "先潜水补货" : "优先快速上菜"}。当前库存：${topStock}。我建议下一步：${phase === "day" ? "抓3-4条可做菜的鱼再开店" : "把最高价库存菜先卖掉，避免客人等待"}。`;
  };
  const askAi = async (preset = null) => {
    if (aiLoad) return;
    const msg = (typeof preset === "string" ? preset : aiIn).trim();
    if (!msg) return;
    setAiIn("");
    const newH = [...aiHist, {
      role: "user",
      content: msg
    }].slice(-12);
    setAiHist(newH);
    setAiLoad(true);
    setTimeout(() => {
      setAiHist([...newH, {
        role: "assistant",
        content: localAdvisorAnswer(msg)
      }].slice(-20));
      setAiLoad(false);
    }, 420);
  };
  const smartTips = () => {
    const tips = [];
    const totalStock = Object.values(inv).reduce((a, b) => a + b, 0);
    if (phase === "day" && dives === 0) tips.push("白天建议先补3条以上食材，再开夜晚营业。");
    if (phase === "day" && totalStock < 3) tips.push("库存偏低，优先抓普通鱼，别急着挑战稀有鱼。");
    if (phase === "night" && totalStock <= 0) tips.push("库存已空，等待桌台清空后会自动打烊。");
    if (phase === "night" && customers.some(c => c.status === "waiting")) tips.push("有客人在等菜，先处理已点订单，评分更稳。");
    if (gold >= 3000 && eq("cargo").id === "c1") tips.push("金币够时优先升级装载箱，每次下潜收益会明显提高。");
    if (codexCount < 8) tips.push("图鉴前期按水域逐个扫，保护动物拍照也算发现。");
    return tips.slice(0, 3);
  };
  const totalInv = Object.values(inv).reduce((a, b) => a + b, 0);
  const codexCount = Object.keys(codex).length;
  const advisorTips = smartTips();

  // ══════════════════ TITLE ══════════════════
  if (screen === "title") return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "linear-gradient(180deg,#000c18,#001428,#002240)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#ddeeff",
      padding: 24,
      overflow: "hidden",
      position: "relative"
    }
  }, [...Array(20)].map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: "absolute",
      bottom: -16,
      left: `${i * 5 % 100}%`,
      width: 4 + i % 6 * 5,
      height: 4 + i % 6 * 5,
      borderRadius: "50%",
      background: "rgba(80,180,255,.1)",
      animation: `bub ${2.2 + i * 0.35}s ease-in ${i * 0.28}s infinite`
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 88,
      animation: "bob 3s ease-in-out infinite,glow 2.5s ease-in-out infinite",
      marginBottom: 12
    }
  }, "\uD83E\uDD3F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 42,
      fontWeight: 900,
      letterSpacing: 5,
      background: "linear-gradient(135deg,#00d4ff,#fff,#7fffd4)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: 4
    }
  }, "\u6DF1\u6D77\u6355\u624B"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: 6,
      color: "#4a9ab8",
      marginBottom: 6
    }
  }, "DEEP CATCH"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#2a6888",
      marginBottom: 10,
      textAlign: "center"
    }
  }, "8\u5927\u6C34\u57DF \xB7 65\u79CD\u9C7C\u7C7B \xB7 \u771F\u5B9E\u7ECF\u8425\u7CFB\u7EDF \xB7 AI\u667A\u80FD\u4F53"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 40,
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, ["🪸珊瑚礁", "🌿海藻林", "🌊大洋", "🌋火山", "❄️北极", "⚓沉船", "🌴红树林", "🕳️深渊"].map((z, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 10,
      color: "#2a5a70"
    }
  }, z))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setScreen("main");
      setTab("map");
      rollWeather();
    },
    style: {
      padding: "14px 56px",
      fontSize: 18,
      fontWeight: 700,
      border: "2px solid #00d4ff",
      background: "rgba(0,100,160,0.22)",
      color: "#00d4ff",
      borderRadius: 50,
      cursor: "pointer",
      letterSpacing: 3,
      backdropFilter: "blur(10px)",
      boxShadow: "0 0 35px rgba(0,212,255,.4)",
      animation: "rise .8s ease .3s both"
    }
  }, "\u5F00\u59CB\u5192\u9669"));

  // ══════════════════ DIVE ══════════════════
  if (screen === "dive" && dive) {
    const z = ZONES[dive.zone];
    const o2p = dive.o2 / dive.maxO2 * 100;
    const hpp = dive.hp / dive.maxHp * 100;
    const cp = dive.cargo / dive.maxCargo * 100;
    const isBoss = isBossFish;
    // pick fish swim animation by type
    const fishAnim = f => {
      if (f.caught || f.fled) return "none";
      if (isBoss(f)) return "swimBoss 3.5s ease-in-out infinite";
      const id = f.id || "";
      if (id === "jellyfish") return "jellyPulse 1.8s ease-in-out infinite";
      if (id === "shark" || id === "whiteshark" || id === "hammerhead" || id === "polarshark") return "sharkCircle 4s ease-in-out infinite";
      if (id === "phantom") return "sneak 3s ease-in-out infinite";
      if (id === "giantsquid" || id === "octopus") return "tentacle 2.2s ease-in-out infinite";
      if (id === "seahorse" || id === "seadragon") return "float 3s ease-in-out infinite";
      if (id === "crab" || id === "lobster") return "snapClaw 2s ease-in-out infinite";
      if (f.ag) return "swimL 2.8s ease-in-out infinite";
      if (f.q >= 4) return "swimWave 3.2s ease-in-out infinite";
      return "swimS 2.2s ease-in-out infinite";
    };
    const fishSize = f => isBoss(f) ? 44 : f.q >= 3 ? 34 : 28;
    const depthLabel = dive.depth === "shallow" ? "浅海 0-10m" : dive.depth === "mid" ? "中层 10-30m" : "深海 30-60m";
    return /*#__PURE__*/React.createElement("div", {
      className: "dive-screen",
      style: {
        minHeight: "100vh",
        background: `linear-gradient(rgba(0,8,18,.42),rgba(0,8,18,.55)), ${z.bg}`,
        color: "#eefaff",
        padding: 14,
        paddingBottom: 16,
        position: "relative",
        overflow: "hidden"
      }
    }, [...Array(10)].map((_, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: "fixed",
        left: `${8 + i * 9}%`,
        bottom: 0,
        width: 3 + i % 4 * 3,
        height: 3 + i % 4 * 3,
        borderRadius: "50%",
        background: "rgba(100,200,255,.18)",
        animation: `bubbleUp ${2.5 + i * 0.6}s ease-in ${i * 0.7}s infinite`,
        pointerEvents: "none",
        zIndex: 0
      }
    })), dive.depth === "deep" && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(0,100,180,.04) 18px,rgba(0,100,180,.04) 20px)",
        pointerEvents: "none",
        zIndex: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "rgba(0,6,16,.88)",
        borderRadius: 14,
        padding: "10px 14px",
        marginBottom: 10,
        border: `1px solid ${o2p < 25 ? "rgba(255,50,50,.5)" : "rgba(255,255,255,.07)"}`,
        transition: "border-color .5s",
        backdropFilter: "blur(6px)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: z.color
      }
    }, z.emoji, " ", z.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: "rgba(210,240,255,.86)"
      }
    }, depthLabel, " \xB7 ", weather.emoji, weather.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center"
      }
    }, eq("gun").id !== "g0" && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#ff8855",
        background: "rgba(200,80,0,.2)",
        borderRadius: 6,
        padding: "2px 7px",
        border: "1px solid rgba(200,80,0,.4)"
      }
    }, "\uD83D\uDD2B ", ammo, "\u53D1"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: "#ffd700"
      }
    }, "\xA5", gold.toLocaleString()))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 9,
        color: o2p < 25 ? "#ff8888" : "#9edfff",
        marginBottom: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: o2p < 25 ? {
        animation: "pulse .5s infinite",
        color: "#ff4444"
      } : {}
    }, "\uD83D\uDCA7 \u6C27\u6C14"), /*#__PURE__*/React.createElement("span", null, dive.o2, "/", dive.maxO2)), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8,
        background: "rgba(0,6,16,.82)",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(0,80,120,.3)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${Math.min(100, o2p)}%`,
        height: "100%",
        background: o2p < 25 ? "linear-gradient(90deg,#ff2222,#ff6644)" : o2p < 50 ? "linear-gradient(90deg,#ffaa00,#00ccff)" : "linear-gradient(90deg,#00aaff,#00eeff)",
        borderRadius: 4,
        transition: "width .6s",
        boxShadow: o2p > 20 ? "0 0 6px rgba(0,200,255,.5)" : "none"
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 9,
        color: dive.hp < 30 ? "#ff8888" : "#9edfff",
        marginBottom: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: dive.hp < 30 ? {
        animation: "pulse .5s infinite",
        color: "#ff4444"
      } : {}
    }, "\u2764\uFE0F \u751F\u547D"), /*#__PURE__*/React.createElement("span", null, dive.hp, "/", dive.maxHp)), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8,
        background: "rgba(0,6,16,.82)",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(0,80,40,.3)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${Math.min(100, hpp)}%`,
        height: "100%",
        background: dive.hp < 30 ? "linear-gradient(90deg,#ff2222,#ff6644)" : dive.hp < 60 ? "linear-gradient(90deg,#ffcc00,#44ff88)" : "linear-gradient(90deg,#22cc55,#44ff88)",
        borderRadius: 4,
        transition: "width .5s",
        boxShadow: dive.hp > 30 ? "0 0 5px rgba(50,220,80,.5)" : "none"
      }
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 9,
        color: cp > 90 ? "#ffb088" : "#9edfff",
        marginBottom: 2
      }
    }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCE6 \u88C5\u8F7D"), /*#__PURE__*/React.createElement("span", null, dive.cargo.toFixed(1), "/", dive.maxCargo, "kg")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        background: "rgba(0,6,16,.82)",
        borderRadius: 3,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${Math.min(100, cp)}%`,
        height: "100%",
        background: cp > 90 ? "linear-gradient(90deg,#ff8800,#ffcc00)" : "linear-gradient(90deg,#886600,#ffaa00)",
        borderRadius: 3,
        transition: "width .4s"
      }
    })))), fishTalk && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "linear-gradient(135deg,rgba(180,20,20,.35),rgba(100,0,0,.4))",
        border: "1px solid #ff5533",
        borderRadius: 12,
        padding: "10px 14px",
        marginBottom: 10,
        fontSize: 13,
        color: "#ffcccc",
        animation: "pop .25s ease,shake .3s ease",
        backdropFilter: "blur(4px)"
      }
    }, fishTalk), notif && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "rgba(0,160,80,.35)",
        border: "1px solid #44cc88",
        borderRadius: 10,
        padding: "8px 14px",
        marginBottom: 10,
        fontSize: 12,
        color: "#ccffdd",
        animation: "pop .2s ease",
        backdropFilter: "blur(4px)"
      }
    }, notif), fishing && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "linear-gradient(180deg,rgba(0,12,32,.98),rgba(0,34,68,.96))",
        border: "1px solid rgba(0,210,255,.55)",
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
        boxShadow: "0 8px 30px rgba(0,0,0,.55), inset 0 0 18px rgba(0,140,220,.12)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 800,
        color: "#f2fbff"
      }
    }, fishing.emoji, " \u6B63\u5728\u9C7C\u67AA\u8FFD\u8E2A ", fishing.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: fishing.ag ? "#ffb088" : "#82ddff"
      }
    }, fishing.rare ? "稀有 " : "", "\u96BE\u5EA6 ", Math.round(fishing.difficulty))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 8,
        fontSize: 8,
        color: "#8fcce2",
        fontWeight: 700
      }
    }, /*#__PURE__*/React.createElement("span", null, "\u9C7C\u901F ", fishing.targetMaxSpeed.toFixed(1)), /*#__PURE__*/React.createElement("span", null, "\u6746\u901F ", fishing.cursorSpeed.toFixed(1)), /*#__PURE__*/React.createElement("span", null, "\u547D\u4E2D\u7A97 ", Math.round(fishing.hitWindow * 2), "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        height: 92,
        background: "linear-gradient(180deg,rgba(0,60,115,.58),rgba(0,10,24,.92))",
        border: "1px solid rgba(0,160,230,.5)",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 9
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: `${fishing.target}%`,
        top: 12,
        width: `${fishing.hitWindow * 2}%`,
        height: 60,
        marginLeft: `-${fishing.hitWindow}%`,
        borderRadius: 10,
        background: fishing.good ? "rgba(80,255,160,.40)" : "rgba(80,255,160,.22)",
        border: `1px solid ${fishing.good ? "#66ffaa" : "#44ee99"}`,
        boxShadow: fishing.good ? "0 0 24px rgba(80,255,160,.55)" : "0 0 16px rgba(80,255,160,.25)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: `${fishing.target}%`,
        top: 4,
        width: 8,
        height: 8,
        marginLeft: -4,
        borderRadius: "50%",
        background: "#6dffb0",
        boxShadow: "0 0 10px #6dffb0"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: `${fishing.cursor}%`,
        top: 5,
        width: 5,
        height: 74,
        marginLeft: -2.5,
        borderRadius: 4,
        background: fishing.active ? "#ccffff" : "#fff",
        boxShadow: fishing.active ? "0 0 18px #66ffff" : "0 0 12px #00d4ff"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 10,
        right: 10,
        bottom: 8,
        height: 7,
        background: "rgba(0,0,0,.45)",
        borderRadius: 4,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${fishing.progress}%`,
        height: "100%",
        background: fishing.progress < 25 ? "#ff5555" : "linear-gradient(90deg,#00aaff,#44ff99)",
        transition: "width .08s"
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", _extends({}, ctrlProps(-1), {
      style: {
        padding: "12px 0",
        fontSize: 13,
        fontWeight: 900,
        background: fishCtrlRef.current < 0 ? "rgba(0,190,220,.55)" : "rgba(0,90,170,.36)",
        border: "1px solid #00aaff",
        borderRadius: 10,
        color: "#e7fbff",
        cursor: "pointer",
        touchAction: "none"
      }
    }), "\u2190 \u5DE6\u79FB\u9C7C\u67AA"), /*#__PURE__*/React.createElement("button", _extends({}, ctrlProps(1), {
      style: {
        padding: "12px 0",
        fontSize: 13,
        fontWeight: 900,
        background: fishCtrlRef.current > 0 ? "rgba(0,190,220,.55)" : "rgba(0,90,170,.36)",
        border: "1px solid #00aaff",
        borderRadius: 10,
        color: "#e7fbff",
        cursor: "pointer",
        touchAction: "none"
      }
    }), "\u53F3\u79FB\u9C7C\u67AA \u2192")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: "#8fcce2",
        marginTop: 7,
        textAlign: "center",
        fontWeight: 700
      }
    }, "\u957F\u6309\u6216\u8FDE\u7EED\u70B9\u51FB\u5DE6\u53F3\u952E\uFF0C\u8BA9\u767D\u8272\u9C7C\u67AA\u6746\u8DDF\u4E0A\u7EFF\u8272\u6E38\u52A8\u76EE\u6807\uFF1B\u8D34\u4F4F\u547D\u4E2D\u533A\u624D\u6DA8\u6761\uFF0C\u505C\u624B\u6216\u504F\u79BB\u4F1A\u6389\u6761\u3002")), curFestival && /*#__PURE__*/React.createElement("div", {
      style: {
        background: `${curFestival.color}18`,
        border: `1px solid ${curFestival.color}44`,
        borderRadius: 8,
        padding: "4px 10px",
        marginBottom: 8,
        fontSize: 10,
        color: curFestival.color,
        animation: "pulse 2s infinite"
      }
    }, curFestival.emoji, " ", curFestival.name, "\u52A0\u6210\u4E2D"), Object.keys(dive.caughtMap || {}).length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "rgba(0,8,20,.82)",
        border: "1px solid rgba(0,180,220,.32)",
        borderRadius: 10,
        padding: "8px 10px",
        marginBottom: 10,
        boxShadow: "0 4px 16px rgba(0,0,0,.35)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 800,
        color: "#9feeff",
        marginBottom: 5
      }
    }, "\uD83C\uDF92 \u6C34\u4E0B\u80CC\u5305"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 5,
        flexWrap: "wrap"
      }
    }, Object.entries(dive.caughtMap).map(([id, n]) => FISH[id] && /*#__PURE__*/React.createElement("div", {
      key: id,
      style: {
        fontSize: 9,
        color: "#d8f6ff",
        background: "rgba(0,55,90,.55)",
        border: "1px solid rgba(80,210,255,.24)",
        borderRadius: 7,
        padding: "3px 7px"
      }
    }, FISH[id].e, " ", FISH[id].n, "\xD7", n)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        marginBottom: 12
      }
    }, dive.fish.filter(f => !f.caught && !f.fled).map((fish, idx) => {
      const done = fish.caught || fish.fled;
      const prot = fish.prot || fish.v === 0;
      const boss = isBoss(fish);
      const hpPct = fish.curHp / fish.hp * 100;
      const cardDelay = `${idx * 0.06}s`;
      const borderCol = fish.caught ? "#33aa66" : fish.fled ? "#2a2a2a" : prot ? "#33aa66" : boss ? "#ff2200" : fish.ag ? "#ff5533" : "#003d77";
      const bgCol = fish.caught ? "rgba(0,120,55,.22)" : fish.fled ? "rgba(30,30,30,.2)" : prot ? "rgba(0,70,25,.2)" : boss ? "rgba(60,0,0,.5)" : "rgba(0,12,35,.78)";
      const glowStyle = !done && fish.ag && !fish.caught ? {
        animation: "borderGlow 1.8s ease-in-out infinite"
      } : {};
      const greenStyle = !done && !fish.ag && !fish.caught ? {
        animation: "greenBorder 3s ease-in-out infinite"
      } : {};
      return /*#__PURE__*/React.createElement("div", {
        key: fish.uid,
        className: "dive-card",
        style: {
          ...glowStyle,
          ...greenStyle,
          background: bgCol,
          border: `1px solid ${borderCol}`,
          borderRadius: 13,
          padding: 10,
          opacity: done ? .5 : 1,
          animationDelay: cardDelay,
          position: "relative",
          overflow: "hidden",
          transition: "opacity .4s"
        }
      }, fish.rare && !done && /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(ellipse at 50% 20%,rgba(255,215,0,.08),transparent 70%)",
          borderRadius: 13,
          pointerEvents: "none"
        }
      }), boss && !done && /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(ellipse at 50% 30%,rgba(255,30,0,.12),transparent 70%)",
          borderRadius: 13,
          pointerEvents: "none"
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 6
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: "relative"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: fishSize(fish),
          display: "block",
          animation: fishAnim(fish),
          lineHeight: 1.1
        }
      }, fish.e), boss && !done && /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          top: -4,
          left: -2,
          fontSize: 8,
          color: "#ff4400",
          fontWeight: 900,
          textShadow: "0 0 4px #ff2200"
        }
      }, "BOSS"), fish.rare && !done && /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          bottom: -2,
          right: -2,
          fontSize: 9
        }
      }, "\u2728"), prot && !done && /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          bottom: -2,
          right: -2,
          fontSize: 9
        }
      }, "\uD83D\uDEE1\uFE0F")), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right",
          flex: 1,
          paddingLeft: 6
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: boss ? "#ff8844" : prot ? "#44cc88" : fish.rare ? "#ffd700" : "#cce8ff",
          lineHeight: 1.2
        }
      }, fish.n), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 8,
          color: "#a9d8ec",
          marginTop: 1
        }
      }, prot ? "🛡 保护动物" : `${fish.w}kg · ¥${fish.v}`), !done && !prot && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 8,
          color: "#93c8e0",
          marginTop: 1
        }
      }, "⭐".repeat(fish.q), " \u54C1\u8D28"))), !done && !prot && /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 5
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: 4,
          background: "rgba(0,6,16,.82)",
          borderRadius: 2,
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: `${hpPct}%`,
          height: "100%",
          background: hpPct < 30 ? "#ff3333" : hpPct < 60 ? "#ffaa00" : fish.ag ? "#ff5588" : "#3399ff",
          borderRadius: 2,
          transition: "width .3s",
          boxShadow: fish.ag && hpPct > 50 ? "0 0 4px rgba(255,50,100,.6)" : "none"
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 8,
          color: "#7fb8d0",
          textAlign: "right",
          marginTop: 1
        }
      }, fish.curHp, "/", fish.hp)), !done && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          color: prot ? "#44cc88" : fish.ag ? "#ff9966" : "#5a7a9a",
          marginBottom: 7,
          lineHeight: 1.4
        }
      }, fish.desc), !done && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 5
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => catchFish(fish),
        style: {
          flex: 1,
          padding: "7px 0",
          fontSize: 10,
          background: prot ? "linear-gradient(135deg,rgba(0,150,60,.4),rgba(0,100,40,.3))" : "linear-gradient(135deg,rgba(0,80,200,.4),rgba(0,50,150,.3))",
          border: `1px solid ${prot ? "#33bb66" : "#0055cc"}`,
          borderRadius: 8,
          color: prot ? "#55ee99" : "#66aaff",
          cursor: "pointer",
          fontWeight: 600,
          transition: "all .15s"
        }
      }, prot ? "📷 拍照" : "🔱 捕捉"), !prot && eq("gun").id !== "g0" && ammo > 0 && /*#__PURE__*/React.createElement("button", {
        onClick: () => shootFish(fish),
        style: {
          flex: 1,
          padding: "7px 0",
          fontSize: 10,
          background: "linear-gradient(135deg,rgba(200,50,0,.4),rgba(140,20,0,.3))",
          border: "1px solid #cc3300",
          borderRadius: 8,
          color: "#ff8855",
          cursor: "pointer",
          fontWeight: 600
        }
      }, "\uD83D\uDD2B \u5C04\u51FB")), fish.caught && /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center",
          fontSize: 12,
          color: prot ? "#44cc88" : "#33ee77",
          fontWeight: 700,
          padding: "4px 0",
          animation: "pop .3s ease"
        }
      }, prot ? "📷 已拍照" : "✅ 已捕获"), fish.fled && /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center",
          fontSize: 11,
          color: "#555",
          padding: "4px 0"
        }
      }, "\uD83D\uDCA8 \u9003\u8131\u4E86"));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 8,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: switchArea,
      disabled: dive.o2 < 10,
      style: {
        padding: "12px 0",
        fontSize: 11,
        background: dive.o2 < 10 ? "rgba(30,30,30,.4)" : "linear-gradient(135deg,rgba(0,180,140,.35),rgba(0,120,100,.25))",
        border: `1px solid ${dive.o2 < 10 ? "#222" : "#00bbaa"}`,
        borderRadius: 11,
        color: dive.o2 < 10 ? "#333" : "#00eedd",
        cursor: dive.o2 < 10 ? "not-allowed" : "pointer",
        fontWeight: 600,
        transition: "all .2s"
      }
    }, "\uD83C\uDF0A \u6362\u533A\u57DF", /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: dive.o2 < 10 ? "#222" : "rgba(0,230,200,.6)",
        marginTop: 2
      }
    }, "-10\u6C27\u6C14")), /*#__PURE__*/React.createElement("button", {
      onClick: useSupply,
      style: {
        padding: "12px 0",
        fontSize: 11,
        background: "linear-gradient(135deg,rgba(220,130,0,.3),rgba(160,80,0,.2))",
        border: "1px solid #ddaa00",
        borderRadius: 11,
        color: "#ffcc33",
        cursor: "pointer",
        fontWeight: 600
      }
    }, "\u26FD \u8865\u7ED9\u7AD9", /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: "rgba(255,190,0,.6)",
        marginTop: 2
      }
    }, "\xA5", Math.floor(ZONES[dive.zone].cost * (hasS("w4") ? 0.75 : 1)))), /*#__PURE__*/React.createElement("button", {
      onClick: () => doSurface(null),
      style: {
        padding: "12px 0",
        fontSize: 11,
        background: "linear-gradient(135deg,rgba(40,190,50,.3),rgba(20,130,30,.2))",
        border: "1px solid #33bb33",
        borderRadius: 11,
        color: "#66ee66",
        cursor: "pointer",
        fontWeight: 600
      }
    }, "\uD83C\uDFD6\uFE0F \u4E0A\u6D6E", /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: "rgba(80,220,80,.6)",
        marginTop: 2
      }
    }, "\u7ED3\u675F\u6F5C\u6C34"))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "rgba(0,8,18,.72)",
        borderRadius: 8,
        padding: "5px 10px",
        marginBottom: 8,
        fontSize: 9,
        color: "#9fd8ef",
        display: "flex",
        gap: 12,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCA7 \u6362\u533A\u57DF -10\u6C27"), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCA5 \u88AB\u653B\u51FB\u6027\u9C7C\u53CD\u51FB \u2192 \u6263\u6C27\u6C14"), /*#__PURE__*/React.createElement("span", null, "\u26FD \u8865\u7ED9\u7AD9\u56DE\u590D\u6C27\u6C14"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#ff4444"
      }
    }, "\u26A0\uFE0F \u6C27\u6C14\u5F52\u96F6\u81EA\u52A8\u4E0A\u6D6E")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "rgba(0,6,16,.82)",
        borderRadius: 11,
        padding: 10,
        maxHeight: 110,
        overflowY: "auto",
        border: "1px solid rgba(0,40,80,.4)",
        backdropFilter: "blur(4px)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: "#7fb8d0",
        marginBottom: 4,
        letterSpacing: 1
      }
    }, "\u2500\u2500 \u6F5C\u6C34\u65E5\u5FD7 \u2500\u2500"), dive.dlog.map((l, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        fontSize: 10,
        color: i === 0 ? "#d7f4ff" : "#8fc4dc",
        padding: "2px 0",
        borderBottom: "1px solid rgba(255,255,255,.02)",
        lineHeight: 1.5
      }
    }, l)))));
  }

  // ══════════════════ MAIN HUB ══════════════════
  const TABS = [{
    id: "map",
    label: "🗺️ 地图"
  }, {
    id: "calendar",
    label: `📅 日历${curFestival ? "🎉" : ""}`
  }, {
    id: "inventory",
    label: totalInv > 0 ? `📦 库存(${totalInv})` : "📦 库存"
  }, {
    id: "restaurant",
    label: "🍣 餐厅"
  }, {
    id: "kitchen",
    label: "👨‍🍳 厨房"
  }, {
    id: "shop",
    label: "🛒 商店"
  }, {
    id: "quests",
    label: "📋 任务"
  }, {
    id: "codex",
    label: "📖 图鉴"
  }, {
    id: "ai",
    label: "🤖 顾问"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "linear-gradient(180deg,#000c18,#001220)",
      color: "#cce8ff",
      paddingBottom: 68
    }
  }, notif && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 68,
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(0,140,70,.92)",
      border: "1px solid #44cc88",
      borderRadius: 12,
      padding: "9px 20px",
      fontSize: 13,
      color: "#ccffdd",
      zIndex: 999,
      animation: "pop .25s ease",
      whiteSpace: "nowrap",
      maxWidth: "80vw",
      textAlign: "center"
    }
  }, notif), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(0,10,25,.98)",
      padding: "10px 14px 7px",
      borderBottom: "1px solid rgba(0,90,160,.3)",
      position: "sticky",
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 900,
      letterSpacing: 2,
      color: "#00d4ff"
    }
  }, "\uD83E\uDD3F \u6DF1\u6D77\u6355\u624B"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#1e4e6a"
    }
  }, "Lv.", level, " \xB7 \u9910\u5385", restLv, "\u2605 \xB7 \u7B2C", day, "\u5929(", monthDay, "\u53F7) \xB7 ", curSeason.emoji, curSeason.name, " \xB7 ", weather.emoji, weather.name, " \xB7 \u2B50", rating.toFixed(1)), curFestival && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: curFestival.color,
      fontWeight: 700,
      animation: "pulse 1.5s infinite"
    }
  }, curFestival.emoji, " \u4ECA\u65E5\u8282\u65E5\uFF1A", curFestival.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: "#ffd700"
    }
  }, "\xA5", gold.toLocaleString()), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      padding: "2px 7px",
      borderRadius: 18,
      marginTop: 2,
      display: "inline-block",
      background: phase === "day" ? "rgba(255,195,0,.18)" : "rgba(80,55,200,.22)",
      border: `1px solid ${phase === "day" ? "#ccbb00" : "#6644dd"}`,
      color: phase === "day" ? "#ffdd44" : "#aa88ff"
    }
  }, phase === "day" ? `☀️ 白天 · 剩${2 - dives}次` : "🌙 夜晚营业"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      background: "rgba(0,0,0,.45)",
      borderRadius: 2,
      marginTop: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${xp / (level * 300) * 100}%`,
      height: "100%",
      background: "linear-gradient(90deg,#0044ff,#00d4ff)",
      borderRadius: 2,
      transition: "width .5s"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "7px 13px 0"
    }
  }, phase === "day" && dives >= 2 && /*#__PURE__*/React.createElement("button", {
    onClick: endDay,
    style: {
      width: "100%",
      padding: "9px 0",
      background: "linear-gradient(135deg,rgba(55,35,170,.4),rgba(22,10,100,.4))",
      border: "1px solid #5533dd",
      borderRadius: 10,
      color: "#bbaaff",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700
    }
  }, "\uD83C\uDF19 \u7ED3\u675F\u767D\u5929 \u2192 \u5F00\u542F\u591C\u95F4\u7ECF\u8425"), phase === "night" && /*#__PURE__*/React.createElement("button", {
    onClick: endNight,
    style: {
      width: "100%",
      padding: "9px 0",
      background: "linear-gradient(135deg,rgba(180,120,0,.4),rgba(110,65,0,.4))",
      border: "1px solid #ffaa00",
      borderRadius: 10,
      color: "#ffdd66",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700
    }
  }, "\u2600\uFE0F \u7ED3\u675F\u8425\u4E1A \u2192 \u65B0\u7684\u4E00\u5929\uFF08\u591C\u95F4\xA5", nightEarnings.toLocaleString(), "\xB7\u63A5\u5F85", nightServeCount, "\u684C\uFF09")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      borderBottom: "1px solid rgba(0,55,110,.3)",
      background: "rgba(0,5,14,.75)",
      overflowX: "auto"
    }
  }, TABS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setTab(t.id),
    style: {
      flex: 1,
      minWidth: 44,
      padding: "9px 2px",
      fontSize: 8.5,
      border: "none",
      background: tab === t.id ? "rgba(0,100,180,.2)" : "transparent",
      color: tab === t.id ? "#00d4ff" : "#1a3e58",
      borderBottom: tab === t.id ? "2px solid #00d4ff" : "2px solid transparent",
      cursor: "pointer",
      whiteSpace: "nowrap"
    }
  }, t.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12
    },
    className: "tb"
  }, tab === "map" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#1e4860",
      marginBottom: 11
    }
  }, phase === "day" ? `☀️ 选择水域下潜（今日剩余 ${2 - dives} 次）` : "🌙 夜晚无法下潜，请经营餐厅"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 7,
      marginBottom: 12
    }
  }, Object.values(ZONES).map(z => {
    const access = eq("suit").zones.includes(z.id);
    const sel = selZone === z.id;
    const fishHere = Object.values(FISH).filter(f => f.z === z.id).length;
    const found = Object.keys(codex).filter(id => FISH[id]?.z === z.id).length;
    return /*#__PURE__*/React.createElement("button", {
      key: z.id,
      onClick: () => access && setSelZone(z.id),
      style: {
        padding: "10px 8px",
        background: sel ? `${z.color}22` : "rgba(0,12,30,.65)",
        border: `2px solid ${sel ? z.color : access ? "#112233" : "#0a0a0a"}`,
        borderRadius: 12,
        color: access ? z.color : "#1a1a1a",
        cursor: access ? "pointer" : "not-allowed",
        textAlign: "left",
        transition: "all .2s"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 22
      }
    }, z.emoji), !access && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: "#222"
      }
    }, "\uD83D\uDD12")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        marginTop: 3
      }
    }, z.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        opacity: .7,
        marginTop: 2
      }
    }, found, "/", fishHere, "\u79CD\u5DF2\u53D1\u73B0"));
  })), (() => {
    const z = ZONES[selZone];
    const access = eq("suit").zones.includes(selZone);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: `${z.color}12`,
        border: `1px solid ${z.color}33`,
        borderRadius: 13,
        padding: 13,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 28
      }
    }, z.emoji), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: z.color
      }
    }, z.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#5a8a9a"
      }
    }, z.desc)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: "#3a6a78",
        background: "rgba(0,0,0,.3)",
        borderRadius: 7,
        padding: "4px 8px",
        textAlign: "center"
      }
    }, "\u26FD\xA5", z.cost)), !access && /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#ff6644",
        fontSize: 11,
        marginBottom: 8
      }
    }, "\uD83D\uDD12 \u9700\u8981\u66F4\u9AD8\u7EA7\u6F5C\u6C34\u670D\u624D\u80FD\u8FDB\u5165"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 5,
        marginBottom: 10
      }
    }, Object.entries(FISH).filter(([, f]) => f.z === selZone).slice(0, 10).map(([id, f]) => /*#__PURE__*/React.createElement("div", {
      key: id,
      style: {
        background: "rgba(0,0,0,.3)",
        borderRadius: 5,
        padding: "2px 7px",
        fontSize: 10,
        border: `1px solid ${codex[id] ? "#336633" : "#1a3a4a"}`
      }
    }, f.e, " ", codex[id] ? f.n : "???"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 7
      }
    }, z.depths.map(d => {
      const dLabel = d === "shallow" ? "浅海" : d === "mid" ? "中层" : "深海";
      const depthLock = DEPTH_ORDER.indexOf(d) > DEPTH_ORDER.indexOf(eq("suit").maxD);
      const locked = phase !== "day" || dives >= 2 || !access || depthLock;
      const pool = getFish(selZone, d).filter(f => f.v > 0);
      const maxV = pool.length ? Math.max(...pool.map(f => f.v)) : 0;
      return /*#__PURE__*/React.createElement("button", {
        key: d,
        onClick: () => startDive(selZone, d),
        disabled: locked,
        style: {
          flex: 1,
          padding: "11px 5px",
          background: locked ? "rgba(15,15,15,.35)" : `${z.color}22`,
          border: `1px solid ${locked ? "#1a1a1a" : z.color}55`,
          borderRadius: 10,
          color: locked ? "#2a2a2a" : z.color,
          cursor: locked ? "not-allowed" : "pointer",
          fontSize: 11,
          textAlign: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 700,
          marginBottom: 3
        }
      }, dLabel), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          opacity: .8
        }
      }, depthLock ? "🔒深度不足" : phase === "night" ? "🌙夜晚" : dives >= 2 ? "次数耗尽" : !access ? "🔒锁定" : `最高¥${maxV.toLocaleString()}`));
    })));
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(0,12,35,.55)",
      borderRadius: 11,
      padding: 11,
      border: "1px solid rgba(0,55,100,.3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#3a6a8a",
      fontWeight: 700,
      marginBottom: 7
    }
  }, "\uD83D\uDD27 \u5F53\u524D\u88C5\u5907"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 5
    }
  }, [{
    t: "harpoon",
    i: "🔱"
  }, {
    t: "gun",
    i: "🔫"
  }, {
    t: "tank",
    i: "💧"
  }, {
    t: "suit",
    i: "🤿"
  }, {
    t: "cargo",
    i: "📦"
  }].map(({
    t,
    i
  }) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      background: "rgba(0,22,55,.42)",
      borderRadius: 7,
      padding: "5px 9px",
      fontSize: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#1e4460"
    }
  }, i, " "), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#88aacc"
    }
  }, eq(t).name), t === "gun" && eq(t).id !== "g0" && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#ff8844",
      marginLeft: 3
    }
  }, "\xD7", ammo)))))), tab === "restaurant" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(0,30,60,.5)",
      borderRadius: 10,
      padding: "9px 10px",
      border: "1px solid rgba(0,80,140,.3)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#3a6a88"
    }
  }, "\u8BC4\u5206"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: "#ffd700"
    }
  }, "\u2B50", rating.toFixed(1))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(0,30,60,.5)",
      borderRadius: 10,
      padding: "9px 10px",
      border: "1px solid rgba(0,80,140,.3)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#3a6a88"
    }
  }, "\u58F0\u8A89"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: reputation > 60 ? "#44ff88" : reputation > 30 ? "#ffcc44" : "#ff6644"
    }
  }, reputation)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(0,30,60,.5)",
      borderRadius: 10,
      padding: "9px 10px",
      border: "1px solid rgba(0,80,140,.3)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#3a6a88"
    }
  }, "\u4ECA\u591C\u8425\u6536"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "#44ff88"
    }
  }, "\xA5", nightEarnings.toLocaleString()))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 9,
      color: "#3a6a88",
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u9910\u5385\u7ECF\u9A8C ", restLv, "\u2605"), /*#__PURE__*/React.createElement("span", null, Math.floor(restXp), "/", restLv * 1000)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 5,
      background: "rgba(0,0,0,.4)",
      borderRadius: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${restXp / (restLv * 1000) * 100}%`,
      height: "100%",
      background: "linear-gradient(90deg,#ff6b35,#ffd700)",
      borderRadius: 3
    }
  }))), phase !== "night" && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(45,22,0,.42)",
      border: "1px solid #774400",
      borderRadius: 9,
      padding: "9px 12px",
      marginBottom: 11,
      fontSize: 11,
      color: "#ffbb44"
    }
  }, "\u26A0\uFE0F \u9910\u5385\u4EC5\u591C\u665A\u8425\u4E1A\uFF01\u767D\u5929\u6F5C\u6C34\u6355\u9C7C\u79EF\u7D2F\u98DF\u6750\u3002"), phase === "night" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#4a7a8a",
      fontWeight: 700,
      marginBottom: 8
    }
  }, "\uD83E\uDE91 \u5F53\u524D\u684C\u53F0\uFF08", customers.filter(c => c.status === "waiting" || c.status === "eating").length, "/", tableCount + (hasU("r4") ? 2 : 0), "\u6EE1\uFF09"), customers.filter(c => c.status === "waiting" || c.status === "eating").length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      color: "#1a3a58",
      padding: "14px 0",
      fontSize: 13
    }
  }, "\u7B49\u5F85\u5BA2\u4EBA\u5230\u6765\u2026"), customers.filter(c => c.status === "waiting" || c.status === "eating").map(c => {
    const now = Date.now();
    const patience = Math.max(0, c.patienceEnd - now);
    const patiencePct = patience / c.patienceMs * 100;
    const cooking = cookQueue.find(q => q.custUid === c.uid);
    return /*#__PURE__*/React.createElement("div", {
      key: c.uid,
      style: {
        background: "rgba(0,25,55,.6)",
        border: `1px solid ${c.status === "eating" ? "rgba(0,180,80,.4)" : "rgba(0,80,140,.3)"}`,
        borderRadius: 12,
        padding: "11px 12px",
        marginBottom: 8,
        animation: "walkIn .4s ease"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 7
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 22
      }
    }, c.customerEmoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700
      }
    }, c.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: "#3a6a88"
      }
    }, c.status === "eating" ? "🍽️ 用餐中" : cooking ? "👨‍🍳 烹饪中" : "😐 等待点菜", " · 预算¥", Math.floor((c.bill || 0) * c.spendMult) || "?"))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, c.status === "eating" && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#44cc88"
      }
    }, "\u2705 \u5DF2\u4E0A\u83DC"), cooking && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: "#ffcc44"
      }
    }, "\u23F3", Math.max(0, Math.floor((cooking.finishAt - Date.now()) / 1000)), "s"))), c.status !== "eating" && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 7
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: patiencePct < 30 ? "#ff8888" : "#3a6a88",
        marginBottom: 2
      }
    }, "\u23F0 ", patiencePct < 30 ? "快不耐烦了！" : "耐心值", " ", Math.floor(patience / 1000), "s"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 4,
        background: "rgba(0,0,0,.4)",
        borderRadius: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${patiencePct}%`,
        height: "100%",
        background: patiencePct < 30 ? "#ff4444" : "#00aaff",
        borderRadius: 2,
        transition: "width .5s"
      }
    }))), c.status === "waiting" && !cooking && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: "#3a6a88",
        marginBottom: 5
      }
    }, "\u5BA2\u4EBA\u70B9\u5355\uFF1A", c.orderEmoji, " ", c.orderName), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 5
      }
    }, availDishes.filter(d => d.fishId === c.orderFishId && (inv[d.fishId] || 0) > 0).map(d => /*#__PURE__*/React.createElement("button", {
      key: d.id,
      onClick: () => serveDish(c.uid, d),
      style: {
        padding: "5px 8px",
        fontSize: 9,
        background: "rgba(0,100,200,.3)",
        border: "1px solid #0055bb",
        borderRadius: 7,
        color: "#88ccff",
        cursor: "pointer"
      }
    }, d.emoji, " ", d.name, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#ffd700"
      }
    }, "\xA5", d.basePrice))), availDishes.filter(d => d.fishId === c.orderFishId && (inv[d.fishId] || 0) > 0).length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: "#ff6644"
      }
    }, "\u274C \u8FD9\u9053\u83DC\u521A\u597D\u5356\u5B8C\u4E86\uFF0C\u4ECA\u665A\u4E0D\u4F1A\u518D\u63A5\u8FD9\u7C7B\u8BA2\u5355\u3002"))));
  }), customers.filter(c => c.status === "left_angry").map(c => /*#__PURE__*/React.createElement("div", {
    key: c.uid,
    style: {
      background: "rgba(150,20,20,.25)",
      border: "1px solid #aa3333",
      borderRadius: 10,
      padding: "8px 12px",
      marginBottom: 6,
      fontSize: 11,
      color: "#ff8888",
      animation: "walkOut .5s ease"
    }
  }, c.customerEmoji, " ", c.name, " \u6124\u7136\u79BB\u53BB\uFF01"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(0,10,25,.5)",
      borderRadius: 10,
      padding: 10,
      maxHeight: 150,
      overflowY: "auto",
      border: "1px solid rgba(0,50,100,.25)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#3a6a88",
      marginBottom: 5,
      fontWeight: 700
    }
  }, "\uD83D\uDCCB \u9910\u5385\u65E5\u5FD7"), restLog.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#1a3a58",
      textAlign: "center",
      padding: "10px 0"
    }
  }, "\u591C\u665A\u5F00\u59CB\u540E\u65E5\u5FD7\u5C06\u663E\u793A\u5728\u8FD9\u91CC"), restLog.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 10,
      color: i === 0 ? "#88aacc" : "#234455",
      padding: "2px 0",
      borderBottom: "1px solid rgba(255,255,255,.025)"
    }
  }, l.msg)))), tab === "kitchen" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#4a7a8a",
      fontWeight: 700
    }
  }, "\uD83D\uDC68\u200D\uD83C\uDF73 \u83DC\u5355\u98DF\u8C31"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#ffd700"
    }
  }, availDishes.length, "/", ALL_DISHES.length, "\u9053\u5DF2\u89E3\u9501")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      background: "rgba(0,0,0,.4)",
      borderRadius: 2,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${availDishes.length / ALL_DISHES.length * 100}%`,
      height: "100%",
      background: "linear-gradient(90deg,#ff6b35,#ffd700)",
      borderRadius: 2
    }
  })), [1, 2, 3, 4, 5].map(tier => {
    const dishes = ALL_DISHES.filter(d => d.unlockRest === tier);
    if (!dishes.length) return null;
    const tierNames = ["", "入门套餐", "特色料理", "高档精品", "传说佳肴", "神话级宴席"];
    const unlocked = tier <= restLv;
    return /*#__PURE__*/React.createElement("div", {
      key: tier,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: unlocked ? "#ffd700" : "#333",
        marginBottom: 7,
        paddingBottom: 5,
        borderBottom: `1px solid ${unlocked ? "rgba(255,215,0,.25)" : "#111"}`
      }
    }, starStr(tier), " ", tierNames[tier], " ", !unlocked && `（需要餐厅${tier}★）`), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 7
      }
    }, dishes.map(d => {
      const inStock = (inv[d.fishId] || 0) > 0;
      const fishData = FISH[d.fishId];
      return /*#__PURE__*/React.createElement("div", {
        key: d.id,
        style: {
          background: unlocked ? inStock ? "rgba(0,40,20,.5)" : "rgba(20,10,10,.4)" : "rgba(8,8,8,.5)",
          border: `1px solid ${unlocked ? inStock ? "rgba(0,170,70,.3)" : "rgba(60,20,20,.3)" : "#0d0d0d"}`,
          borderRadius: 10,
          padding: "10px 10px",
          opacity: unlocked ? 1 : .4
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 5
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 22
        }
      }, d.emoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: unlocked ? "#aaccee" : "#1a2a3a"
        }
      }, d.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          color: "#3a6a88"
        }
      }, fishData?.n, " \xB7 \xA5", d.basePrice))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 9
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#ffd700"
        }
      }, starStr(d.taste), " \u53E3\u611F"), /*#__PURE__*/React.createElement("span", {
        style: {
          color: inStock ? "#44cc88" : "#ff4444"
        }
      }, inStock ? `库存${inv[d.fishId]}条` : "缺货")), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 8,
          color: "#9fd8ef",
          marginTop: 3
        }
      }, "\u23F1", d.cookTime, "\u79D2\u70F9\u996A"));
    })));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#4a7a8a",
      marginBottom: 8,
      paddingBottom: 5,
      borderBottom: "1px solid rgba(0,55,100,.3)"
    }
  }, "\uD83C\uDFEE \u9910\u5385\u5347\u7EA7"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 7
    }
  }, REST_UPGRADES.map(u => {
    const owned = restUpgrades.includes(u.id);
    const ok = gold >= u.cost;
    return /*#__PURE__*/React.createElement("div", {
      key: u.id,
      style: {
        background: owned ? "rgba(0,100,44,.15)" : "rgba(0,15,38,.42)",
        border: `1px solid ${owned ? "rgba(0,170,75,.3)" : "rgba(0,45,88,.3)"}`,
        borderRadius: 10,
        padding: "9px 10px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        marginBottom: 4
      }
    }, u.emoji), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: owned ? "#44cc88" : "#aaccee",
        marginBottom: 2
      }
    }, u.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: "#44aa66",
        marginBottom: 6
      }
    }, u.desc), owned ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#44cc88",
        fontWeight: 700
      }
    }, "\u2705 \u5DF2\u5B89\u88C5") : /*#__PURE__*/React.createElement("button", {
      onClick: () => buyUpgrade(u),
      disabled: !ok,
      style: {
        width: "100%",
        padding: "6px 0",
        fontSize: 10,
        background: ok ? "rgba(0,90,180,.3)" : "rgba(22,22,22,.3)",
        border: `1px solid ${ok ? "#0044aa" : "#1a1a1a"}`,
        color: ok ? "#0099ff" : "#2a2a2a",
        borderRadius: 7,
        cursor: ok ? "pointer" : "not-allowed"
      }
    }, "\xA5", u.cost.toLocaleString()));
  })))), tab === "shop" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#4a7a8a",
      fontWeight: 700,
      marginBottom: 10
    }
  }, "\uD83D\uDED2 \u88C5\u5907\u5546\u5E97 \xB7 \xA5", gold.toLocaleString()), Object.entries(EQUIP).map(([type, items]) => {
    const names = {
      harpoon: "🔱 鱼叉",
      gun: "🔫 枪械",
      tank: "💧 氧气瓶",
      suit: "🤿 潜水服",
      cargo: "📦 装载箱"
    };
    return /*#__PURE__*/React.createElement("div", {
      key: type,
      style: {
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: "#4a7a8a",
        marginBottom: 6,
        paddingBottom: 4,
        borderBottom: "1px solid rgba(0,55,100,.3)"
      }
    }, names[type]), items.map(item => {
      const owned = equip[type] === item.id;
      const ok = gold >= item.price;
      return /*#__PURE__*/React.createElement("div", {
        key: item.id,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: owned ? "rgba(0,100,44,.15)" : "rgba(0,15,38,.42)",
          border: `1px solid ${owned ? "rgba(0,170,75,.3)" : "rgba(0,45,88,.3)"}`,
          borderRadius: 9,
          padding: "8px 10px",
          marginBottom: 5
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 700,
          color: owned ? "#44cc88" : "#aacce8"
        }
      }, item.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          color: "#1e4a68"
        }
      }, item.desc, type === "gun" && item.ammo ? ` · ${item.ammo}发` : "")), owned ? /*#__PURE__*/React.createElement("div", {
        style: {
          color: "#44cc88",
          fontSize: 10,
          fontWeight: 700
        }
      }, "\u2705 \u5DF2\u88C5\u5907") : /*#__PURE__*/React.createElement("button", {
        onClick: () => buyEq(type, item),
        disabled: !ok,
        style: {
          padding: "6px 10px",
          fontSize: 10,
          fontWeight: 700,
          background: ok ? "rgba(0,90,180,.3)" : "rgba(22,22,22,.3)",
          border: `1px solid ${ok ? "#0044aa" : "#1a1a1a"}`,
          color: ok ? "#0099ff" : "#2a2a2a",
          borderRadius: 7,
          cursor: ok ? "pointer" : "not-allowed"
        }
      }, item.price === 0 ? "免费" : `¥${item.price.toLocaleString()}`));
    }));
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#4a7a8a",
      marginBottom: 6,
      paddingBottom: 4,
      borderBottom: "1px solid rgba(0,55,100,.3)"
    }
  }, "\uD83D\uDC65 \u96C7\u7528\u5458\u5DE5 (", staff.length, "/", STAFF.length, ")"), STAFF.map(s => {
    const hired = staff.find(x => x.id === s.id);
    const ok = gold >= s.salary * 3;
    return /*#__PURE__*/React.createElement("div", {
      key: s.id,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: hired ? "rgba(0,100,44,.15)" : "rgba(0,15,38,.42)",
        border: `1px solid ${hired ? "rgba(0,170,75,.3)" : "rgba(0,45,88,.3)"}`,
        borderRadius: 9,
        padding: "8px 10px",
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700
      }
    }, s.emoji, " ", s.name, " \xB7 ", s.role), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: "#33bb66"
      }
    }, s.bonus), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: "#1e4a68"
      }
    }, "\u6708\u85AA\xA5", s.salary, " \xB7 \u62BC\u91D1\xA5", s.salary * 3)), hired ? /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#44cc88",
        fontSize: 10
      }
    }, "\u2705") : /*#__PURE__*/React.createElement("button", {
      onClick: () => hire(s),
      disabled: !ok,
      style: {
        padding: "6px 10px",
        fontSize: 10,
        background: ok ? "rgba(0,90,180,.3)" : "rgba(22,22,22,.3)",
        border: `1px solid ${ok ? "#0044aa" : "#1a1a1a"}`,
        color: ok ? "#0099ff" : "#2a2a2a",
        borderRadius: 7,
        cursor: ok ? "pointer" : "not-allowed"
      }
    }, "\u96C7\u7528"));
  }))), tab === "inventory" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#4a7a8a",
      fontWeight: 700
    }
  }, "\uD83D\uDCE6 \u9C7C\u7C7B\u5E93\u5B58"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#ffd700"
    }
  }, totalInv, "\u6761 \xB7 \u4F30\u503C\xA5", Object.entries(inv).filter(([, n]) => n > 0).reduce((sum, [id, n]) => sum + (FISH[id]?.v || 0) * n, 0).toLocaleString())), totalInv === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "50px 0",
      color: "#1a3a58"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      marginBottom: 12
    }
  }, "\uD83E\uDEA3"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14
    }
  }, "\u5E93\u5B58\u7A7A\u7A7A\u5982\u4E5F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      marginTop: 6,
      color: "#0f2a3a"
    }
  }, "\u53BB\u5730\u56FE\u9875\u9009\u62E9\u6C34\u57DF\u4E0B\u6F5C\u6355\u9C7C\u5427\uFF01")) : /*#__PURE__*/React.createElement(React.Fragment, null, Object.entries(ZONES).map(([zid, z]) => {
    const zFish = Object.entries(inv).filter(([id, n]) => n > 0 && FISH[id]?.z === zid);
    if (!zFish.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: zid,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: z.color,
        marginBottom: 7,
        paddingBottom: 4,
        borderBottom: `1px solid ${z.color}33`,
        display: "flex",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", null, z.emoji, " ", z.name), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#4a7a8a"
      }
    }, zFish.reduce((a, [, n]) => a + n, 0), "\u6761")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 7
      }
    }, zFish.map(([id, n]) => {
      const f = FISH[id];
      if (!f) return null;
      const hasDish = !!f.cook;
      const totalVal = f.v * n;
      return /*#__PURE__*/React.createElement("div", {
        key: id,
        style: {
          background: "rgba(0,18,45,.62)",
          border: `1px solid ${z.color}22`,
          borderRadius: 10,
          padding: "10px 10px"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 7,
          marginBottom: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 26
        }
      }, f.e), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 700,
          color: "#aaccee"
        }
      }, f.n), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 8,
          color: "#3a6a88"
        }
      }, "⭐".repeat(f.q), " \u54C1\u8D28")), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 700,
          color: "#ffd700"
        }
      }, "\xD7", n))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 9,
          color: "#9fd8ef",
          marginBottom: hasDish ? 6 : 0
        }
      }, /*#__PURE__*/React.createElement("span", null, "\u5355\u4EF7\xA5", f.v), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#88aacc"
        }
      }, "\u603B\u503C\xA5", totalVal.toLocaleString())), hasDish && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 8,
          color: "#44aa66",
          background: "rgba(0,80,30,.3)",
          borderRadius: 5,
          padding: "2px 6px",
          display: "inline-block"
        }
      }, "\uD83C\uDF63 \u53EF\u5236\u4F5C\uFF1A", f.cook));
    })));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      background: "rgba(0,15,40,.5)",
      borderRadius: 11,
      padding: 12,
      border: "1px solid rgba(0,55,110,.3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#4a7a8a",
      fontWeight: 700,
      marginBottom: 8
    }
  }, "\uD83D\uDCB9 \u51FA\u552E\u9C7C\u7C7B\uFF08\u76F4\u63A5\u51FA\u552E\u800C\u4E0D\u505A\u6210\u83DC\uFF09"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#7fb8d0",
      marginBottom: 10
    }
  }, "\u6CE8\u610F\uFF1A\u505A\u6210\u5BFF\u53F8\u552E\u4EF7\u66F4\u9AD8\uFF01\u5EFA\u8BAE\u7559\u4E0B\u9AD8\u54C1\u8D28\u9C7C\u7C7B\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      let total = 0;
      const newInv = {};
      Object.entries(inv).forEach(([id, n]) => {
        const f = FISH[id];
        if (f && f.q <= 2) {
          total += f.v * n;
        } else if (f && f.q > 2) {
          newInv[id] = n;
        }
      });
      if (total > 0) {
        setGold(g => g + total);
        setInv(newInv);
        notify(`💰 出售普通鱼获得¥${total.toLocaleString()}`);
        addLog(`💹 出售普通鱼类获得¥${total.toLocaleString()}`);
      } else notify("没有普通品质鱼类可出售");
    },
    style: {
      flex: 1,
      padding: "9px 0",
      fontSize: 11,
      background: "rgba(0,100,200,.28)",
      border: "1px solid #0055bb",
      borderRadius: 9,
      color: "#66aaff",
      cursor: "pointer"
    }
  }, "\u51FA\u552E\u666E\u901A\u9C7C", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8,
      color: "#3a6a88"
    }
  }, "\uFF081-2\u661F\u54C1\u8D28\uFF09")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      let total = 0;
      Object.entries(inv).forEach(([id, n]) => {
        const f = FISH[id];
        if (f) total += f.v * n;
      });
      if (total > 0) {
        setGold(g => g + total);
        setInv({});
        notify(`💰 全部出售获得¥${total.toLocaleString()}`);
        addLog(`💹 清仓出售获得¥${total.toLocaleString()}`);
      } else notify("库存为空");
    },
    style: {
      flex: 1,
      padding: "9px 0",
      fontSize: 11,
      background: "rgba(200,80,0,.25)",
      border: "1px solid #aa4400",
      borderRadius: 9,
      color: "#ff8844",
      cursor: "pointer"
    }
  }, "\u5168\u90E8\u51FA\u552E", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8,
      color: "#6a3a2a"
    }
  }, "\uFF08\u6E05\u7A7A\u5E93\u5B58\uFF09")))))), tab === "quests" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#4a7a8a",
      fontWeight: 700,
      marginBottom: 11
    }
  }, "\uD83D\uDCCB \u6BCF\u65E5\u4EFB\u52A1\uFF08\u6BCF3\u5929\u5237\u65B0\uFF09"), quests.map(q => {
    const prog = q.progress || 0;
    const pct = Math.min(1, prog / q.need);
    const fd = q.fish ? FISH[q.fish] : null;
    return /*#__PURE__*/React.createElement("div", {
      key: q.id,
      style: {
        background: q.done ? "rgba(0,80,35,.25)" : "rgba(0,15,40,.55)",
        border: `1px solid ${q.done ? "rgba(0,160,70,.35)" : "rgba(0,55,100,.3)"}`,
        borderRadius: 12,
        padding: 12,
        marginBottom: 9
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18
      }
    }, fd?.e || "🎯"), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#ffd700",
        fontWeight: 700
      }
    }, "+\xA5", q.reward.toLocaleString()), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: "#44cc88"
      }
    }, "+", q.xpR, "XP"))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        marginBottom: 4,
        color: q.done ? "#44cc88" : "#aaccee"
      }
    }, q.done ? "✅ " : "", q.desc), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 5,
        background: "rgba(0,0,0,.4)",
        borderRadius: 3,
        marginBottom: 3
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${pct * 100}%`,
        height: "100%",
        background: q.done ? "#44cc88" : "linear-gradient(90deg,#0088ff,#00d4ff)",
        borderRadius: 3,
        transition: "width .5s"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: "#3a6a88"
      }
    }, Math.min(prog, q.need), "/", q.need));
  })), tab === "calendar" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg,${curSeason.color}22,${curSeason.color}11)`,
      border: `1px solid ${curSeason.color}44`,
      borderRadius: 14,
      padding: 14,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 34
    }
  }, curSeason.emoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: curSeason.color
    }
  }, curSeason.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#5a8a9a"
    }
  }, curSeason.desc))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, Object.entries(curSeason.catchBonus).map(([zone, bonus]) => /*#__PURE__*/React.createElement("div", {
    key: zone,
    style: {
      background: "rgba(0,0,0,.3)",
      borderRadius: 6,
      padding: "3px 8px",
      fontSize: 9,
      color: "#88ccaa"
    }
  }, ZONES[zone]?.emoji, ZONES[zone]?.name, " \u6355\u83B7+", Math.round(bonus * 100), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(0,0,0,.3)",
      borderRadius: 6,
      padding: "3px 8px",
      fontSize: 9,
      color: "#ffdd88"
    }
  }, "\uD83C\uDF63 \u9910\u5385\u6536\u5165\xD7", curSeason.restBonus))), curFestival ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg,${curFestival.color}22,${curFestival.color}11)`,
      border: `2px solid ${curFestival.color}88`,
      borderRadius: 14,
      padding: 14,
      marginBottom: 14,
      animation: "pop .4s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 36,
      animation: "bob 2s ease-in-out infinite"
    }
  }, curFestival.emoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 900,
      color: curFestival.color
    }
  }, "\uD83C\uDF89 \u4ECA\u65E5\u8282\u65E5\uFF01"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "#eee"
    }
  }, curFestival.name))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#ccddee",
      lineHeight: 1.6,
      marginBottom: 10
    }
  }, curFestival.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5,
      marginBottom: festivalMenu ? 10 : 0
    }
  }, curFestival.effect?.catchAll > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(0,200,80,.2)",
      border: "1px solid #44cc88",
      borderRadius: 6,
      padding: "3px 8px",
      fontSize: 9,
      color: "#88ffaa"
    }
  }, "\uD83C\uDFA3 \u5168\u533A\u6355\u83B7\u7387+", Math.round(curFestival.effect.catchAll * 100), "%"), curFestival.effect?.priceMult > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,200,0,.2)",
      border: "1px solid #ffcc00",
      borderRadius: 6,
      padding: "3px 8px",
      fontSize: 9,
      color: "#ffee88"
    }
  }, "\uD83D\uDCB0 \u9C7C\u4EF7\xD7", curFestival.effect.priceMult), curFestival.effect?.restMult > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,100,0,.2)",
      border: "1px solid #ff6600",
      borderRadius: 6,
      padding: "3px 8px",
      fontSize: 9,
      color: "#ffaa66"
    }
  }, "\uD83C\uDF63 \u9910\u5385\xD7", curFestival.effect.restMult), curFestival.effect?.rareBoost > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(200,100,255,.2)",
      border: "1px solid #cc66ff",
      borderRadius: 6,
      padding: "3px 8px",
      fontSize: 9,
      color: "#ee99ff"
    }
  }, "\u2B50 \u7A00\u6709\u9C7C\xD7", curFestival.effect.rareBoost), curFestival.effect?.unlockAbyss && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(150,50,255,.2)",
      border: "1px solid #9933ff",
      borderRadius: 6,
      padding: "3px 8px",
      fontSize: 9,
      color: "#bb77ff"
    }
  }, "\uD83D\uDD73\uFE0F \u6DF1\u6E0A\u4ECA\u65E5\u514D\u88C5\u5907\u8FDB\u5165\uFF01"), curFestival.effect?.guaranteedFish && FISH[curFestival.effect.guaranteedFish] && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,215,0,.2)",
      border: "1px solid #ffd700",
      borderRadius: 6,
      padding: "3px 8px",
      fontSize: 9,
      color: "#ffd700"
    }
  }, FISH[curFestival.effect.guaranteedFish].e, " ", FISH[curFestival.effect.guaranteedFish].n, " \u5FC5\u5B9A\u51FA\u73B0"), curFestival.effect?.fishBoost && FISH[curFestival.effect.fishBoost] && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(0,180,255,.2)",
      border: "1px solid #00aaff",
      borderRadius: 6,
      padding: "3px 8px",
      fontSize: 9,
      color: "#66ccff"
    }
  }, FISH[curFestival.effect.fishBoost].e, " ", FISH[curFestival.effect.fishBoost].n, " \xD7", curFestival.effect.boostMult)), festivalMenu && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,215,0,.1)",
      border: "1px solid #ffd70066",
      borderRadius: 10,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#ffd700",
      fontWeight: 700,
      marginBottom: 4
    }
  }, "\uD83C\uDF1F \u8282\u65E5\u9650\u5B9A\u83DC\u54C1\uFF01"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#fff"
    }
  }, festivalMenu.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#ccaa44"
    }
  }, festivalMenu.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#88aacc",
      marginTop: 2
    }
  }, "\u9700\u8981\uFF1A", FISH[festivalMenu.fish]?.e, FISH[festivalMenu.fish]?.n)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: "#ffd700"
    }
  }, "\xA5", festivalMenu.price), (inv[festivalMenu.fish] || 0) > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#44cc88"
    }
  }, "\u2705 \u6709\u98DF\u6750") : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#ff6644"
    }
  }, "\u274C \u9700\u8981\u6355\u9C7C"))))) : /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(0,15,40,.5)",
      border: "1px solid rgba(0,55,110,.3)",
      borderRadius: 12,
      padding: 12,
      marginBottom: 14,
      textAlign: "center",
      color: "#9fd8ef",
      fontSize: 12
    }
  }, "\u4ECA\u5929\u6CA1\u6709\u8282\u65E5\uFF0C\u7167\u5E38\u4F5C\u4E1A"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(0,12,30,.6)",
      borderRadius: 14,
      padding: 13,
      marginBottom: 14,
      border: "1px solid rgba(0,55,110,.3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#4a8aaa"
    }
  }, "\uD83D\uDCC5 \u672C\u6708\u65E5\u5386\uFF08\u7B2C", Math.ceil(day / 30), "\u6708\uFF09"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#3a6a88"
    }
  }, "\u4ECA\u5929\uFF1A", monthDay, "\u53F7")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(6,1fr)",
      gap: 3
    }
  }, Array.from({
    length: 30
  }, (_, i) => {
    const d = i + 1;
    const fest = FESTIVALS[d];
    const isCur = d === monthDay;
    const isPast = d < monthDay;
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      style: {
        background: isCur ? `${curSeason.color}33` : fest ? "rgba(255,215,0,.1)" : "rgba(0,0,0,.3)",
        border: `1px solid ${isCur ? curSeason.color : fest ? "#ffd70066" : "#0d1a2a"}`,
        borderRadius: 6,
        padding: "5px 2px",
        textAlign: "center",
        opacity: isPast ? .5 : 1,
        position: "relative"
      }
    }, fest && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        lineHeight: 1
      }
    }, fest.emoji), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: isCur ? 700 : 400,
        color: isCur ? curSeason.color : fest ? "#ffd700" : "#4a7a9a"
      }
    }, d), isCur && /*#__PURE__*/React.createElement("div", {
      style: {
        width: 4,
        height: 4,
        background: curSeason.color,
        borderRadius: "50%",
        margin: "1px auto 0"
      }
    }));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(0,12,30,.6)",
      borderRadius: 14,
      padding: 13,
      border: "1px solid rgba(0,55,110,.3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#4a8aaa",
      marginBottom: 10
    }
  }, "\uD83D\uDD1C \u5373\u5C06\u5230\u6765\u7684\u8282\u65E5"), upcoming.map(({
    daysLeft,
    day: fDay,
    festival: f
  }) => /*#__PURE__*/React.createElement("div", {
    key: fDay,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: `${f.color}0d`,
      border: `1px solid ${f.color}33`,
      borderRadius: 10,
      padding: "10px 12px",
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24
    }
  }, f.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: f.color
    }
  }, f.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#5a8a9a",
      lineHeight: 1.4
    }
  }, f.desc.slice(0, 40), "\u2026")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#ffd700",
      fontWeight: 700
    }
  }, daysLeft, "\u5929\u540E"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: "#3a6a88"
    }
  }, fDay, "\u53F7"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      background: "rgba(0,12,30,.6)",
      borderRadius: 12,
      padding: 12,
      border: `1px solid ${curSeason.color}22`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: curSeason.color,
      marginBottom: 8
    }
  }, curSeason.emoji, " ", curSeason.name, "\u7279\u4EA7\u9C7C\u7C7B\uFF08\u51FA\u73B0\u7387\u63D0\u5347\uFF09"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5
    }
  }, curSeason.spawnBonus.map(id => {
    const f = FISH[id];
    return f ? /*#__PURE__*/React.createElement("div", {
      key: id,
      style: {
        background: "rgba(0,0,0,.3)",
        borderRadius: 7,
        padding: "5px 9px",
        fontSize: 10,
        border: `1px solid ${curSeason.color}33`,
        display: "flex",
        alignItems: "center",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", null, f.e), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#aaccee"
      }
    }, f.n), codex[id] && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 8,
        color: "#44cc88"
      }
    }, "\u2713")) : null;
  })))), tab === "codex" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#4a7a8a"
    }
  }, "\uD83D\uDCD6 \u6D77\u6D0B\u56FE\u9274"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#ffd700"
    }
  }, codexCount, "/", Object.keys(FISH).length)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      background: "rgba(0,0,0,.4)",
      borderRadius: 2,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${codexCount / Object.keys(FISH).length * 100}%`,
      height: "100%",
      background: "linear-gradient(90deg,#ffd700,#ffaa00)",
      borderRadius: 2
    }
  })), Object.entries(ZONES).map(([zid, z]) => /*#__PURE__*/React.createElement("div", {
    key: zid,
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: z.color,
      marginBottom: 5,
      paddingBottom: 3,
      borderBottom: `1px solid ${z.color}33`
    }
  }, z.emoji, " ", z.name, " \xB7 ", Object.keys(codex).filter(id => FISH[id]?.z === zid).length, "/", Object.values(FISH).filter(f => f.z === zid).length), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 5
    }
  }, Object.entries(FISH).filter(([, f]) => f.z === zid).map(([id, f]) => {
    const found = !!codex[id];
    const cnt = codex[id] || 0;
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      style: {
        background: found ? "rgba(0,20,50,.65)" : "rgba(6,6,6,.5)",
        border: `1px solid ${found ? z.color + "33" : "#0d0d0d"}`,
        borderRadius: 8,
        padding: "7px 8px",
        opacity: found ? 1 : .4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        filter: found ? "none" : "grayscale(1) opacity(.3)"
      }
    }, found ? f.e : "❓"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: found ? "#aaccee" : "#1a2a3a"
      }
    }, found ? f.n : "未发现"), found && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: "#9fd8ef"
      }
    }, "\xD7", cnt, " \xB7 \xA5", f.v, f.prot ? " · 🛡" : "", f.rare ? " · ★" : ""), found && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: "#9fd8ef"
      }
    }, starStr(f.q), " \u54C1\u8D28"))));
  }))))), tab === "ai" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,rgba(0,55,120,.42),rgba(0,28,75,.38))",
      borderRadius: 12,
      padding: 12,
      marginBottom: 11,
      border: "1px solid rgba(0,160,230,.38)",
      boxShadow: "0 6px 18px rgba(0,0,0,.24)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#d8f7ff",
      marginBottom: 4
    }
  }, "\uD83E\uDD16 \u6DF1\u6D77\u987E\u95EE"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#9bdcf2",
      lineHeight: 1.7
    }
  }, ADVISOR_PROFILE.desc, "\u3002\u4F60\u53EF\u4EE5\u76F4\u63A5\u8F93\u5165\u95EE\u9898\uFF0C\u4E5F\u53EF\u4EE5\u70B9\u4E0B\u9762\u7684\u5E38\u7528\u95EE\u9898\u3002")), advisorTips.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(0,18,42,.76)",
      border: "1px solid rgba(0,130,190,.42)",
      borderRadius: 10,
      padding: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      color: "#9feeff",
      marginBottom: 6
    }
  }, "\uD83D\uDCCC \u5F53\u524D\u63D0\u793A"), advisorTips.map((tip, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 10,
      lineHeight: 1.55,
      color: "#d8f6ff",
      padding: "3px 0",
      borderTop: i ? "1px solid rgba(255,255,255,.07)" : "none"
    }
  }, tip))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 300,
      overflowY: "auto",
      marginBottom: 10
    }
  }, aiHist.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: m.role === "user" ? "rgba(0,50,110,.56)" : "rgba(0,45,42,.58)",
      border: `${m.role === "user" ? "1px solid rgba(0,120,200,.42)" : "1px solid rgba(60,210,150,.38)"}`,
      borderRadius: 9,
      padding: "9px 12px",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: m.role === "user" ? "#8edfff" : "#8dffcf",
      marginBottom: 2
    }
  }, m.role === "user" ? "👤 你" : "🤖 深海顾问"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      lineHeight: 1.65,
      color: "#e3f8ff"
    }
  }, m.content))), aiHist.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: 12,
      color: "#78aac2"
    }
  }, "\u95EE\u4E00\u4E2A\u7ECF\u8425\u3001\u6F5C\u6C34\u3001\u9C7C\u67AA\u3001\u5347\u7EA7\u6216\u56FE\u9274\u95EE\u9898\uFF0C\u987E\u95EE\u4F1A\u6309\u5F53\u524D\u72B6\u6001\u56DE\u7B54\u3002"), aiLoad && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: 12,
      color: "#9feeff",
      animation: "pulse 1s infinite"
    }
  }, "\uD83E\uDD16 \u5206\u6790\u5F53\u524D\u5C40\u52BF\u4E2D...")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7,
      marginBottom: 9
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: aiIn,
    onChange: e => setAiIn(e.target.value),
    onKeyDown: e => e.key === "Enter" && askAi(),
    placeholder: "\u95EE\u6DF1\u6D77\u987E\u95EE...",
    style: {
      flex: 1,
      padding: "10px 12px",
      fontSize: 12,
      background: "rgba(0,15,40,.78)",
      border: "1px solid rgba(0,110,170,.48)",
      borderRadius: 9,
      color: "#e6fbff",
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: askAi,
    disabled: aiLoad,
    style: {
      padding: "10px 14px",
      background: "rgba(0,120,190,.46)",
      border: "1px solid #00aaff",
      borderRadius: 9,
      color: "#d8fbff",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 800
    }
  }, "\u53D1\u9001")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5
    }
  }, AI_QUESTIONS.map(q => /*#__PURE__*/React.createElement("button", {
    key: q,
    onClick: () => askAi(q),
    style: {
      padding: "6px 9px",
      fontSize: 9,
      background: "rgba(0,42,85,.58)",
      border: "1px solid rgba(80,190,240,.32)",
      borderRadius: 15,
      color: "#d7f7ff",
      cursor: "pointer"
    }
  }, q))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      maxWidth: 520,
      margin: "0 auto",
      background: "rgba(0,5,14,.98)",
      borderTop: "1px solid rgba(0,45,90,.4)",
      display: "flex"
    }
  }, TABS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setTab(t.id),
    style: {
      flex: 1,
      padding: "10px 0",
      fontSize: 8,
      border: "none",
      background: tab === t.id ? "rgba(0,100,180,.14)" : "transparent",
      color: tab === t.id ? "#00d4ff" : "#1a3a55",
      cursor: "pointer"
    }
  }, t.label))));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(DeepCatch));