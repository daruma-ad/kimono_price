"use client";

import { ChangeEvent, useMemo, useState } from "react";

type Listing = { title: string; price: number; date: string; kind: string; condition: string; source: string; image: string };

const listings: Listing[] = [
  { title: "本場大島紬 7マルキ 証紙あり", price: 24800, date: "2026/08/16", kind: "紬", condition: "美品", source: "オークション", image: "紬" },
  { title: "正絹 泥大島紬 袷", price: 18200, date: "2026/08/13", kind: "紬", condition: "良好", source: "リユース店", image: "大島" },
  { title: "大島紬 花柄 身丈158cm", price: 12600, date: "2026/08/09", kind: "紬", condition: "小さなシミあり", source: "オークション", image: "花柄" },
  { title: "訪問着 正絹 金彩 しつけ付き", price: 32900, date: "2026/08/05", kind: "訪問着", condition: "未使用に近い", source: "専門店", image: "訪問着" },
  { title: "結城紬 80亀甲 証紙あり", price: 68500, date: "2026/07/29", kind: "紬", condition: "美品", source: "オークション", image: "結城" },
];

const yen = (n: number) => new Intl.NumberFormat("ja-JP").format(n);

export default function Home() {
  const [active, setActive] = useState<"assess" | "market">("assess");
  const [photo, setPhoto] = useState<string | null>(null);
  const [kind, setKind] = useState("紬");
  const [origin, setOrigin] = useState("本場大島紬");
  const [condition, setCondition] = useState("美品");
  const [certificate, setCertificate] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [query, setQuery] = useState("大島紬");
  const modifier = (condition === "未使用に近い" ? 1.15 : condition === "美品" ? 1 : condition === "良好" ? 0.82 : 0.58) * (certificate ? 1.12 : 1);
  const market = Math.round(21400 * modifier / 100) * 100;
  const result = { low: Math.round(market * 0.82 / 100) * 100, high: Math.round(market * 1.18 / 100) * 100 };
  const filtered = useMemo(() => listings.filter((item) => `${item.title}${item.kind}`.includes(query) || !query), [query]);
  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) setPhoto(URL.createObjectURL(file)); };

  return <main>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="きもの相場ナビ ホーム"><span>き</span>もの相場ナビ <em>BETA</em></a>
      <nav><button className={active === "assess" ? "nav-active" : ""} onClick={() => setActive("assess")}>写真で査定</button><button className={active === "market" ? "nav-active" : ""} onClick={() => setActive("market")}>相場を調べる</button></nav>
      <button className="saved">♡ マイ着物帳</button>
    </header>
    <section id="top" className="hero"><div className="eyebrow">MARKET PRICE, MADE CLEAR</div><h1>その着物、<br /><i>いくらで売れる？</i></h1><p>実際の販売データと着物の特徴から、売り方別の相場をわかりやすくお伝えします。</p><div className="hero-stats"><span><b>5,240件</b>の取引データ</span><span><b>3つ</b>の売却価格</span><span><b>最短1分</b>で簡易査定</span></div><div className="fabric" aria-hidden="true"><div>⟡</div><div>❋</div><div>◈</div></div></section>
    <section className="workspace">
      <div className="tab-row"><button className={active === "assess" ? "tab active" : "tab"} onClick={() => setActive("assess")}>写真から相場をみる</button><button className={active === "market" ? "tab active" : "tab"} onClick={() => setActive("market")}>成約相場を検索</button></div>
      {active === "assess" ? <div className="assessment">
        <section className="panel input-panel"><div className="section-label">STEP 1 / 写真</div><h2>着物の写真を追加</h2><p className="muted">全体・衿元・証紙・気になる箇所があると、より参考になります。</p>
          <label className={photo ? "upload has-photo" : "upload"}>{photo ? <img src={photo} alt="アップロードした着物" /> : <><b>＋</b><span>写真をアップロード</span><small>JPG・PNG（最大10MB）</small></>}<input type="file" accept="image/*" onChange={handlePhoto} /></label>
          <div className="section-label details-label">STEP 2 / 特徴</div><div className="form-grid"><label>種類<select value={kind} onChange={(e) => setKind(e.target.value)}><option>紬</option><option>訪問着</option><option>小紋</option><option>振袖</option><option>留袖</option></select></label><label>産地・ブランド<select value={origin} onChange={(e) => setOrigin(e.target.value)}><option>本場大島紬</option><option>結城紬</option><option>牛首紬</option><option>不明・その他</option></select></label><label>状態<select value={condition} onChange={(e) => setCondition(e.target.value)}><option>未使用に近い</option><option>美品</option><option>良好</option><option>シミ・使用感あり</option></select></label><label className="toggle-label">証紙・落款<label className="switch"><input type="checkbox" checked={certificate} onChange={(e) => setCertificate(e.target.checked)} /><span /></label><small>{certificate ? "あり" : "なし・不明"}</small></label></div>
          <button className="primary" onClick={() => setCompleted(true)}>この条件で相場をみる <span>→</span></button><p className="notice">参考価格です。真贋や産地の確定には専門家による確認が必要です。</p>
        </section>
        <section className="panel result-panel"><div className="section-label">YOUR ESTIMATE</div>{completed ? <><div className="result-head"><div><p>個人販売の想定成約価格</p><h2>¥{yen(result.low)} <small>〜</small> ¥{yen(result.high)}</h2></div><span className="confidence">信頼度 78%</span></div><div className="price-rows"><div><span>早く売る（買取）</span><b>¥{yen(Math.round(result.low * .32 / 100) * 100)}〜</b></div><div className="highlight"><span>標準成約（オークション等）</span><b>¥{yen(result.low)}〜¥{yen(result.high)}</b></div><div><span>専門店での販売想定</span><b>¥{yen(Math.round(result.high * 1.55 / 100) * 100)}〜</b></div></div><div className="reason"><h3>価格の主な根拠</h3><p><b>{origin}</b>・{kind}・{condition}・{certificate ? "証紙あり" : "証紙なし"}</p><ul><li>直近90日の類似成約 12件を参照</li><li>証紙ありで評価を加点</li><li>状態は写真と入力内容からの暫定評価</li></ul></div><button className="outline" onClick={() => setActive("market")}>類似する成約例を見る →</button></> : <div className="empty-result"><div>¥</div><h2>条件を入力すると<br />相場レンジが表示されます</h2><p>写真がなくても、種類と状態を選んで試せます。</p></div>}</section>
      </div> : <section className="market panel"><div className="market-intro"><div><div className="section-label">MARKET DATABASE</div><h2>直近の成約相場を調べる</h2><p className="muted">出品価格ではなく、売れた実績を中心に表示します。</p></div><label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="例：大島紬、訪問着" /></label></div><div className="chips"><button className="chip selected">すべて</button><button className="chip">オークション</button><button className="chip">専門店</button><button className="chip">美品のみ</button></div><div className="listing-grid">{filtered.map((item) => <article className="listing" key={item.title}><div className="listing-image"><span>{item.image}</span></div><div className="listing-info"><span className="source">{item.source} / {item.date}</span><h3>{item.title}</h3><p>{item.kind}　{item.condition}</p><b>成約 ¥{yen(item.price)}</b></div></article>)}</div>{filtered.length === 0 && <p className="no-results">該当する成約例がありません。別のキーワードでお試しください。</p>}</section>}
    </section><footer>きもの相場ナビは、着物の価値を知るための参考サービスです。　© 2026</footer>
  </main>;
}
