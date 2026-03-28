import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/60246970-7ac1-4231-9122-fee36c5d59df/files/3e6cbbf8-b17d-431c-b395-ce9ece4bb38c.jpg";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navItems = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "catalog", label: "Каталог", icon: "ShoppingBag" },
  { id: "donate", label: "Привилегии", icon: "Crown" },
  { id: "leaderboard", label: "Топ игроков", icon: "Trophy" },
  { id: "rules", label: "Правила", icon: "ScrollText" },
];

const catalogItems = [
  { id: 1, name: "Алмазный меч", category: "Оружие", price: 149, rarity: "diamond", emoji: "⚔️", desc: "Зачаровано Острота V, Огонь II" },
  { id: 2, name: "Комплект брони", category: "Броня", price: 299, rarity: "gold", emoji: "🛡️", desc: "Полный сет золотой брони" },
  { id: 3, name: "Эндер-сундук ×64", category: "Блоки", price: 89, rarity: "emerald", emoji: "📦", desc: "Личное хранилище в любой точке" },
  { id: 4, name: "Сет зелий", category: "Зелья", price: 199, rarity: "purple", emoji: "🧪", desc: "Силы, скорости и регенерации" },
  { id: 5, name: "Маяк", category: "Блоки", price: 499, rarity: "diamond", emoji: "🔆", desc: "Активирует бафы на всей карте" },
  { id: 6, name: "Ключи от кейсов ×10", category: "Особое", price: 249, rarity: "gold", emoji: "🗝️", desc: "Открой редкие награды" },
];

const donatePacks = [
  {
    id: "d.helper",
    name: "D.HELPER",
    price: 499,
    color: "#4CAF50",
    emoji: "🪨",
    perks: [
      "Префикс [D.HELPER] в чате",
      "×2 к дропу предметов",
      "Доступ к /fly на 7 дней",
      "Цветной ник",
      "Привилегия на 30 дней",
    ],
  },
  {
    id: "pegas",
    name: "PEGAS",
    price: 1999,
    color: "#FFD700",
    emoji: "⭐",
    popular: true,
    perks: [
      "Префикс [PEGAS] золотом",
      "×3 к дропу предметов",
      "/fly без ограничений",
      "Личный приват 256 чанков",
      "Доступ к VIP-серверу",
      "Привилегия на 30 дней",
    ],
  },
  {
    id: "dev",
    name: "DEV",
    price: 24999,
    color: "#F44336",
    emoji: "👑",
    perks: [
      "Префикс [DEV] красным",
      "Разработчик сервера",
      "FULL ACCESS ко всем функциям",
      "Личный мир / измерение",
      "Приоритетная поддержка 24/7",
      "Вечная привилегия",
    ],
  },
];

const leaderboard = [
  { rank: 1, name: "Darknight_X", level: 87, donated: 14800, activity: 9840, badge: "👑" },
  { rank: 2, name: "CreeperSlayer", level: 74, donated: 9500, activity: 7620, badge: "💎" },
  { rank: 3, name: "EnderQueen", level: 68, donated: 7200, activity: 6430, badge: "⭐" },
  { rank: 4, name: "SteveMax2000", level: 61, donated: 4990, activity: 5100, badge: "🥉" },
  { rank: 5, name: "NotchFan99", level: 55, donated: 3400, activity: 4700, badge: "🎮" },
  { rank: 6, name: "PixelWitch", level: 49, donated: 2800, activity: 4200, badge: "🧙" },
  { rank: 7, name: "RedstoneKing", level: 44, donated: 1990, activity: 3800, badge: "⚡" },
  { rank: 8, name: "DiamondPick", level: 38, donated: 1500, activity: 3100, badge: "⛏️" },
];

const rules = [
  {
    icon: "Shield",
    title: "Честная игра",
    items: [
      "Запрещены читы, хаки и эксплойты",
      "Запрещены дюпы предметов",
      "Запрещён гриф построек других игроков",
      "Запрещены абузы игровых механик",
    ],
  },
  {
    icon: "MessageSquare",
    title: "Общение",
    items: [
      "Запрещены оскорбления и мат в чате",
      "Запрещены спам и флуд",
      "Запрещена реклама других серверов",
      "Уважайте других игроков",
    ],
  },
  {
    icon: "CreditCard",
    title: "Покупки",
    items: [
      "Все покупки невозвратны",
      "После оплаты привилегия активируется в течение 15 минут",
      "Для возврата — обращайтесь в поддержку",
      "Администрация не несёт ответственности за бан при нарушении правил",
    ],
  },
  {
    icon: "Server",
    title: "Технические правила",
    items: [
      "Лаг-машины запрещены",
      "Фермы ограничены 256 мобами в чанке",
      "Запрещено AFK-фармить через бот",
      "При ошибках сервера — сообщайте в поддержку",
    ],
  },
];

const rarityConfig: Record<string, { label: string; color: string; bg: string }> = {
  diamond: { label: "Редкий", color: "#00BCD4", bg: "rgba(0,188,212,0.07)" },
  gold: { label: "Эпический", color: "#FFD700", bg: "rgba(255,215,0,0.07)" },
  emerald: { label: "Обычный", color: "#00E676", bg: "rgba(0,230,118,0.07)" },
  purple: { label: "Мифический", color: "#9C27B0", bg: "rgba(156,39,176,0.07)" },
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function PixelChar({ char, delay = 0 }: { char: string; delay?: number }) {
  return (
    <span
      className="inline-block animate-float"
      style={{ animationDelay: `${delay}ms`, animationDuration: "2.5s" }}
    >
      {char}
    </span>
  );
}

function SectionHeader({ title, subtitle, icon }: { title: string; subtitle: string; icon: string }) {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(76,175,80,0.4))", maxWidth: 120 }} />
        <Icon name={icon} size={20} style={{ color: "#4CAF50" }} />
        <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(76,175,80,0.4))", maxWidth: 120 }} />
      </div>
      <h2 className="font-pixel text-xl sm:text-2xl mb-2" style={{ color: "#4CAF50" }}>
        {title}
      </h2>
      <p className="font-rubik text-sm" style={{ color: "#888" }}>{subtitle}</p>
    </div>
  );
}

function Navbar({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        background: "rgba(10,10,10,0.95)",
        borderBottom: "2px solid rgba(76,175,80,0.35)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">⛏️</span>
        <div>
          <div className="font-pixel text-xs" style={{ color: "#4CAF50" }}>DUNWORLD</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 bg-green-400 block animate-pulse-green" style={{ boxShadow: "0 0 6px #4CAF50" }} />
            <span className="font-pixel" style={{ fontSize: "8px", color: "#4CAF50" }}>ОНЛАЙН</span>
            <span className="font-pixel" style={{ fontSize: "8px", color: "#555" }}>247/500</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            className="px-3 py-2 font-pixel transition-all duration-150"
            style={{
              fontSize: "9px",
              color: active === item.id ? "#4CAF50" : "#666",
              background: active === item.id ? "rgba(76,175,80,0.1)" : "transparent",
              borderBottom: active === item.id ? "2px solid #4CAF50" : "2px solid transparent",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <button className="mc-btn hidden md:block" onClick={() => onNav("donate")}>
        КУПИТЬ ДОНАТ
      </button>

      <button
        className="md:hidden p-2"
        style={{ color: "#4CAF50" }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Icon name={menuOpen ? "X" : "Menu"} size={20} />
      </button>

      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 md:hidden"
          style={{ background: "rgba(10,10,10,0.98)", borderBottom: "2px solid rgba(76,175,80,0.3)" }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNav(item.id); setMenuOpen(false); }}
              className="w-full text-left px-6 py-4 font-pixel border-b"
              style={{ fontSize: "9px", color: active === item.id ? "#4CAF50" : "#666", borderColor: "rgba(76,175,80,0.1)" }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection({ onNav }: { onNav: (id: string) => void }) {
  const titleChars = "CRAFTSTORE".split("");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.22) saturate(0.5)",
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(0,255,0,0.04) 31px, rgba(0,255,0,0.04) 32px),
            repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(0,255,0,0.04) 31px, rgba(0,255,0,0.04) 32px)
          `,
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-48 z-0" style={{ background: "linear-gradient(transparent, #0A0A0A)" }} />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-slide-up">
        <div className="font-pixel text-2xl sm:text-3xl md:text-4xl mb-4 flex flex-wrap justify-center gap-1" style={{ color: "#4CAF50" }}>
          {"DUNWORLD".split("").map((char, i) => (
            <PixelChar key={i} char={char} delay={i * 100} />
          ))}
        </div>

        <div className="font-pixel text-xs mb-6" style={{ color: "#FFD700" }}>
          ✦ MINECRAFT СЕРВЕР ✦
        </div>

        <p className="font-rubik text-lg mb-2" style={{ color: "#ccc" }}>
          Лучший магазин привилегий и товаров для нашего сервера
        </p>
        <p className="font-rubik text-sm mb-10">
          IP: <span style={{ color: "#4CAF50", fontFamily: "monospace" }}>play.dunworld.ru</span>
          <span className="animate-blink" style={{ color: "#4CAF50" }}>_</span>
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="mc-btn" onClick={() => onNav("donate")}>
            🎁 ПОЛУЧИТЬ ПРИВИЛЕГИЮ
          </button>
          <button
            className="mc-btn mc-btn-gold"
            onClick={() => onNav("catalog")}
          >
            🛒 КАТАЛОГ ТОВАРОВ
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {[
            { label: "Игроков онлайн", value: "247", color: "#4CAF50" },
            { label: "Всего игроков", value: "18 400", color: "#FFD700" },
            { label: "Дней работы", value: "730", color: "#00BCD4" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-pixel text-2xl mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="font-rubik text-xs" style={{ color: "#666" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CatalogSection() {
  const [filter, setFilter] = useState("Все");
  const categories = ["Все", "Оружие", "Броня", "Блоки", "Зелья", "Особое"];
  const filtered = filter === "Все" ? catalogItems : catalogItems.filter((i) => i.category === filter);

  return (
    <section id="catalog" className="py-20 px-4 max-w-6xl mx-auto">
      <SectionHeader title="КАТАЛОГ" subtitle="Товары и предметы для сервера" icon="ShoppingBag" />

      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="font-pixel transition-all"
            style={{
              fontSize: "9px",
              padding: "8px 14px",
              background: filter === cat ? "#4CAF50" : "rgba(76,175,80,0.08)",
              color: filter === cat ? "#000" : "#4CAF50",
              border: "1px solid rgba(76,175,80,0.35)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, idx) => {
          const rarity = rarityConfig[item.rarity];
          return (
            <div
              key={item.id}
              className="flex flex-col gap-3 animate-slide-up transition-all duration-200 hover:-translate-y-1"
              style={{
                background: rarity.bg,
                border: `2px solid ${rarity.color}40`,
                padding: "20px",
                animationDelay: `${idx * 80}ms`,
              }}
            >
              <div className="flex items-start justify-between">
                <div className="text-4xl animate-float" style={{ animationDelay: `${idx * 200}ms` }}>
                  {item.emoji}
                </div>
                <span
                  className="font-pixel"
                  style={{ fontSize: "8px", padding: "4px 8px", background: `${rarity.color}15`, color: rarity.color, border: `1px solid ${rarity.color}40` }}
                >
                  {rarity.label}
                </span>
              </div>
              <div>
                <div className="font-rubik font-semibold text-white text-base mb-1">{item.name}</div>
                <div className="font-rubik text-xs" style={{ color: "#888" }}>{item.desc}</div>
              </div>
              <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: `1px solid ${rarity.color}15` }}>
                <span className="font-pixel text-sm" style={{ color: "#FFD700" }}>{item.price} ₽</span>
                <button
                  className="font-pixel transition-all duration-100 active:scale-95"
                  style={{ fontSize: "9px", padding: "8px 14px", background: rarity.color, color: "#000" }}
                >
                  КУПИТЬ
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DonateSection() {
  return (
    <section id="donate" className="py-20 px-4" style={{ background: "rgba(0,0,0,0.35)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="ПРИВИЛЕГИИ" subtitle="Выбери свой статус на сервере" icon="Crown" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {donatePacks.map((pack, idx) => (
            <div
              key={pack.id}
              className="relative flex flex-col animate-slide-up"
              style={{
                background: "var(--mc-surface)",
                border: `2px solid ${pack.color}50`,
                animationDelay: `${idx * 120}ms`,
              }}
            >
              {pack.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 font-pixel whitespace-nowrap"
                  style={{ fontSize: "8px", padding: "4px 10px", background: pack.color, color: "#000" }}
                >
                  ★ ПОПУЛЯРНО
                </div>
              )}

              <div
                className="p-5 text-center"
                style={{ background: `${pack.color}12`, borderBottom: `2px solid ${pack.color}30` }}
              >
                <div className="text-4xl mb-2 animate-float" style={{ animationDelay: `${idx * 300}ms` }}>
                  {pack.emoji}
                </div>
                <div className="font-pixel text-sm mb-2" style={{ color: pack.color }}>
                  [{pack.name}]
                </div>
                <div className="font-pixel text-2xl" style={{ color: "#fff" }}>{pack.price}</div>
                <div className="font-pixel mt-1" style={{ fontSize: "8px", color: "#666" }}>рублей / мес</div>
              </div>

              <div className="p-5 flex flex-col gap-2 flex-1">
                {pack.perks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span style={{ color: pack.color, fontSize: "10px", marginTop: "2px", flexShrink: 0 }}>▶</span>
                    <span className="font-rubik text-xs leading-relaxed" style={{ color: "#bbb" }}>{perk}</span>
                  </div>
                ))}
              </div>

              <div className="p-5 pt-0">
                <button
                  className="w-full font-pixel transition-all duration-150 active:scale-95"
                  style={{
                    fontSize: "9px",
                    padding: "12px",
                    background: pack.color,
                    color: "#000",
                    boxShadow: `0 4px 0 ${pack.color}60`,
                  }}
                >
                  КУПИТЬ {pack.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-10 p-5 flex items-start gap-4"
          style={{ background: "rgba(76,175,80,0.07)", border: "2px solid rgba(76,175,80,0.2)" }}
        >
          <Icon name="Info" size={20} style={{ color: "#4CAF50", flexShrink: 0, marginTop: "2px" }} />
          <div className="font-rubik text-sm" style={{ color: "#aaa" }}>
            После оплаты привилегия активируется автоматически в течение <strong style={{ color: "#4CAF50" }}>15 минут</strong>. 
            Войдите на сервер и введите <strong style={{ color: "#FFD700", fontFamily: "monospace" }}>/rank check</strong> для проверки.
          </div>
        </div>
      </div>
    </section>
  );
}

function LeaderboardSection() {
  const [tab, setTab] = useState<"activity" | "donated">("activity");
  const sorted = [...leaderboard].sort((a, b) =>
    tab === "donated" ? b.donated - a.donated : b.activity - a.activity
  );

  return (
    <section id="leaderboard" className="py-20 px-4 max-w-4xl mx-auto">
      <SectionHeader title="ТОП ИГРОКОВ" subtitle="Лидеры нашего сервера" icon="Trophy" />

      <div className="flex gap-0 mb-8 w-fit mx-auto">
        {(["activity", "donated"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="font-pixel transition-all"
            style={{
              fontSize: "9px",
              padding: "10px 18px",
              background: tab === t ? "#4CAF50" : "rgba(76,175,80,0.08)",
              color: tab === t ? "#000" : "#4CAF50",
              border: "2px solid rgba(76,175,80,0.3)",
            }}
          >
            {t === "activity" ? "⚡ АКТИВНОСТЬ" : "💰 ДОНАТЫ"}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {sorted.map((player, idx) => {
          const medals = ["#FFD700", "#C0C0C0", "#CD7F32"];
          const isTop3 = idx < 3;
          const barColor = tab === "activity"
            ? (idx === 0 ? "#4CAF50" : "rgba(76,175,80,0.35)")
            : (idx === 0 ? "#FFD700" : "rgba(255,215,0,0.3)");
          const maxVal = tab === "activity" ? sorted[0].activity : sorted[0].donated;
          const val = tab === "activity" ? player.activity : player.donated;
          const pct = (val / maxVal) * 100;

          return (
            <div
              key={player.name}
              className="flex items-center gap-4 p-4 animate-slide-up transition-all"
              style={{
                background: isTop3 ? `${medals[idx]}06` : "rgba(255,255,255,0.015)",
                border: `2px solid ${isTop3 ? medals[idx] + "25" : "rgba(255,255,255,0.04)"}`,
                animationDelay: `${idx * 60}ms`,
              }}
            >
              <div className="font-pixel text-sm w-8 text-center flex-shrink-0" style={{ color: isTop3 ? medals[idx] : "#555" }}>
                {isTop3 ? player.badge : `#${player.rank}`}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-rubik font-semibold text-white text-sm truncate">{player.name}</span>
                  <span className="font-pixel flex-shrink-0" style={{ fontSize: "8px", color: "#666" }}>Lv.{player.level}</span>
                </div>
                <div className="h-1.5 w-full" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="h-1.5 transition-all duration-700" style={{ width: `${pct}%`, background: barColor }} />
                </div>
              </div>

              <div className="font-pixel text-right flex-shrink-0" style={{ fontSize: "9px", color: tab === "donated" ? "#FFD700" : "#4CAF50" }}>
                {tab === "donated" ? `${player.donated.toLocaleString()} ₽` : `${player.activity.toLocaleString()} ч`}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function RulesSection() {
  return (
    <section id="rules" className="py-20 px-4" style={{ background: "rgba(0,0,0,0.35)" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="ПРАВИЛА" subtitle="Правила сервера и условия покупок" icon="ScrollText" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rules.map((section, idx) => (
            <div
              key={section.title}
              className="p-5 animate-slide-up"
              style={{
                background: "var(--mc-surface)",
                border: "2px solid rgba(76,175,80,0.18)",
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <div className="flex items-center gap-3 mb-4 pb-3" style={{ borderBottom: "1px solid rgba(76,175,80,0.18)" }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: "rgba(76,175,80,0.12)", border: "1px solid rgba(76,175,80,0.35)" }}>
                  <Icon name={section.icon} size={15} style={{ color: "#4CAF50" }} />
                </div>
                <span className="font-pixel" style={{ fontSize: "10px", color: "#4CAF50" }}>{section.title}</span>
              </div>
              <ul className="flex flex-col gap-2">
                {section.items.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span style={{ color: "#4CAF50", fontSize: "8px", marginTop: "5px", flexShrink: 0 }}>■</span>
                    <span className="font-rubik text-sm" style={{ color: "#bbb" }}>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-8 p-5 flex items-start gap-4"
          style={{ background: "rgba(255,152,0,0.06)", border: "2px solid rgba(255,152,0,0.25)" }}
        >
          <span className="text-2xl flex-shrink-0">⚠️</span>
          <div>
            <div className="font-pixel mb-2" style={{ fontSize: "9px", color: "#FF9800" }}>ВАЖНО</div>
            <div className="font-rubik text-sm" style={{ color: "#aaa" }}>
              Нарушение правил сервера влечёт блокировку без возврата средств за донат-привилегии.
              Администрация оставляет за собой право изменять правила без предупреждения.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onNav }: { onNav: (id: string) => void }) {
  return (
    <footer className="py-12 px-4" style={{ background: "#050505", borderTop: "2px solid rgba(76,175,80,0.15)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <div className="font-pixel text-base mb-2" style={{ color: "#4CAF50" }}>⛏️ DUNWORLD</div>
            <div className="font-rubik text-sm mb-3" style={{ color: "#555" }}>Лучший магазин для твоего Minecraft</div>
            <div className="font-pixel" style={{ fontSize: "10px", color: "#4CAF50" }}>play.dunworld.ru</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-pixel mb-2" style={{ fontSize: "9px", color: "#555" }}>НАВИГАЦИЯ</div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                className="font-rubik text-sm text-left transition-colors duration-200 hover:text-green-400"
                style={{ color: "#555" }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-pixel mb-2" style={{ fontSize: "9px", color: "#555" }}>КОНТАКТЫ</div>
            <div className="font-rubik text-sm" style={{ color: "#555" }}>Discord: discord.gg/craftstore</div>
            <div className="font-rubik text-sm" style={{ color: "#555" }}>VK: vk.com/craftstore</div>
            <div className="font-rubik text-sm" style={{ color: "#555" }}>Telegram: @craftstoremc</div>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2" style={{ borderTop: "1px solid rgba(76,175,80,0.08)" }}>
          <div className="font-pixel" style={{ fontSize: "8px", color: "#333" }}>© 2024 CRAFTSTORE. ALL RIGHTS RESERVED.</div>
          <div className="font-pixel" style={{ fontSize: "8px", color: "#333" }}>NOT AN OFFICIAL MINECRAFT PRODUCT</div>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      <Navbar active={activeSection} onNav={scrollTo} />
      <HeroSection onNav={scrollTo} />
      <CatalogSection />
      <DonateSection />
      <LeaderboardSection />
      <RulesSection />
      <Footer onNav={scrollTo} />
    </div>
  );
}