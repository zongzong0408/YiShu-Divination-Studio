// 先天八卦定義（lines 由下而上：[初爻, 二爻, 三爻]，1=陽爻，0=陰爻）
const BAGUA = {
  1: { name: "乾", nature: "天", element: "金", lines: [1, 1, 1] },
  2: { name: "兌", nature: "澤", element: "金", lines: [1, 1, 0] },
  3: { name: "離", nature: "火", element: "火", lines: [1, 0, 1] },
  4: { name: "震", nature: "雷", element: "木", lines: [1, 0, 0] },
  5: { name: "巽", nature: "風", element: "木", lines: [0, 1, 1] },
  6: { name: "坎", nature: "水", element: "水", lines: [0, 1, 0] },
  7: { name: "艮", nature: "山", element: "土", lines: [0, 0, 1] },
  8: { name: "坤", nature: "地", element: "土", lines: [0, 0, 0] }
};

const GENERATES = { 木: "火", 火: "土", 土: "金", 金: "水", 水: "木" };
const CONQUERS = { 木: "土", 土: "水", 水: "火", 火: "金", 金: "木" };

function findTrigramByLines(lines) {
  return Object.values(BAGUA).find(
    (g) => g.lines[0] === lines[0] && g.lines[1] === lines[1] && g.lines[2] === lines[2]
  );
}

function formatHexagramName(upper, lower) {
  return upper.name === lower.name
    ? `${upper.name}為${upper.nature}`
    : `${upper.nature}${lower.nature}${upper.name}${lower.name}`;
}

function evaluateTiYong(tiElement, yongElement) {
  if (GENERATES[yongElement] === tiElement) {
    return { status: "吉", relation: "用生體（大吉）", advice: "外在環境與貴人助力強勁，順勢而為可獲豐碩成果。" };
  }
  if (tiElement === yongElement) {
    return { status: "吉", relation: "體用比和（吉利）", advice: "內外氣場和諧一致，合作順利，事半功倍。" };
  }
  if (CONQUERS[tiElement] === yongElement) {
    return { status: "平", relation: "體克用（小吉偏平）", advice: "雖需付出較多心力與主動爭取，但主導權在己，終能克服阻礙。" };
  }
  if (GENERATES[tiElement] === yongElement) {
    return { status: "平", relation: "體生用（耗洩之象）", advice: "精力與資源有所付出或損耗，宜量力而為，謹防過度投入。" };
  }
  return { status: "凶", relation: "用克體（不利）", advice: "外在阻力較大或時機未至，宜守不宜進，先修內功以待轉機。" };
}

/**
 * 梅花易數雙數起卦純函數引擎
 * @param {number} upperNum 上卦起數
 * @param {number} lowerNum 下卦起數
 */
export function calculateMeiHuaYiShu(upperNum, lowerNum) {
  const n1 = Math.max(1, Math.floor(Math.abs(Number(upperNum) || 1)));
  const n2 = Math.max(1, Math.floor(Math.abs(Number(lowerNum) || 1)));

  const upperIdx = n1 % 8 === 0 ? 8 : n1 % 8;
  const lowerIdx = n2 % 8 === 0 ? 8 : n2 % 8;
  const movingLine = (n1 + n2) % 6 === 0 ? 6 : (n1 + n2) % 6;

  const upperGua = BAGUA[upperIdx];
  const lowerGua = BAGUA[lowerIdx];

  // 組合六爻（索引 0 為初爻，索引 5 為上爻）
  const baseLines = [...lowerGua.lines, ...upperGua.lines];

  // 互卦（下互：2,3,4爻；上互：3,4,5爻）
  const mutualLower = findTrigramByLines([baseLines[1], baseLines[2], baseLines[3]]);
  const mutualUpper = findTrigramByLines([baseLines[2], baseLines[3], baseLines[4]]);

  // 變卦（動爻陰陽反轉）
  const changedLines = [...baseLines];
  changedLines[movingLine - 1] = changedLines[movingLine - 1] ^ 1;
  const changedLower = findTrigramByLines([changedLines[0], changedLines[1], changedLines[2]]);
  const changedUpper = findTrigramByLines([changedLines[3], changedLines[4], changedLines[5]]);

  // 判定體卦與用卦（動爻所在為用，不動為體）
  const isLowerMoving = movingLine <= 3;
  const tiGua = isLowerMoving ? upperGua : lowerGua;
  const yongGua = isLowerMoving ? lowerGua : upperGua;
  const evaluation = evaluateTiYong(tiGua.element, yongGua.element);

  return {
    methodName: "梅花易數雙數起卦",
    inputSummary: `上卦數：${n1}（${upperGua.name}）、下卦數：${n2}（${lowerGua.name}）、第 ${movingLine} 爻動`,
    primaryTitle: `本卦：【${formatHexagramName(upperGua, lowerGua)}】 → 變卦：【${formatHexagramName(changedUpper, changedLower)}】`,
    auspiciousness: evaluation.status,
    details: [
      { label: "本卦（現況根基）", value: `${formatHexagramName(upperGua, lowerGua)}（上${upperGua.name}${upperGua.element} / 下${lowerGua.name}${lowerGua.element}）` },
      { label: "互卦（演變過程）", value: `${formatHexagramName(mutualUpper, mutualLower)}（上${mutualUpper.name}${mutualUpper.element} / 下${mutualLower.name}${mutualLower.element}）` },
      { label: "變卦（最終趨向）", value: `${formatHexagramName(changedUpper, changedLower)}（上${changedUpper.name}${changedUpper.element} / 下${changedLower.name}${changedLower.element}）` },
      { label: "體用生克", value: `體卦【${tiGua.name}（${tiGua.element}）】 vs 用卦【${yongGua.name}（${yongGua.element}）】— ${evaluation.relation}` }
    ],
    interpretation: evaluation.advice
  };
}