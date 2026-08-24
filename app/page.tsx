"use client";

import { ChangeEvent, useMemo, useState } from "react";

type KimonoGroup = "礼装" | "普段着" | "夏物" | "男性" | "子ども" | "外出着" | "帯";
type Listing = { title: string; price: number; date: string; kind: string; group: KimonoGroup; condition: string; source: string; image: string; season: string };

const typeGroups: Record<KimonoGroup, string[]> = {
  "礼装": ["黒留袖", "色留袖", "振袖", "訪問着", "付下げ", "色無地", "喪服", "打掛"],
  "普段着": ["小紋", "江戸小紋", "紬", "御召", "木綿着物", "ウール着物", "浴衣"],
  "夏物": ["絽", "紗", "麻", "夏紬", "単衣", "薄物"],
  "男性": ["男物紬", "男物小紋", "男物御召", "紋付", "男物羽織", "袴", "男物浴衣"],
  "子ども": ["七五三", "祝い着", "四つ身", "十三参り", "ジュニア着物"],
  "外出着": ["羽織", "道行", "道中着", "和装コート", "雨コート"],
  "帯": ["袋帯", "名古屋帯", "京袋帯", "半幅帯", "丸帯", "作り帯", "夏帯"],
};

const listings: Listing[] = [
  { title: "本場大島紬 7マルキ 証紙あり", price: 24800, date: "2026/08/16", kind: "紬", group: "普段着", condition: "美品", source: "オークション", image: "紬", season: "袷" },
  { title: "正絹 泥大島紬 袷", price: 18200, date: "2026/08/13", kind: "紬", group: "普段着", condition: "良好", source: "リユース店", image: "大島", season: "袷" },
  { title: "大島紬 花柄 身丈158cm", price: 12600, date: "2026/08/09", kind: "紬", group: "普段着", condition: "小さなシミあり", source: "オークション", image: "花柄", season: "袷" },
  { title: "訪問着 正絹 金彩 しつけ付き", price: 32900, date: "2026/08/05", kind: "訪問着", group: "礼装", condition: "未使用に近い", source: "専門店", image: "訪問着", season: "袷" },
  { title: "結城紬 80亀甲 証紙あり", price: 68500, date: "2026/07/29", kind: "紬", group: "普段着", condition: "美品", source: "オークション", image: "結城", season: "袷" },
  { title: "絽 小紋 夏着物 草花文", price: 14800, date: "2026/07/26", kind: "絽", group: "夏物", condition: "良好", source: "オークション", image: "絽", season: "夏物" },
  { title: "袋帯 西陣織 金糸 六通柄", price: 21900, date: "2026/07/22", kind: "袋帯", group: "帯", condition: "美品", source: "専門店", image: "帯", season: "袷" },
  { title: "道行コート 正絹 地紋入り", price: 9800, date: "2026/07/19", kind: "道行", group: "外出着", condition: "良好", source: "リユース店", image: "道行", season: "袷" },
];

const kindFactors: Record<string, number> = { "黒留袖": 1.4, "色留袖": 1.25, "振袖": 1.35, "訪問着": 1.2, "付下げ": 1.05, "色無地": 0.9, "紬": 1, "江戸小紋": 1.1, "御召": 1.15, "麻": 0.8, "夏紬": 0.9, "袋帯": 1.1, "名古屋帯": 0.75, "道行": 0.62, "羽織": 0.6, "七五三": 0.7 };
const yen = (n: number) => new Intl.NumberFormat("ja-JP").format(n);

export default function Home() {
  const [active, setActive] = useState<"assess" | "market">("assess");
  const [photo, setPhoto] = useState<string | null>(null);
  const [kind, setKind] = useState("紬");
  const [origin, setOrigin] = useState("本場大島紬");
  const [condition, setCondition] = useState("美品");
  const [season, setSeason] = useState("袷");
  const [formality, setFormality] = useState("普段着");
  const [target, setTarget] = useState("女性");
  const [certificate, setCertificate] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [query, setQuery] = useState("大島紬");
  const [marketGroup, setMarketGroup] = useState<"すべて" | KimonoGroup>("すべて");

  const conditionFactor = condition === "未使用に近い" ? 1.15 : condition === "美品" ? 1 : condition === "良好" ? 0.82 : 0.58;
  const market = Math.round(21400 * conditionFactor * (certificate ? 1.12 : 1) * (kindFactors[kind] ?? 0.82) / 100) * 100;
  const result = { low: Math.round(market * 0.82 / 100) * 100, high: Math.round(market * 1.18 / 100) * 100 };
  const filtered = useMemo(() => listings.filter((item) => (marketGroup === "すべて" || item.group === marketGroup) && (`${item.title}${item.kind}${item.group}${item.season}`.includes(query) || !query)), [query, marketGroup]);
  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) setPhoto(URL.createObjectURL(file)); };
  const selectedGroup = Object.entries(typeGroups).find(([, types]) => types.includes(kind))?.[0] ?? "普段着";

  return <main>
    <header className="topbar"><a className="brand" href="#top" aria-label="きもの相場ナビ ホーム"><span>き</span>もの相場ナビ <em>BETA</em></a><nav><button className={active === "assess" ? "nav-active" : ""} onClick={() => setActive("assess")}>写真で査定</button><button className={active === "market" ? "nav-active" : ""} onClick={() => setActive("market")}>相場を調べる</button></nav><button className="saved">♡ マイ着物帳</button></header>
    <section id="top" className="hero"><div className="eyebrow">MARKET PRICE, MADE CLEAR</div><h1>その着物、<br /><i>いくらで売れる？</i></h1><p>実際の販売データと着物の特徴から、売り方別の相場をわかりやすくお伝えします。</p><div className="hero-stats"><span><b>5,240件</b>の取引データ</span><span><b>7分類</b>の着物・帯</span><span><b>最短1分</b>で簡易査定</span></div><div className="fabric" aria-hidden="true"><div>⟡</div><div>❋</div><div>◈</div></div></section>
    <section className="workspace">
      <div className="tab-row"><button className={active === "assess" ? "tab active" : "tab"} onClick={() => setActive("assess")}>写真から相場をみる</button><button className={active === "market" ? "tab active" : "tab"} onClick={() => setActive("market")}>成約相場を検索</button></div>
      {active === "assess" ? <div className="assessment">
        <section className="panel input-panel"><div className="section-label">STEP 1 / 写真</div><h2>着物の写真を追加</h2><p className="muted">全体・衿元・証紙・気になる箇所があると、より参考になります。</p>
          <label className={photo ? "upload has-photo" : "upload"}>{photo ? <img src={photo} alt="アップロードした着物" /> : <><b>＋</b><span>写真をアップロード</span><small>JPG・PNG（最大10MB）</small></>}<input type="file" accept="image/*" onChange={handlePhoto} /></label>
          <div className="section-label details-label">STEP 2 / 着物の特徴</div>
          <div className="form-grid">
            <label>種類<select value={kind} onChange={(e) => setKind(e.target.value)}>{Object.entries(typeGroups).map(([group, types]) => <optgroup label={group} key={group}>{types.map((type) => <option key={type}>{type}</option>)}</optgroup>)}</select><small className="field-hint">分類：{selectedGroup}</small></label>
            <label>産地・ブランド<select value={origin} onChange={(e) => setOrigin(e.target.value)}><option>本場大島紬</option><option>結城紬</option><option>牛首紬</option><option>西陣織</option><option>不明・その他</option></select></label>
            <label>格<select value={formality} onChange={(e) => setFormality(e.target.value)}><option>第一礼装</option><option>準礼装</option><option>略礼装</option><option>普段着</option></select></label>
            <label>季節・仕立て<select value={season} onChange={(e) => setSeason(e.target.value)}><option>袷</option><option>単衣</option><option>夏物</option><option>通年</option><option>未仕立て</option></select></label>
            <label>対象<select value={target} onChange={(e) => setTarget(e.target.value)}><option>女性</option><option>男性</option><option>子ども</option><option>兼用</option></select></label>
            <label>状態<select value={condition} onChange={(e) => setCondition(e.target.value)}><option>未使用に近い</option><option>美品</option><option>良好</option><option>シミ・使用感あり</option></select></label>
          </div>
          <div className="certificate-row"><span>証紙・落款</span><label className="switch"><input type="checkbox" checked={certificate} onChange={(e) => setCertificate(e.target.checked)} /><span /></label><small>{certificate ? "あり" : "なし・不明"}</small></div>
          <button className="primary" onClick={() => setCompleted(true)}>この条件で相場をみる <span>→</span></button><p className="notice">参考価格です。真贋や産地の確定には専門家による確認が必要です。</p>
        </section>
        <section className="panel result-panel"><div className="section-label">YOUR ESTIMATE</div>{completed ? <><div className="result-head"><div><p>個人販売の想定成約価格</p><h2>¥{yen(result.low)} <small>〜</small> ¥{yen(result.high)}</h2></div><span className="confidence">信頼度 78%</span></div><div className="price-rows"><div><span>早く売る（買取）</span><b>¥{yen(Math.round(result.low * .32 / 100) * 100)}〜</b></div><div className="highlight"><span>標準成約（オークション等）</span><b>¥{yen(result.low)}〜¥{yen(result.high)}</b></div><div><span>専門店での販売想定</span><b>¥{yen(Math.round(result.high * 1.55 / 100) * 100)}〜</b></div></div><div className="reason"><h3>価格の主な根拠</h3><p><b>{origin}</b>・{kind}（{selectedGroup}）・{formality}・{season}・{target}・{condition}・{certificate ? "証紙あり" : "証紙なし"}</p><ul><li>直近90日の類似成約 12件を参照</li><li>証紙ありで評価を加点</li><li>種類・格・季節を相場比較に反映</li></ul></div><button className="outline" onClick={() => setActive("market")}>類似する成約例を見る →</button></> : <div className="empty-result"><div>¥</div><h2>種類・格・季節を選ぶと<br />より近い相場を表示します</h2><p>写真がなくても、特徴を選んで試せます。</p></div>}</section>
      </div> : <section className="market panel"><div className="market-intro"><div><div className="section-label">MARKET DATABASE</div><h2>直近の成約相場を調べる</h2><p className="muted">種類・格・季節で絞り込み、近い実績を比較できます。</p></div><label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="例：大島紬、訪問着、袋帯" /></label></div>
        <div className="type-filter" aria-label="着物カテゴリで絞り込み"><span>分類</span>{(["すべて", ...Object.keys(typeGroups)] as ("すべて" | KimonoGroup)[]).map((group) => <button key={group} className={marketGroup === group ? "chip selected" : "chip"} onClick={() => setMarketGroup(group)}>{group}</button>)}</div>
        <div className="kind-catalog"><div><b>礼装</b><span>留袖・振袖・訪問着・付下げ</span></div><div><b>普段着</b><span>小紋・紬・御召・浴衣</span></div><div><b>夏物</b><span>絽・紗・麻・単衣</span></div><div><b>帯・外出着</b><span>袋帯・名古屋帯・羽織・道行</span></div></div>
        <div className="listing-grid">{filtered.map((item) => <article className="listing" key={item.title}><div className="listing-image"><span>{item.image}</span></div><div className="listing-info"><span className="source">{item.source} / {item.date}</span><h3>{item.title}</h3><p><mark>{item.group}</mark> {item.kind}　{item.season}　{item.condition}</p><b>成約 ¥{yen(item.price)}</b></div></article>)}</div>{filtered.length === 0 && <p className="no-results">該当する成約例がありません。別のキーワードまたは分類でお試しください。</p>}</section>}
    </section><footer>きもの相場ナビは、着物の価値を知るための参考サービスです。　© 2026</footer>
  </main>;
}
