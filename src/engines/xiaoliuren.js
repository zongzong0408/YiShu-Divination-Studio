const PALACES = [
  { name: "大安", element: "木", status: "吉", summary: "諸事大吉，身心安泰，求謀可成，宜靜守正道。" },
  { name: "留連", element: "水", status: "凶", summary: "事多阻滯，進退兩難，凡事宜緩不宜急，防口舌拖延。" },
  { name: "速喜", element: "火", status: "吉", summary: "喜訊將至，時機成熟，行動果斷則事半功倍。" },
  { name: "赤口", element: "金", status: "凶", summary: "主口舌是非、爭執或意外驚恐，謹言慎行，以和為貴。" },
  { name: "小吉", element: "水", status: "吉", summary: "和合吉利，貴人相助，雖非暴發但穩步向好。" },
  { name: "空亡", element: "土", status: "凶", summary: "事難成全，音信全無，宜反求諸己，切忌盲目投入。" }
];

/**
 * 小六壬三數起課純函數引擎
 * @param {number} n1 第一數（月/起點）
 * @param {number} n2 第二數（日/中傳）
 * @param {number} n3 第三數（時/終傳）
 */
export function calculateXiaoLiuRen(n1, n2, n3) {
  const num1 = Math.max(1, Math.floor(Math.abs(Number(n1) || 1)));
  const num2 = Math.max(1, Math.floor(Math.abs(Number(n2) || 1)));
  const num3 = Math.max(1, Math.floor(Math.abs(Number(n3) || 1)));

  const idx1 = (num1 - 1) % 6;
  const idx2 = (idx1 + num2 - 1) % 6;
  const idx3 = (idx2 + num3 - 1) % 6;

  const first = PALACES[idx1];
  const second = PALACES[idx2];
  const finalPalace = PALACES[idx3];

  return {
    methodName: "小六壬三數起課",
    inputSummary: `起課三數：${num1}、${num2}、${num3}`,
    primaryTitle: `終傳落宮：【${finalPalace.name}】（五行屬${finalPalace.element}）`,
    auspiciousness: finalPalace.status,
    details: [
      { label: "初傳（起因/現況）", value: `${first.name}（${first.element}）— ${first.status}` },
      { label: "中傳（過程/轉折）", value: `${second.name}（${second.element}）— ${second.status}` },
      { label: "終傳（結果/歸宿）", value: `${finalPalace.name}（${finalPalace.element}）— ${finalPalace.status}` }
    ],
    interpretation: finalPalace.summary
  };
}