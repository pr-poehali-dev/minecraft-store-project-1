import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/60246970-7ac1-4231-9122-fee36c5d59df/files/b29e7e85-2223-472c-99f8-1cd40d72f927.jpg";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navItems = [
  { id: "home", label: "Главная" },
  { id: "shop", label: "Магазин" },
  { id: "rules", label: "Правила" },
  { id: "donate", label: "Описание привилегий" },
  { id: "leaderboard", label: "Топ игроков" },
];

const privileges = [
  {
    id: "d-helper", name: "D.HELPER", price: 499,
    emoji: "🛡️",
    bg: "linear-gradient(135deg, #43A047, #1B5E20)",
    perks: ["Префикс [D.HELPER] в чате", "×2 к дропу предметов", "/fly на 7 дней", "Цветной ник", "30 дней"],
  },
  {
    id: "pegas", name: "PEGAS", price: 1999,
    emoji: "⭐",
    bg: "linear-gradient(135deg, #FB8C00, #E65100)",
    popular: true,
    perks: ["Префикс [PEGAS] золотом", "×3 к дропу предметов", "/fly без ограничений", "Приват 256 чанков", "30 дней"],
  },
  {
    id: "dev", name: "DEV", price: 24999,
    emoji: "👑",
    bg: "linear-gradient(135deg, #E53935, #7B1FA2)",
    perks: ["Префикс [DEV] красным", "Разработчик сервера", "FULL ACCESS", "Личный мир", "Вечная привилегия"],
  },
];

const chests = [
  { id: 1, name: "Сундук привилегий", price: 199, emoji: "📦", tag: null },
  { id: 2, name: "3 сундука привилегий", price: 499, emoji: "📦", tag: "×3" },
  { id: 3, name: "5 сундуков привилегий", price: 799, emoji: "📦", tag: "×5" },
  { id: 4, name: "Сундук с монетами", price: 99, emoji: "💰", tag: null },
  { id: 5, name: "3 сундука с монетами", price: 249, emoji: "💰", tag: "×3" },
  { id: 6, name: "Сундук с ключами", price: 149, emoji: "🗝️", tag: null },
];

const services = [
  { id: 1, name: "Разбан", price: 349, emoji: "🔓" },
  { id: 2, name: "Размут", price: 119, emoji: "🔊" },
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
    icon: "ScrollText", title: "1. Общие положения", items: [
      "Данный свод правил составлен представителем проекта DunWorld и действителен на всех игровых режимах.",
      "Незнание правил не освобождает от ответственности.",
      "Правила могут быть изменены без явного оповещения. При значительных изменениях — объявление на форуме.",
      "Решения главной администрации DunWorld не обсуждаются и не поддаются разжалованию.",
      "Администрация не выдаёт компенсации за потерю ресурсов из-за лагов, багов или действий читеров.",
      "Продажа, взлом, передача аккаунтов в обход официального сайта — строго запрещены. Бан без разбана.",
    ]
  },
  {
    icon: "UserCheck", title: "2. Регистрация", items: [
      "Никнейм должен быть корректным: без мата, оскорблений, схожести с администрацией.",
      "Никнейм не должен содержать названия запрещённых программ.",
      "При покупке услуг сохраняйте электронный чек — он нужен для восстановления.",
      "При утере аккаунта — обращайтесь в поддержку. Без чека восстановление невозможно.",
      "Безопасность аккаунта — ответственность игрока.",
    ]
  },
  {
    icon: "CreditCard", title: "3. Покупки", items: [
      "Игра на DunWorld не требует обязательной оплаты.",
      "Все покупки — добровольные пожертвования на развитие сервера.",
      "При ошибке платежа — обращайтесь в поддержку с чеком.",
      "Возврат средств не предусмотрен.",
      "Покупка привилегий не даёт право нарушать правила сервера.",
    ]
  },
  {
    icon: "MessageSquare", title: "4. Общение в чате", items: [
      "Флуд (>2 одинаковых сообщений в минуту) — мут 4 часа.",
      "Оскорбления, угрозы, мат — мут от 3 до 12 часов.",
      "Реклама сторонних серверов — бан перманентно.",
      "Оскорбление администрации — бан 5–15 дней.",
      "Распространение личных данных игроков (доксинг) — бан 30 дней.",
      "Пропаганда нацизма, наркотиков, терроризма — бан 3–7 дней.",
    ]
  },
  {
    icon: "Shield", title: "5. Запрещённое ПО", items: [
      "Использование читов — бан 50 дней + снос дома.",
      "Обход блокировки аккаунта — бан 70 дней.",
      "Использование ботов, макросов, автокликеров — бан 5–15 дней.",
      "Запрещены: X-Ray, Baritone, AutoAttack, FreeCam, ClickCrystal и аналоги.",
      "Хранение читов на ПК — бан 50 дней.",
      "Неадекватное поведение на проверке — бан 50 дней.",
    ]
  },
  {
    icon: "Server", title: "6. Игровой процесс", items: [
      "Лаг-машины, заливы, багоюз — бан 15–25 дней.",
      "Дюпы предметов — отключение аккаунта.",
      "Флуд командами (/pay и др.) — кик, затем бан 12 часов.",
      "Ловушки без выхода — бан 25 дней + снос.",
      "Создание кланов с оскорбительными названиями — бан 15 дней.",
      "Помеха работе персонала и проверке — бан 6–10 дней.",
    ]
  },
];

const socials = [
  { label: "ВКонтакте", icon: "ExternalLink", color: "#0077FF", bg: "#E3F0FF" },
  { label: "YouTube", icon: "ExternalLink", color: "#FF0000", bg: "#FFE5E5" },
  { label: "Discord", icon: "ExternalLink", color: "#5865F2", bg: "#EEEEFF" },
  { label: "Telegram", icon: "ExternalLink", color: "#26A5E4", bg: "#E3F6FF" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Navbar({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <button onClick={() => onNav("home")} className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: "#FF9800" }}>
            DW
          </div>
          <div className="leading-tight">
            <div className="font-rubik font-900 text-sm text-gray-900">DUN</div>
            <div className="font-rubik font-900 text-sm text-gray-900" style={{ marginTop: "-4px" }}>WORLD</div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className={`nav-link${active === item.id ? " active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Online + CTA */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-green-500 block" style={{ boxShadow: "0 0 5px #22c55e" }} />
            247 онлайн
          </div>
          <button className="orange-btn" onClick={() => onNav("shop")}>
            Магазин
          </button>
        </div>

        {/* Mobile */}
        <button className="md:hidden p-1 text-gray-600" onClick={() => setOpen(!open)}>
          <Icon name={open ? "X" : "Menu"} size={22} />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNav(item.id); setOpen(false); }}
              className="w-full text-left px-5 py-3 text-sm font-semibold text-gray-600 border-b border-gray-50 hover:text-orange-500"
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
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      <div className="absolute inset-0 z-0" style={{ background: "rgba(230,100,0,0.72)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-0" style={{ background: "linear-gradient(transparent, #F5F5F5)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="max-w-xl animate-slide-up">
          <h1 className="font-rubik font-900 text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-2">
            DUNWORLD
          </h1>
          <h2 className="font-rubik font-900 text-3xl sm:text-4xl text-white leading-tight mb-4" style={{ opacity: 0.9 }}>
            НАЧАЛО НОВОЙ ЭРЫ
          </h2>
          <p className="font-rubik text-white text-base mb-2" style={{ opacity: 0.85 }}>
            Открой для себя огромные миры,<br />полные веселья и приключений
          </p>
          <div className="flex items-center gap-3 mt-8 flex-wrap">
            <button className="orange-btn" onClick={() => onNav("shop")}>
              🛒 В магазин
            </button>
            <button
              className="font-rubik font-700 text-sm px-5 py-2.5 rounded-lg border-2 border-white text-white hover:bg-white hover:text-orange-500 transition-all"
              onClick={() => onNav("donate")}
            >
              Привилегии
            </button>
          </div>
        </div>

        {/* IP block */}
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block bg-white rounded-2xl p-5 shadow-xl text-center"
          style={{ minWidth: 200 }}
        >
          <div className="text-xs text-gray-500 font-semibold mb-1">Рекомендуемая версия</div>
          <div className="font-rubik font-700 text-orange-500 mb-3">1.16.5 — 1.20</div>
          <button
            className="orange-btn w-full flex items-center justify-center gap-2"
            onClick={() => navigator.clipboard?.writeText("play.dunworld.ru")}
          >
            play.dunworld.ru
            <Icon name="Copy" size={14} />
          </button>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <span className="w-2 h-2 rounded-full bg-green-500" style={{ boxShadow: "0 0 5px #22c55e" }} />
            <span className="text-xs text-gray-500">247 / 500 онлайн</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShopSection() {
  const [tab, setTab] = useState<"privileges" | "chests" | "services">("privileges");

  return (
    <section id="shop" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎁</span>
            <span className="font-rubik font-700 text-gray-800 text-lg">Магазин DunWorld</span>
          </div>
          <div className="flex gap-2">
            {(["privileges", "chests", "services"] as const).map((t) => {
              const labels = { privileges: "Привилегии", chests: "Сундуки", services: "Услуги" };
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="font-rubik font-600 text-sm px-4 py-2 rounded-lg transition-all"
                  style={{
                    background: tab === t ? "#FF9800" : "transparent",
                    color: tab === t ? "#fff" : "#888",
                  }}
                >
                  {labels[t]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Privileges */}
        {tab === "privileges" && (
          <div>
            <div className="font-rubik font-700 text-gray-700 text-base mb-4">Донат привилегии</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {privileges.map((priv, idx) => (
                <div
                  key={priv.id}
                  className="shop-card animate-slide-up"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {/* Image area */}
                  <div
                    className="h-44 flex items-center justify-center relative"
                    style={{ background: priv.bg }}
                  >
                    <span className="text-7xl animate-float" style={{ animationDelay: `${idx * 400}ms` }}>
                      {priv.emoji}
                    </span>
                    <div className="price-badge">{priv.price.toLocaleString()} ₽</div>
                    {priv.popular && (
                      <div
                        className="absolute top-0 right-0 font-rubik font-700 text-xs text-white px-2 py-1 rounded-bl-lg"
                        style={{ background: "#F44336" }}
                      >
                        ПОПУЛЯРНО
                      </div>
                    )}
                    <button className="cart-btn">
                      <Icon name="ShoppingCart" size={16} />
                    </button>
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <div className="font-rubik font-700 text-gray-900 mb-2">[{priv.name}]</div>
                    <ul className="flex flex-col gap-1">
                      {priv.perks.map((p, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-xs text-gray-500">
                          <span className="text-orange-400">▸</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chests */}
        {tab === "chests" && (
          <div>
            <div className="font-rubik font-700 text-gray-700 text-base mb-4">Сундуки</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {chests.map((chest, idx) => (
                <div
                  key={chest.id}
                  className="shop-card animate-slide-up"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div
                    className="h-36 flex items-center justify-center relative"
                    style={{ background: "linear-gradient(135deg, #FFF8E1, #FFE082)" }}
                  >
                    <span className="text-5xl animate-float" style={{ animationDelay: `${idx * 300}ms` }}>
                      {chest.emoji}
                    </span>
                    {chest.tag && (
                      <div className="absolute top-8 right-8 font-rubik font-900 text-yellow-500 text-xl">
                        {chest.tag}
                      </div>
                    )}
                    <div className="price-badge">{chest.price} ₽</div>
                    <button className="cart-btn"><Icon name="ShoppingCart" size={15} /></button>
                  </div>
                  <div className="p-3">
                    <div className="font-rubik font-600 text-gray-800 text-sm">{chest.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        {tab === "services" && (
          <div>
            <div className="font-rubik font-700 text-gray-700 text-base mb-4">Услуги</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {services.map((svc, idx) => (
                <div
                  key={svc.id}
                  className="shop-card animate-slide-up"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div
                    className="h-36 flex items-center justify-center relative"
                    style={{ background: "linear-gradient(135deg, #FFF3E0, #FFCC80)" }}
                  >
                    <span className="text-5xl animate-float" style={{ animationDelay: `${idx * 400}ms` }}>
                      {svc.emoji}
                    </span>
                    <div className="price-badge">{svc.price} ₽</div>
                    <button className="cart-btn"><Icon name="ShoppingCart" size={15} /></button>
                  </div>
                  <div className="p-3">
                    <div className="font-rubik font-600 text-gray-800 text-sm">{svc.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function JoinBanner() {
  return (
    <section className="py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <span className="text-5xl flex-shrink-0">⛏️</span>
          <div className="flex-1">
            <div className="font-rubik font-700 text-gray-900 text-lg mb-1">
              Присоединяйтесь к нам прямо сейчас и начинайте игру!
            </div>
            <div className="font-rubik text-sm text-gray-500">
              Выбери свою роль и отыгрывай её. У нас можно стать кем угодно!
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-gray-400">Версия сервера</div>
              <div className="font-rubik font-700 text-gray-700">1.16.5 — 1.20</div>
            </div>
            <button
              className="orange-btn flex items-center gap-2"
              onClick={() => navigator.clipboard?.writeText("play.dunworld.ru")}
            >
              play.dunworld.ru
              <Icon name="Copy" size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DonateSection() {
  return (
    <section id="donate" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-rubik font-900 text-2xl text-gray-900 mb-1">Описание привилегий</h2>
          <p className="text-sm text-gray-500">Подробное описание каждого ранга</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {privileges.map((priv, idx) => (
            <div
              key={priv.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm animate-slide-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="h-24 flex items-center justify-center" style={{ background: priv.bg }}>
                <span className="text-4xl">{priv.emoji}</span>
              </div>
              <div className="p-5">
                <div className="font-rubik font-700 text-gray-900 text-lg mb-1">[{priv.name}]</div>
                <div className="font-rubik font-900 text-orange-500 text-xl mb-4">
                  {priv.price.toLocaleString()} ₽
                </div>
                <ul className="flex flex-col gap-2 mb-5">
                  {priv.perks.map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 flex-shrink-0 text-xs">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <button className="orange-btn w-full">Купить [{priv.name}]</button>
              </div>
            </div>
          ))}
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
  const medals = ["#FFD700", "#C0C0C0", "#CD7F32"];

  return (
    <section id="leaderboard" className="py-16 px-4" style={{ background: "#EFEFEF" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-rubik font-900 text-2xl text-gray-900 mb-1">Топ игроков</h2>
          <p className="text-sm text-gray-500">Лидеры нашего сервера</p>
        </div>

        <div className="flex gap-2 mb-6 justify-center">
          {(["activity", "donated"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="font-rubik font-700 text-sm px-5 py-2 rounded-lg transition-all"
              style={{ background: tab === t ? "#FF9800" : "#fff", color: tab === t ? "#fff" : "#888" }}
            >
              {t === "activity" ? "⚡ Активность" : "💰 Донаты"}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {sorted.map((player, idx) => {
            const isTop3 = idx < 3;
            const maxVal = tab === "activity" ? sorted[0].activity : sorted[0].donated;
            const val = tab === "activity" ? player.activity : player.donated;
            const pct = (val / maxVal) * 100;

            return (
              <div
                key={player.name}
                className="flex items-center gap-4 px-5 py-3 border-b border-gray-50 last:border-0 animate-slide-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="w-8 text-center font-rubik font-700 text-base flex-shrink-0"
                  style={{ color: isTop3 ? medals[idx] : "#bbb" }}>
                  {isTop3 ? player.badge : `#${player.rank}`}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-rubik font-600 text-gray-800 text-sm truncate">{player.name}</span>
                    <span className="text-xs text-gray-400">Lv.{player.level}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-100">
                    <div className="h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: tab === "donated" ? "#FF9800" : "#22c55e" }} />
                  </div>
                </div>
                <div className="font-rubik font-700 text-sm flex-shrink-0"
                  style={{ color: tab === "donated" ? "#FF9800" : "#22c55e" }}>
                  {tab === "donated" ? `${player.donated.toLocaleString()} ₽` : `${player.activity.toLocaleString()} ч`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RulesSection() {
  return (
    <section id="rules" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-rubik font-900 text-2xl text-gray-900 mb-1">Правила сервера</h2>
          <p className="text-sm text-gray-500">Соблюдай правила — играй честно</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rules.map((section, idx) => (
            <div
              key={section.title}
              className="bg-white rounded-2xl p-5 shadow-sm animate-slide-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#FFF3E0" }}>
                  <Icon name={section.icon} size={18} style={{ color: "#FF9800" }} />
                </div>
                <span className="font-rubik font-700 text-gray-800">{section.title}</span>
              </div>
              <ul className="flex flex-col gap-2">
                {section.items.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-orange-400 mt-0.5 flex-shrink-0">■</span> {rule}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5 bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-xl flex-shrink-0">⚠️</span>
          <div className="text-sm text-gray-600">
            Нарушение правил влечёт блокировку <strong>без возврата средств</strong> за донат-привилегии.
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialsSection() {
  return (
    <section className="py-8 px-4" style={{ background: "#EFEFEF" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
        {socials.map((s) => (
          <button
            key={s.label}
            className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-all font-rubik font-700 text-gray-700"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
              <Icon name="ExternalLink" size={18} style={{ color: s.color }} />
            </div>
            {s.label}
          </button>
        ))}
      </div>
    </section>
  );
}

function Footer({ onNav }: { onNav: (id: string) => void }) {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: "#FF9800" }}>DW</div>
            <div className="font-rubik font-900 text-gray-900">DUNWORLD</div>
          </div>
          <div className="text-xs text-gray-400 leading-relaxed">
            © 2026 DunWorld. Все права защищены.<br />
            DunWorld не связан с MojangAB.<br />
            admin@dunworld.ru
          </div>
        </div>
        <div>
          <div className="font-rubik font-700 text-gray-700 mb-3 text-sm">Навигация</div>
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => onNav(item.id)}
                className="text-sm text-gray-500 text-left hover:text-orange-500 transition-colors font-rubik">
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="font-rubik font-700 text-gray-700 mb-3 text-sm">Документы</div>
          <div className="flex flex-col gap-2">
            {["Договор оферты", "Политика конфиденциальности", "Способы оплаты"].map((doc) => (
              <button key={doc} className="text-sm text-orange-500 text-left hover:underline font-rubik">{doc}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function Index() {
  const [active, setActive] = useState("home");

  const scrollTo = (id: string) => {
    setActive(id);
    if (id === "home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: "#F5F5F5" }}>
      <Navbar active={active} onNav={scrollTo} />
      <HeroSection onNav={scrollTo} />
      <JoinBanner />
      <ShopSection />
      <DonateSection />
      <LeaderboardSection />
      <RulesSection />
      <SocialsSection />
      <Footer onNav={scrollTo} />
    </div>
  );
}