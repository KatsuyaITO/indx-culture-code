"use client"

import React, { useState, useEffect } from "react" // useEffect をインポート
// Assuming these components are available from shadcn/ui
// You might need to install them: npm install lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge
import { Input } from "@/components/ui/input" // Placeholder - Replace with actual import if needed
import { Badge } from "@/components/ui/badge" // Placeholder - Replace with actual import if needed
import { Search, Filter, Tag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// --- Placeholder Components (Replace with your actual shadcn/ui imports) ---
// If you don't have these components set up, you can use these basic placeholders
// or install and configure shadcn/ui.

const InputPlaceholder = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    )
  }
)
InputPlaceholder.displayName = "Input"

const BadgePlaceholder = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" }>(
  ({ className, variant, ...props }, ref) => {
    const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    const variantClasses =
      variant === "outline"
        ? "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
        : "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
    return <div ref={ref} className={`${baseClasses} ${variantClasses} ${className}`} {...props} />
  }
)
BadgePlaceholder.displayName = "Badge"

// Use placeholders if actual components aren't available
const InputComponent = typeof Input !== "undefined" ? Input : InputPlaceholder
const BadgeComponent = typeof Badge !== "undefined" ? Badge : BadgePlaceholder



// Define the structure for culture code data
// カルチャーコードデータの構造を定義します
interface CultureCode {
  id: number;
  companyName: string;
  slogan: string; // English slogan - 英語のスローガン
  slogan_ja: string; // Japanese slogan - 日本語のスローガン
  description: string; // Detailed description - 詳細な説明
  tags: string[];
  color: string;
}

// Define the combined culture code data
// 統合されたカルチャーコードデータを定義します
const cultureCodes: CultureCode[] = [
  // Original Set (IDs 1-26) - 元のセット (ID 1-26)
  {
    id: 1,
    companyName: "Netflix",
    slogan: "Freedom & Responsibility",
    slogan_ja: "自由と責任",
    description:
      "従業員に責任と共に意思決定の自由を与え、高いパフォーマンスを期待し支援する環境を提供。管理よりもコンテキストを提供し、自律的な判断を促すことでイノベーションを生み出す。", // Expanded description - 拡張された説明
    tags: ["tech", "entertainment", "autonomy", "responsibility", "high-performance", "employee-freedom", "decision-making", "talent-density", "core-concept", "innovation", "context-not-control"],
    color: "#E50914",
  },
  {
    id: 2,
    companyName: "Patagonia",
    slogan: "Build the best product, cause no unnecessary harm",
    slogan_ja: "最高の製品を作り、不必要な害を与えない",
    description:
      "故郷である地球を救うためにビジネスを行い、環境活動と品質を重視。アウトドアの価値観を反映し、製品の耐久性、修理可能性、リサイクル可能性を通じて環境負荷を最小限に抑える。", // Expanded description - 拡張された説明
    tags: ["retail", "sustainability", "environment", "activism", "quality", "corporate-responsibility", "outdoor", "employee-benefits", "purpose-driven", "mission", "durability", "repairability"],
    color: "#5DA422",
  },
  {
    id: 3,
    companyName: "Atlassian",
    slogan: "Open company, no bullshit",
    slogan_ja: "オープンな会社、無駄なし",
    description: "透明性と正直さを信じ、情報をオープンに共有。階層や形式主義にとらわれず、率直なコミュニケーションを通じてチームの力を最大限に引き出し、迅速な意思決定を可能にする。", // Expanded description - 拡張された説明
    tags: ["tech", "transparency", "collaboration", "honesty", "teamwork", "no-bullshit", "open-communication", "company-values", "play-as-a-team", "core-value", "flat-structure", "candor"],
    color: "#0052CC",
  },
  {
    id: 4,
    companyName: "Zappos",
    slogan: "Deliver WOW Through Service",
    slogan_ja: "サービスを通じて「ワオ！」をお届け",
    description:
      "最高の顧客サービスと楽しく少し変わった体験を創造。従業員の幸福が顧客の幸福につながると信じ、期待を超えるインタラクションを通じて顧客との強い絆を築く。", // Expanded description - 拡張された説明
    tags: ["retail", "customer-service", "happiness", "corporate-culture", "employee-empowerment", "wow-experience", "fun", "core-values", "weirdness", "mission", "customer-relationship", "employee-wellbeing"],
    color: "#00B3E3",
  },
  {
    id: 5,
    companyName: "Airbnb",
    slogan: "Belong Anywhere",
    slogan_ja: "どこでも居場所がある",
    description:
      "誰もがどこにでも居場所を持てる世界を創造。ローカルで多様な持続可能な旅行を提供することが使命であり、ホストとゲストのコミュニティを通じて文化的なつながりを育む。", // Expanded description - 拡張された説明
    tags: ["hospitality", "community", "belonging", "travel", "inclusion", "diversity", "shared-economy", "local-experience", "mission-driven", "stakeholder-focus", "mission", "cultural-connection"],
    color: "#FF5A5F",
  },
  {
    id: 6,
    companyName: "HubSpot", // Corrected typo from Hubspot to HubSpot
    slogan: "HEART: Humble, Empathetic, Adaptable, Remarkable, Transparent",
    slogan_ja: "HEART: 謙虚、共感的、適応性、注目に値する、透明性",
    description: "達成することと同じくらい、働き方が重要だと信じ、HEART（謙虚、共感的、適応性、注目に値する、透明性）を文化の核とする。これらの価値観を通じて、顧客中心で成長志向の組織文化を育む。", // Expanded description - 拡張された説明
    tags: ["tech", "marketing", "transparency", "inbound-marketing", "growth", "employee-centric", "empathy", "adaptability", "humble", "remarkable", "culture-code", "core-values", "customer-centric", "growth-mindset"],
    color: "#FF7A59",
  },
  {
    id: 7,
    companyName: "Asana",
    slogan: "Do great things, together",
    slogan_ja: "共に素晴らしいことを成し遂げる",
    description:
      "チームが目標を達成し、共に素晴らしいことを成し遂げるのを助ける製品にコミット。マインドフルネスと共同創造の文化を育み、透明性と説明責任を通じて効果的なコラボレーションを実現する。", // Expanded description - 拡張された説明
    tags: ["tech", "productivity", "collaboration", "teamwork", "project-management", "mindfulness", "goal-achievement", "mission-driven", "co-creation", "mission", "transparency", "accountability"],
    color: "#F06A6A",
  },
  {
    id: 8,
    companyName: "Buffer",
    slogan: "Default to transparency",
    slogan_ja: "デフォルトで透明性",
    description: "給与から収益までオープンに共有する徹底的な透明性。リモートワークと従業員の幸福を重視し、信頼と自律性に基づいた働き方を支援する。", // Expanded description - 拡張された説明
    tags: ["tech", "transparency", "remote-work", "social-media", "startup", "employee-wellbeing", "open-salaries", "authenticity", "work-life-balance", "core-value", "trust", "autonomy"],
    color: "#2C4BFF",
  },
  {
    id: 9,
    companyName: "Google",
    slogan: "Organize the world's information and make it universally accessible and useful",
    slogan_ja: "情報を整理し、アクセス可能で有用なものにする",
    description:
      "オープンさ、革新性、ユーザー中心を核とする文化。従業員の創造性と幸福を支援し、世界中の情報へのアクセスを民主化することで社会に貢献することを目指す。", // Expanded description - 拡張された説明
    tags: ["tech", "search-engine", "cloud-computing", "advertising", "innovation", "transparency", "user-focus", "data-driven", "employee-wellbeing", "openness", "mission", "creativity", "social-impact"],
    color: "#4285F4",
  },
  {
    id: 10,
    companyName: "Microsoft",
    slogan: "Empower every person and every organization on the planet to achieve more",
    slogan_ja: "地球上のすべての個人とすべての組織が、より多くのことを達成できるようにする",
    description:
      "「グロースマインドセット」を推進し、尊敬、誠実さ、説明責任が中核。顧客中心、多様性と協力を重視し、テクノロジーを通じて人々の可能性を最大限に引き出すことを目指す。", // Expanded description - 拡張された説明
    tags: ["tech", "software", "cloud-computing", "empowerment", "growth-mindset", "collaboration", "diversity-inclusion", "customer-obsession", "accountability", "integrity", "mission", "potential", "respect"],
    color: "#00A4EF",
  },
  {
    id: 11,
    companyName: "Apple",
    slogan: "To bring the best user experience to its customers through innovative hardware, software, and services.",
    slogan_ja: "シンプルに革新し、生活を豊かにする", // Simplified interpretation - 簡略化された解釈
    description:
      "イノベーション、卓越性、シンプルさを追求し、最高のユーザー体験を使命とする。デザイン、プライバシー、アクセシビリティ、環境への配慮を重視し、人々の生活を豊かにする製品を提供する。", // Expanded description - 拡張された説明
    tags: ["tech", "consumer-electronics", "hardware", "software", "innovation", "design", "simplicity", "excellence", "privacy", "collaboration", "sustainability", "accessibility", "mission", "user-experience"],
    color: "#A2AAAD",
  },
  {
    id: 12,
    companyName: "Amazon",
    slogan: "To be Earth's most customer-centric company",
    slogan_ja: "顧客へのこだわり、Day 1メンタリティ", // Includes internal mantra - 内部のマントラを含む
    description:
      "顧客へのこだわりが最優先。Day 1文化は機敏性、革新性、長期思考を強調し、高い基準を重視。リーダーシップ原則に基づき、オーナーシップを持って行動し、結果を出すことにコミットする。", // Expanded description - 拡張された説明
    tags: ["tech", "e-commerce", "cloud-computing", "customer-obsession", "innovation", "ownership", "bias-for-action", "frugality", "high-standards", "long-term-thinking", "data-driven", "operational-excellence", "mission", "day-one", "leadership-principles"],
    color: "#FF9900",
  },
  {
    id: 13,
    companyName: "Starbucks",
    slogan: "To inspire and nurture the human spirit – one person, one cup and one neighborhood at a time.",
    slogan_ja: "人間の精神を鼓舞し、育む", // Simplified - 簡略化
    description:
      "人とのつながり、「サードプレイス」、従業員（パートナー）を重視する文化。パートナーの幸福に投資し、地域社会に貢献することで、一杯のコーヒーを通じて温かい体験を提供する。", // Expanded description - 拡張された説明
    tags: ["food-beverage", "retail", "hospitality", "community", "belonging", "employee-wellbeing", "customer-service", "third-place", "sustainability", "craftsmanship", "human-connection", "mission", "partner-focus"],
    color: "#00704A",
  },
  {
    id: 14,
    companyName: "Nike",
    slogan: "Bring inspiration and innovation to every athlete* in the world. (*If you have a body, you are an athlete.)",
    slogan_ja: "世界中のすべてのアスリート*にインスピレーションとイノベーションをもたらす",
    description:
      "すべてのアスリートへの貢献が使命。革新、インスピレーション、競争、チームワークを重視。「Just Do It」精神に基づき、スポーツの力を通じて人々の可能性を引き出し、限界を超えることを奨励する。", // Expanded description - 拡張された説明
    tags: ["apparel", "retail", "sports", "innovation", "performance", "inspiration", "empowerment", "diversity-inclusion", "sustainability", "collaboration", "competition", "just-do-it", "mission", "potential"],
    color: "#000000",
  },
  {
    id: 15,
    companyName: "Salesforce",
    slogan: "We bring companies and customers together.",
    slogan_ja: "企業と顧客をつなぐ",
    description:
      "信頼、顧客成功、イノベーション、平等、持続可能性をコアバリューとする。社会貢献（1-1-1モデル）にも力を入れ、テクノロジーを活用してより良い世界の実現を目指す。", // Expanded description - 拡張された説明
    tags: ["tech", "crm", "cloud-computing", "customer-success", "innovation", "trust", "equality", "sustainability", "community", "philanthropy", "mission", "core-values", "1-1-1-model", "social-impact"],
    color: "#00A1E0",
  },
  {
    id: 16,
    companyName: "Adobe",
    slogan: "Changing the world through digital experiences.",
    slogan_ja: "デジタル体験を通じて世界を変える",
    description:
      "創造性、コンテンツ、デジタル体験を核とする。従業員の成長と幸福を支援し、多様性と誠実さを重視。革新的なツールとサービスを提供し、誰もが創造性を発揮できる世界を目指す。", // Expanded description - 拡張された説明
    tags: ["tech", "software", "creativity", "design", "digital-marketing", "innovation", "collaboration", "employee-growth", "diversity-inclusion", "integrity", "mission", "core-values", "empowerment", "digital-transformation"],
    color: "#FF0000",
  },
  {
    id: 17,
    companyName: "サウスウエスト航空", // Southwest Airlines
    slogan: "To be the world's most loved, most efficient, and most profitable airline",
    slogan_ja: "世界で最も愛され、最も効率的で、最も収益性の高い航空会社になること",
    description:
      "従業員第一主義と「楽しむ姿勢」を重視する独自の文化。高い顧客サービスと協力的な労使関係が特徴であり、温かいおもてなしと効率的な運営を通じて、空の旅をより身近なものにする。", // Expanded description - 拡張された説明
    tags: ["airline", "employee-first", "customer-service", "fun-loving attitude", "low-cost", "hospitality", "union", "mission", "core-values", "efficiency", "employee-relations"],
    color: "#2C4299", // Bold Blue - 太字の青
  },
  {
    id: 18,
    companyName: "REI",
    slogan: "To inspire and enable a life outside for everyone",
    slogan_ja: "すべての人にアウトドアでの生活を刺激し、可能にすること",
    description:
      "消費者協同組合として、メンバー、コミュニティ、環境保護を重視。「アウトドアライフをすべての人に」が理念であり、高品質なギアの提供と自然保護活動への貢献を通じて、人々と自然とのつながりを深める。", // Expanded description - 拡張された説明
    tags: ["retail", "outdoor", "cooperative", "environmental-protection", "community", "equity", "inclusion", "mission", "membership", "stewardship", "nature-connection"],
    color: "#5DA422", // Green (assumed) - 緑 (推測)
  },
  {
    id: 19,
    companyName: "コストコホールセール", // Costco Wholesale
    slogan: "To continually provide our members with quality goods and services at the lowest possible prices",
    slogan_ja: "会員の皆様に、高品質な商品を可能な限り低価格で継続的に提供すること",
    description:
      "倫理規定を基盤とし、会員価値と従業員待遇の両立を重視。高品質な商品を低価格で提供することに注力し、効率的な運営とサプライヤーとの良好な関係を通じて、会員の生活向上に貢献する。", // Expanded description - 拡張された説明
    tags: ["retail", "membership", "low-price", "high-quality", "employee-care", "code-of-ethics", "efficiency", "mission", "core-values", "member-value", "supplier-relations", "operational-excellence"],
    color: "#E32A36", // Red - 赤
  },
  {
    id: 20,
    companyName: "ピクサー・アニメーション・スタジオ", // Pixar Animation Studios
    slogan: "Quality is the best business plan",
    slogan_ja: "品質こそが最高のビジネスプランである",
    description:
      "創造性とコラボレーションを核とし、品質を最重視。率直な意見交換（ブレインストラスト）を促進する文化を持ち、技術と芸術を融合させ、心に残るストーリーテリングを通じて観客を魅了する。", // Expanded description - 拡張された説明
    tags: ["animation", "creativity", "collaboration", "quality", "candor", "psychological-safety", "technology", "storytelling", "core-value", "braintrust", "artistry", "innovation"],
    color: "#000000", // Black - 黒
  },
  {
    id: 21,
    companyName: "3M",
    slogan: "Science. Applied to life.",
    slogan_ja: "サイエンスを、暮らしに活かす。",
    description:
      "イノベーションを組織の核とし、「15%ルール」などで従業員の自主性を尊重。科学を活かした製品開発を推進し、多様な技術プラットフォームを基盤に、世界中の人々の生活を向上させるソリューションを提供する。", // Expanded description - 拡張された説明
    tags: ["conglomerate", "innovation", "science", "technology", "autonomy", "collaboration", "perseverance", "15-percent-rule", "mission", "R&D", "problem-solving", "global-impact"],
    color: "#FF0000", // 3M Red - 3Mレッド
  },
  {
    id: 22,
    companyName: "トヨタ自動車",
    slogan: "Creating a better future through manufacturing and contributing to society.",
    slogan_ja: "モノづくりと社会への貢献を通じて、より良い未来を創造する。",
    description:
      "豊田綱領に基づき「豊かな社会づくり」に貢献。カイゼンと人間性尊重をトヨタ生産方式（TPS）で実践し、品質と効率を追求。持続可能なモビリティ社会の実現を目指し、ステークホルダーとの共存共栄を図る。", // Expanded description - 拡張された説明
    tags: ["automotive", "manufacturing", "quality", "kaizen", "continuous-improvement", "long-term-focus", "respect-for-people", "customer-first", "societal-contribution", "supply-chain", "lean-manufacturing", "TPS", "mobility", "mission", "core-values", "sustainability"],
    color: "#EB0A1E" // Toyota Red
  },
  {
    id: 23,
    companyName: "ソニー",
    slogan: "Fill the world with emotion, through the power of creativity and technology.",
    slogan_ja: "クリエイティビティとテクノロジーの力で、世界を感動で満たす。",
    description:
      "クリエイティビティとテクノロジーを駆使し、世界を感動（Kando）で満たすことを目指す。多様性と好奇心を重視し、イノベーションを追求。エンタテインメントからエレクトロニクスまで、多岐にわたる事業で人々の心を豊かにする。", // Expanded description - 拡張された説明
    tags: ["electronics", "entertainment", "gaming", "music", "movies", "technology", "innovation", "creativity", "kando", "diversity", "R&D", "consumer-electronics", "imaging", "semiconductor", "mission", "core-values", "curiosity"],
    color: "#000000" // Black
  },
  {
    id: 24,
    companyName: "任天堂",
    slogan: "Putting smiles on the faces of everyone Nintendo touches.",
    slogan_ja: "任天堂に関わるすべての人々を笑顔にする。",
    description:
      "「独創」の精神で、娯楽を通じて世界中の人々を笑顔にする。他社の真似をせず、「面白い体験」の創造とIP育成を重視。ハードウェアとソフトウェアの一体型開発で、世代を超えて愛されるエンターテインメントを提供する。", // Expanded description - 拡張された説明
    tags: ["gaming", "entertainment", "consumer-electronics", "creativity", "innovation", "fun", "originality", "intellectual-property", "user-experience", "family-friendly", "quality", "long-term-focus", "mission", "core-value", "hardware-software-integration"],
    color: "#E60012" // Nintendo Red
  },
  {
    id: 25,
    companyName: "ファーストリテイリング",
    slogan: "Changing clothes. Changing conventional wisdom. Change the world.",
    slogan_ja: "服を変え、常識を変え、世界を変えていく。",
    description:
      "顧客起点で高品質な「LifeWear」を創り、人々の生活を豊かにする。「服を変え、常識を変え、世界を変えていく」精神で、革新と全員経営を重視。SPAモデルを通じて、企画から販売まで一貫して行い、グローバルに事業を展開する。", // Expanded description - 拡張された説明
    tags: ["retail", "apparel", "fashion", "global", "customer-centric", "innovation", "efficiency", "spa-model", "sustainability", "growth-mindset", "execution", "LifeWear", "global-standards", "mission", "all-management"],
    color: "#FF0000" // Red (Uniqlo logo color)
  },
  {
    id: 26,
    companyName: "良品計画",
    slogan: "To contribute to the basis of a pleasant life for people around the world.",
    slogan_ja: "感じ良い暮らしと社会の実現に貢献する。",
    description:
      "「感じ良い暮らしと社会」を目指し、素材・工程・包装を簡略化。シンプルで高品質な商品を「これでいい」という合理的満足感と共に提供し、持続可能で思慮深いライフスタイルを提案する。", // Expanded description - 拡張された説明
    tags: ["retail", "lifestyle", "household-goods", "apparel", "food", "simplicity", "sustainability", "minimalism", "quality", "natural", "universality", "anti-brand", "eco-friendly", "community", "mission", "philosophy", "rational-satisfaction"],
    color: "#731D2D" // Bordeaux (MUJI logo color)
  },

  // Added Set from Second List (IDs 27-105) - 新しいリストからの追加セット (ID 27-105)
  // Netflix Specific Values (ID 27-35) - Netflixの具体的な価値観
  {
    id: 27, // Was ID 2 in the second list
    companyName: "Netflix",
    slogan: "9 Core Values (Old Ver.)",
    slogan_ja: "9つのコアバリュー (旧バージョン)",
    description: "かつてNetflixが掲げていた、従業員に期待される具体的な行動特性のセット。判断力、コミュニケーション、インパクト、好奇心、イノベーション、勇気、情熱、正直さ、自己犠牲が含まれ、現在の文化の基盤となった。", // Expanded description - 拡張された説明
    tags: ["tech", "entertainment", "autonomy", "responsibility", "high-performance", "employee-freedom", "decision-making", "talent-density", "core-values", "behavioral-traits", "historical", "judgment", "communication", "impact", "curiosity", "innovation", "courage", "passion", "honesty", "selflessness"],
    color: "#E50914",
  },
  {
    id: 28, // Was ID 3
    companyName: "Netflix",
    slogan: "Open Information Sharing",
    slogan_ja: "オープンな情報交換",
    description: "組織全体の利益のために、関連性の高い情報を積極的に共有することを奨励する文化。これにより、従業員は十分な情報に基づいて最善の判断を下すことができる。", // Expanded description - 拡張された説明
    tags: ["tech", "entertainment", "autonomy", "responsibility", "high-performance", "transparency", "communication", "information-sharing", "collaboration", "context", "decision-making"],
    color: "#E50914",
  },
  {
    id: 29, // Was ID 4
    companyName: "Netflix",
    slogan: "Candor / Direct Communication",
    slogan_ja: "直接的なコミュニケーション",
    description: "率直さと直接性を重視し、建設的なフィードバックを通じて誤解や混乱を最小限に抑える。敬意を持って、タイムリーかつオープンに意見交換を行うことが期待される。", // Expanded description - 拡張された説明
    tags: ["tech", "entertainment", "autonomy", "responsibility", "high-performance", "communication", "candor", "honesty", "feedback", "transparency", "respect"],
    color: "#E50914",
  },
  {
    id: 30, // Was ID 5
    companyName: "Netflix",
    slogan: "High Effectiveness",
    slogan_ja: "高い有効性",
    description: "個人およびチームレベルでの目標達成と、測定可能な結果の提供を重視する。プロセスよりもインパクトを優先し、効率的に大きな成果を生み出すことが求められる。", // Expanded description - 拡張された説明
    tags: ["tech", "entertainment", "autonomy", "responsibility", "high-performance", "results-oriented", "effectiveness", "impact", "efficiency", "goal-achievement"],
    color: "#E50914",
  },
  {
    id: 31, // Was ID 6
    companyName: "Netflix",
    slogan: "Anti-rule philosophy",
    slogan_ja: "反ルール哲学",
    description: "厳格なルールを最小限にし、従業員の優れた判断力と自律性を信頼する（例：「Netflixの最善の利益のために行動する」）。これにより、変化への迅速な適応とイノベーションを促進する。", // Expanded description - 拡張された説明
    tags: ["tech", "entertainment", "autonomy", "responsibility", "high-performance", "flexibility", "adaptability", "judgment", "minimal-rules", "trust", "empowerment", "innovation"],
    color: "#E50914",
  },
  {
    id: 32, // Was ID 7
    companyName: "Netflix",
    slogan: "Autonomy",
    slogan_ja: "自律性",
    description: "従業員が自身の仕事の進め方について高いレベルの自由と裁量を持つことを奨励する（例：休暇ポリシー「休暇を取る」）。責任感とオーナーシップを育み、主体的な行動を促す。", // Expanded description - 拡張された説明
    tags: ["tech", "entertainment", "autonomy", "responsibility", "high-performance", "employee-freedom", "empowerment", "decision-making", "ownership", "trust", "flexibility"],
    color: "#E50914",
  },
  {
    id: 33, // Was ID 8
    companyName: "Netflix",
    slogan: "Inclusion & Diversity",
    slogan_ja: "インクルージョンとダイバーシティ",
    description: "多様な視点、経験、背景がイノベーションとより良い意思決定を促進すると信じている。従業員リソースグループ（ERG）などを通じて、すべての従業員が尊重され、受け入れられるインクルーシブな環境を積極的に構築する。", // Expanded description - 拡張された説明
    tags: ["tech", "entertainment", "autonomy", "responsibility", "high-performance", "diversity", "inclusion", "innovation", "belonging", "ERG", "equity", "respect", "perspective"],
    color: "#E50914",
  },
  {
    id: 34, // Was ID 9
    companyName: "Netflix",
    slogan: "High Performance",
    slogan_ja: "高業績志向",
    description: "常に卓越した成果を出す人材のみで構成される「ドリームチーム」を目指す。Keeper Test（その人が辞めると言ったら、慰留に努めるか？）を通じて、継続的に高い人材密度を維持する。", // Expanded description - 拡張された説明
    tags: ["tech", "entertainment", "autonomy", "responsibility", "high-performance", "talent-density", "excellence", "dream-team", "keeper-test", "results-oriented", "accountability"],
    color: "#E50914",
  },
  {
    id: 35, // Was ID 10
    companyName: "Netflix",
    slogan: "Science and Experimentation",
    slogan_ja: "科学と実験",
    description: "データに基づいた意思決定と、仮説検証のための実験（A/Bテストなど）を重視する文化。好奇心、賢明なリスクテイク、科学的厳密さを尊重し、継続的な改善とイノベーションを推進する。", // Expanded description - 拡張された説明
    tags: ["tech", "entertainment", "autonomy", "responsibility", "high-performance", "data-driven", "experimentation", "innovation", "curiosity", "risk-taking", "scientific-method", "A/B-testing", "continuous-improvement"],
    color: "#E50914",
  },
  // Patagonia Specific Values (ID 36-40) - Patagoniaの具体的な価値観
  {
    id: 36, // Was ID 11
    companyName: "Patagonia",
    slogan: "Quality",
    slogan_ja: "品質",
    description: "最高の製品（有用、多用途、長持ち、修理・リサイクル可能）を作り、最高のサービスを提供し、絶えず改善する。地球から得るものと同等かそれ以上のものを還元する製品作りを目指し、デザイン哲学としてシンプルさを追求する。", // Expanded description - 拡張された説明
    tags: ["retail", "sustainability", "environment", "activism", "quality", "corporate-responsibility", "outdoor", "durability", "repairability", "simplicity", "service", "continuous-improvement", "product-lifecycle", "minimalism"],
    color: "#5DA422",
  },
  {
    id: 37, // Was ID 12
    companyName: "Patagonia",
    slogan: "Integrity",
    slogan_ja: "誠実さ",
    description: "自社の活動や影響についてオープンかつ正直に検証し、過ちから学び、約束を果たす。言行一致を重視し、サプライチェーン全体での透明性と倫理的な行動を追求する。", // Expanded description - 拡張された説明
    tags: ["retail", "sustainability", "environment", "activism", "quality", "corporate-responsibility", "outdoor", "integrity", "honesty", "transparency", "accountability", "learning-from-mistakes", "ethics", "supply-chain-responsibility"],
    color: "#5DA422",
  },
  {
    id: 38, // Was ID 13
    companyName: "Patagonia",
    slogan: "Environmentalism",
    slogan_ja: "環境主義",
    description: "故郷である地球を守ることをビジネスの中心に据える。環境危機という文脈で意思決定し、影響削減、解決策共有、再生的実践に取り組む。1% for the PlanetやWorn Wearなどを通じて、草の根環境保護団体を支援し、環境再生を目指す。", // Expanded description - 拡張された説明
    tags: ["retail", "sustainability", "environment", "activism", "quality", "corporate-responsibility", "outdoor", "environmentalism", "conservation", "regenerative-practices", "advocacy", "1-percent-for-the-planet", "worn-wear", "climate-action", "stewardship"],
    color: "#5DA422",
  },
  {
    id: 39, // Was ID 14
    companyName: "Patagonia",
    slogan: "Justice",
    slogan_ja: "正義",
    description: "会社とコミュニティにおいて、公正、公平、反人種差別主義であることにコミットする。歴史的に疎外されてきた人々のための公平性を創り出し、偏見と向き合い、方針を変更し、互いに責任を負う。多様な人々が貢献し、リーダーシップを発揮できるインクルーシブな会社を目指す。", // Expanded description - 拡張された説明
    tags: ["retail", "sustainability", "environment", "activism", "quality", "corporate-responsibility", "outdoor", "justice", "equity", "anti-racism", "inclusion", "diversity", "fairness", "accountability", "social-justice", "human-rights"],
    color: "#5DA422",
  },
  {
    id: 40, // Was ID 15
    companyName: "Patagonia",
    slogan: "Not bound by convention",
    slogan_ja: "慣習に縛られない",
    description: "従来のビジネス慣行にとらわれず、独自のやり方を追求する。環境や社会に対する責任を果たすために、革新的で時には型破りなアプローチを採用し、新しい道を切り開くことに価値を見出す。", // Expanded description - 拡張された説明
    tags: ["retail", "sustainability", "environment", "activism", "quality", "corporate-responsibility", "outdoor", "non-conventional", "innovation", "originality", "independence", "uniqueness", "trailblazing", "risk-taking"],
    color: "#5DA422",
  },
  // Atlassian Specific Values (ID 41-45) - Atlassianの具体的な価値観
  {
    id: 41, // Was ID 16
    companyName: "Atlassian",
    slogan: "Open company, no bullshit",
    slogan_ja: "オープンな会社、無駄なし",
    description: "情報はデフォルトで内部公開され、アクセス可能。意見を述べる際は内容、思慮深さ、配慮のバランスを取り、率直かつ建設的な対話を奨励する。これにより、信頼と説明責任に基づいた文化を育む。", // Expanded description - 拡張された説明
    tags: ["tech", "transparency", "collaboration", "honesty", "teamwork", "no-bullshit", "open-communication", "company-values", "play-as-a-team", "candor", "trust", "accountability", "information-access", "constructive-dialogue"],
    color: "#0052CC",
  },
  {
    id: 42, // Was ID 17
    companyName: "Atlassian",
    slogan: "Build with heart and balance",
    slogan_ja: "心とバランスを持って構築する",
    description: "仕事に対する情熱と緊急性を持ちつつ、長期的な視点と慎重さを持って選択肢を検討する。機能的で使いやすく、楽しい製品作りを目指すと同時に、持続可能なペースで働くためのワークライフバランスを重視する。", // Expanded description - 拡張された説明
    tags: ["tech", "transparency", "collaboration", "honesty", "teamwork", "no-bullshit", "company-values", "passion", "balance", "work-life-balance", "thoughtfulness", "product-development", "sustainability", "long-term-view", "craftsmanship"],
    color: "#0052CC",
  },
  {
    id: 43, // Was ID 18
    companyName: "Atlassian",
    slogan: "Don't #@!% the customer",
    slogan_ja: "顧客を#@!%するな",
    description: "顧客はビジネスの生命線であり、常に顧客の視点を第一に考える。顧客のニーズを深く理解し、それを満たす製品やサービスを提供し、長期的な信頼関係を築くことに全力を尽くす。", // Expanded description - 拡張された説明
    tags: ["tech", "transparency", "collaboration", "honesty", "teamwork", "no-bullshit", "company-values", "customer-focus", "customer-service", "trust", "reliability", "advocacy", "customer-centricity", "long-term-relationship"],
    color: "#0052CC",
  },
  {
    id: 44, // Was ID 19
    companyName: "Atlassian",
    slogan: "Play, as a team",
    slogan_ja: "チームとして、遊ぶ",
    description: "仕事を楽しむ文化を大切にし、真剣に取り組みながらも、過度に深刻にならない。チーム全体の成功を個人の成功よりも優先し、互いをサポートし、包括的なコラボレーションを通じてより大きな成果を目指す。", // Expanded description - 拡張された説明
    tags: ["tech", "transparency", "collaboration", "honesty", "teamwork", "no-bullshit", "company-values", "play-as-a-team", "fun", "inclusion", "team-spirit", "synergy", "support", "collective-success"],
    color: "#0052CC",
  },
  {
    id: 45, // Was ID 20
    companyName: "Atlassian",
    slogan: "Be the change you seek",
    slogan_ja: "あなたが求める変化に、あなた自身がなる",
    description: "現状に満足せず、改善の機会を見つけたら、自らが率先して行動を起こすことを奨励する。継続的な改善は全員の責任であり、オーナーシップを持ってイニシアチブを取り、ポジティブな影響を与え、イノベーションを推進する。", // Expanded description - 拡張された説明
    tags: ["tech", "transparency", "collaboration", "honesty", "teamwork", "no-bullshit", "company-values", "proactive", "initiative", "continuous-improvement", "empowerment", "innovation", "responsibility", "ownership", "change-agent"],
    color: "#0052CC",
  },
  // Zappos Specific Values (ID 46-55) - Zapposの具体的な価値観
  {
    id: 46, // Was ID 21
    companyName: "Zappos",
    slogan: "Deliver WOW Through Service",
    slogan_ja: "サービスを通じてWOW（驚き）を届ける",
    description: "単なる顧客満足を超え、期待を上回る驚きと感動を提供するサービスを目指す。他社との差別化を図り、革新的で記憶に残る、ポジティブな感情的インパクトを与えるインタラクションを重視する。", // Expanded description - 拡張された説明
    tags: ["retail", "customer-service", "happiness", "corporate-culture", "employee-empowerment", "wow-experience", "fun", "core-values", "weirdness", "excellence", "innovation", "differentiation", "emotional-connection", "above-and-beyond"],
    color: "#00B3E3",
  },
  {
    id: 47, // Was ID 22
    companyName: "Zappos",
    slogan: "Embrace and Drive Change",
    slogan_ja: "変化を受け入れ、推進する",
    description: "変化は成長の機会であり、常態であると捉える。変化を恐れずに熱意を持って受け入れ、自らが変化の推進力となることを奨励する。現状維持に満足せず、常に改善と進化を求める。", // Expanded description - 拡張された説明
    tags: ["retail", "customer-service", "happiness", "corporate-culture", "employee-empowerment", "core-values", "adaptability", "change-management", "proactive", "enthusiasm", "continuous-improvement", "growth-mindset", "resilience"],
    color: "#00B3E3",
  },
  {
    id: 48, // Was ID 23
    companyName: "Zappos",
    slogan: "Create Fun and A Little Weirdness",
    slogan_ja: "楽しさとちょっと変わったことを創造する",
    description: "仕事の中に楽しさやユーモアを見出し、それを積極的に創造することを奨励する。Zappos独自のユニークで記憶に残る個性を大切にし、「少しの奇妙さ」が創造性やポジティブな職場環境を生むと信じる。", // Expanded description - 拡張された説明
    tags: ["retail", "customer-service", "happiness", "corporate-culture", "employee-empowerment", "fun", "core-values", "weirdness", "humor", "uniqueness", "individuality", "creativity", "positive-workplace"],
    color: "#00B3E3",
  },
  {
    id: 49, // Was ID 24
    companyName: "Zappos",
    slogan: "Be Adventurous, Creative, and Open-Minded",
    slogan_ja: "冒険好きで、創造的で、オープンマインドであれ",
    description: "既成概念にとらわれず、新しいアイデアやアプローチに対して大胆かつ果敢に挑戦することを奨励する。リスクを取ることや失敗を恐れず、それらを学びと成長の機会と捉え、常に新しい可能性を探求する。", // Expanded description - 拡張された説明
    tags: ["retail", "customer-service", "happiness", "corporate-culture", "employee-empowerment", "core-values", "adventure", "creativity", "open-mindedness", "risk-taking", "learning-from-mistakes", "exploration", "innovation", "boldness"],
    color: "#00B3E3",
  },
  {
    id: 50, // Was ID 25
    companyName: "Zappos",
    slogan: "Pursue Growth and Learning",
    slogan_ja: "成長と学びを追求する",
    description: "従業員一人ひとりが持つ可能性を信じ、個人的にも専門的にも継続的に成長し、学び続けることを奨励する。常に挑戦し、自分自身の限界を押し広げることで、個人と組織全体の発展を目指す (例: Zappos University)。", // Expanded description - 拡張された説明
    tags: ["retail", "customer-service", "happiness", "corporate-culture", "employee-empowerment", "core-values", "growth", "learning", "personal-development", "professional-development", "challenge", "potential", "continuous-learning", "skill-development"],
    color: "#00B3E3",
  },
  {
    id: 51, // Was ID 26
    companyName: "Zappos",
    slogan: "Build Open and Honest Relationships With Communication",
    slogan_ja: "コミュニケーションを通じて、オープンで正直な人間関係を築く",
    description: "社内外を問わず、すべての人間関係の基盤として、オープンで正直、かつ敬意を持ったコミュニケーションを重視する。効果的なコミュニケーションを通じて、信頼を築き、強いチームワークとパートナーシップを育む。", // Expanded description - 拡張された説明
    tags: ["retail", "customer-service", "happiness", "corporate-culture", "employee-empowerment", "core-values", "communication", "honesty", "openness", "trust", "relationships", "respect", "teamwork", "partnership"],
    color: "#00B3E3",
  },
  {
    id: 52, // Was ID 27
    companyName: "Zappos",
    slogan: "Build a Positive Team and Family Spirit",
    slogan_ja: "ポジティブなチームと家族精神を築く",
    description: "職場において、互いにサポートし合い、励まし合う、ポジティブで包括的な環境を作り出すことを目指す。チームメンバーを家族のように大切にし、協力し合い、共に成功を祝う文化を育む。", // Expanded description - 拡張された説明
    tags: ["retail", "customer-service", "happiness", "corporate-culture", "employee-empowerment", "core-values", "teamwork", "positivity", "family-spirit", "inclusion", "support", "collaboration", "morale", "belonging"],
    color: "#00B3E3",
  },
  {
    id: 53, // Was ID 28
    companyName: "Zappos",
    slogan: "Do More With Less",
    slogan_ja: "より少ないもので、より多くを行う",
    description: "効率性、機知、そして無駄のない運営を重視する。限られたリソースの中で最大限の成果を出すために、創造性と工夫を凝らし、賢明な意思決定を行うことが求められる。", // Expanded description - 拡張された説明
    tags: ["retail", "customer-service", "happiness", "corporate-culture", "employee-empowerment", "core-values", "efficiency", "resourcefulness", "lean-operations", "frugality", "creativity", "problem-solving", "optimization"],
    color: "#00B3E3",
  },
  {
    id: 54, // Was ID 29
    companyName: "Zappos",
    slogan: "Be Passionate and Determined",
    slogan_ja: "情熱的かつ意欲的であれ",
    description: "自らの仕事、会社のミッション、そして顧客に対して情熱を持つことを奨励する。困難に直面しても諦めず、目標達成に向けて粘り強く、強い意志と意欲を持って取り組む姿勢を重視する。", // Expanded description - 拡張された説明
    tags: ["retail", "customer-service", "happiness", "corporate-culture", "employee-empowerment", "core-values", "passion", "determination", "belief", "perseverance", "commitment", "drive", "resilience"],
    color: "#00B3E3",
  },
  {
    id: 55, // Was ID 30
    companyName: "Zappos",
    slogan: "Be Humble",
    slogan_ja: "謙虚であれ",
    description: "成功しても傲慢にならず、常に学ぶ姿勢を持ち続けることを重視する。他者への感謝の気持ちを忘れず、チームや顧客、パートナーに対して敬意を持って接し、広い視野を保つ。", // Expanded description - 拡張された説明
    tags: ["retail", "customer-service", "happiness", "corporate-culture", "employee-empowerment", "core-values", "humility", "gratitude", "perspective", "no-arrogance", "respect", "team-player", "continuous-learning"],
    color: "#00B3E3",
  },
  // Airbnb Specific Values (ID 56-61) - Airbnbの具体的な価値観
  {
    id: 56, // Was ID 31
    companyName: "Airbnb",
    slogan: "Champion the Mission",
    slogan_ja: "ミッションを支持する",
    description: "「誰もがどこにでも居場所を持てる世界を創造する」というミッションを最優先に行動する。ホストとゲストのコミュニティと連携し、つながりと居場所を育み、本物のローカル体験とインクルージョンを積極的に推進する。", // Expanded description - 拡張された説明
    tags: ["hospitality", "community", "belonging", "travel", "inclusion", "diversity", "shared-economy", "local-experience", "mission-driven", "stakeholder-focus", "advocacy", "connection", "purpose", "community-building"],
    color: "#FF5A5F",
  },
  {
    id: 57, // Was ID 32
    companyName: "Airbnb",
    slogan: "Be a Host",
    slogan_ja: "ホストであること",
    description: "関わるすべての人（同僚、ゲスト、ホスト、コミュニティ）に対して、思いやりがあり、オープンで、励ましを与える存在であること。ホスピタリティ精神を持ち、敬意を払い、互いに気を配り、歓迎される雰囲気を作り出す。", // Expanded description - 拡張された説明
    tags: ["hospitality", "community", "belonging", "travel", "inclusion", "diversity", "shared-economy", "local-experience", "mission-driven", "hosting", "empathy", "openness", "encouragement", "respect", "care", "welcoming"],
    color: "#FF5A5F",
  },
  {
    id: 58, // Was ID 33
    companyName: "Airbnb",
    slogan: "Embrace the Adventure",
    slogan_ja: "冒険を受け入れる",
    description: "好奇心、希望に満ちた回復力、そして成長への信念に突き動かされる。未知のことや困難な状況に対しても前向きに取り組み、コンフォートゾーンから踏み出して新しい体験や学びを探求することを奨励する。", // Expanded description - 拡張された説明
    tags: ["hospitality", "community", "belonging", "travel", "inclusion", "diversity", "shared-economy", "local-experience", "mission-driven", "adventure", "curiosity", "resilience", "optimism", "growth-mindset", "exploration", "learning"],
    color: "#FF5A5F",
  },
  {
    id: 59, // Was ID 34
    companyName: "Airbnb",
    slogan: "Be a Cereal Entrepreneur",
    slogan_ja: "\"シリアル\"アントレプレナーであること",
    description: "野心的な目標を現実に変えるために、決意を持って創造的に取り組む。機知に富み、革新的で、既成概念にとらわれずに考え、リソースを最大限に活用して課題を解決する（創業者が資金調達のためにシリアルを販売した逸話に由来）。", // Expanded description - 拡張された説明
    tags: ["hospitality", "community", "belonging", "travel", "inclusion", "diversity", "shared-economy", "local-experience", "mission-driven", "entrepreneurship", "creativity", "determination", "resourcefulness", "innovation", "out-of-the-box-thinking", "problem-solving", "hustle"],
    color: "#FF5A5F",
  },
  {
    id: 60, // Was ID 35
    companyName: "Airbnb",
    slogan: "Integrity & Ethics",
    slogan_ja: "誠実さと倫理",
    description: "常に誠実に行動し、高い倫理基準を維持する。正直さ、透明性、敬意を重んじ、すべてのステークホルダーに対して責任ある行動をとる。倫理規定を遵守し、信頼を築く。", // Expanded description - 拡張された説明
    tags: ["hospitality", "community", "belonging", "travel", "inclusion", "diversity", "shared-economy", "local-experience", "mission-driven", "integrity", "ethics", "honesty", "respect", "compliance", "transparency", "accountability", "trust"],
    color: "#FF5A5F",
  },
  {
    id: 61, // Was ID 36
    companyName: "Airbnb",
    slogan: "Diversity & Inclusion",
    slogan_ja: "多様性とインクルージョン",
    description: "多様な背景、視点、経験を持つ人々が歓迎され、尊重され、活躍できる職場環境とプラットフォームを積極的に構築・促進する。機会均等、公平性、違いへの配慮を重視し、真の「居場所」をすべての人に提供することを目指す。", // Expanded description - 拡張された説明
    tags: ["hospitality", "community", "belonging", "travel", "inclusion", "diversity", "shared-economy", "local-experience", "mission-driven", "equity", "respect-for-differences", "equal-opportunity", "representation", "accessibility"],
    color: "#FF5A5F",
  },
 // HubSpot Specific Values (ID 62-71) - HubSpotの具体的な価値観 (HEART + others)
  {
    id: 62, // Was ID 37
    companyName: "HubSpot",
    slogan: "Humble",
    slogan_ja: "Humble", // Kept English as per source, though Japanese was 謙虚
    description: "自己認識が高く、他者への敬意を払い、自分のことよりもチームや顧客のことを優先する姿勢。成功を自分の手柄とせず、他者の貢献を認め、常に学び続ける謙虚さを持つ。", // Expanded description - 拡張された説明
    tags: ["tech", "marketing", "transparency", "inbound-marketing", "growth", "employee-centric", "empathy", "adaptability", "humble", "remarkable", "culture-code", "core-values", "self-awareness", "respect", "team-first", "modesty", "continuous-learning"],
    color: "#FF7A59",
  },
  {
    id: 63, // Was ID 38
    companyName: "HubSpot",
    slogan: "Empathetic",
    slogan_ja: "Empathetic", // Kept English as per source, though Japanese was 共感的
    description: "パートナー、同僚、顧客に対して深い思いやりと敬意を持って行動する。他者の視点を理解しようと努め、その立場に立って考え、行動する。「インバウンド」哲学の中核であり、顧客のために解決する(Solve For The Customer - SFTC)姿勢に繋がる。", // Expanded description - 拡張された説明
    tags: ["tech", "marketing", "transparency", "inbound-marketing", "growth", "employee-centric", "empathy", "adaptability", "humble", "remarkable", "culture-code", "core-values", "compassion", "respect", "perspective-taking", "SFTC", "customer-centricity", "understanding"],
    color: "#FF7A59",
  },
  {
    id: 64, // Was ID 39
    companyName: "HubSpot",
    slogan: "Adaptable",
    slogan_ja: "Adaptable", // Kept English as per source, though Japanese was 適応性
    description: "変化を恐れず、むしろそれを歓迎し、迅速に対応できる能力。生まれつき好奇心旺盛で、常に新しいことを学び続け、「知ったかぶり(know-it-alls)」ではなく「学び続ける人(learn-it-alls)」であることを重視する生涯学習者の姿勢。", // Expanded description - 拡張された説明
    tags: ["tech", "marketing", "transparency", "inbound-marketing", "growth", "employee-centric", "empathy", "adaptability", "humble", "remarkable", "culture-code", "core-values", "curiosity", "change-embracing", "lifelong-learning", "learn-it-all", "flexibility", "resilience"],
    color: "#FF7A59",
  },
  {
    id: 65, // Was ID 40
    companyName: "HubSpot",
    slogan: "Remarkable",
    slogan_ja: "Remarkable", // Kept English as per source, though Japanese was 注目に値する
    description: "平凡ではなく、他と一線を画すような卓越した成果を目指す姿勢。行動指向で、強い当事者意識を持ち、障害ではなく結果に焦点を当てる。周囲の助けとなり、機知に富み、効果的に物事を成し遂げる。「欠点のあるダイヤモンドの方が、欠点のない小石よりも良い」という考え方。", // Expanded description - 拡張された説明
    tags: ["tech", "marketing", "transparency", "inbound-marketing", "growth", "employee-centric", "empathy", "adaptability", "humble", "remarkable", "culture-code", "core-values", "action-oriented", "ownership", "results-focus", "effectiveness", "resourcefulness", "excellence", "impact"],
    color: "#FF7A59",
  },
  {
    id: 66, // Was ID 41
    companyName: "HubSpot",
    slogan: "Transparent",
    slogan_ja: "Transparent", // Kept English as per source, though Japanese was 透明性
    description: "他者に対しても自分自身に対しても、オープンで正直であることを重視する。情報を溜め込まず積極的に共有し（「太陽光は最高の消毒剤」）、階層のないオープンなコミュニケーション（ノードアポリシー）を実践する。意見が異なる場合でも率直に、敬意を持って伝えることが期待される。", // Expanded description - 拡張された説明
    tags: ["tech", "marketing", "transparency", "inbound-marketing", "growth", "employee-centric", "empathy", "adaptability", "humble", "remarkable", "culture-code", "core-values", "openness", "honesty", "information-sharing", "candor", "no-door-policy", "accountability", "trust"],
    color: "#FF7A59",
  },
  {
    id: 67, // Was ID 42
    companyName: "HubSpot",
    slogan: "Autonomy & Judgment",
    slogan_ja: "自律性と判断力",
    description: "従業員を信頼し、マイクロマネジメントではなく、明確な方向性を示すことで自律的な行動を促す。従業員は、会社の利益と価値観に基づき、自身で「良い判断(Use Good Judgment)」を下すことが期待される。", // Expanded description - 拡張された説明
    tags: ["tech", "marketing", "transparency", "inbound-marketing", "growth", "employee-centric", "autonomy", "judgment", "empowerment", "decision-making", "guidance", "use-good-judgment", "trust", "responsibility", "ownership"],
    color: "#FF7A59",
  },
  {
    id: 68, // Was ID 43
    companyName: "HubSpot",
    slogan: "Results Focus",
    slogan_ja: "結果重視",
    description: "プロセスや労働時間、場所よりも、最終的に生み出された結果やインパクトを最も重要視する。会社のミッション達成と重要な指標（メトリクス）の向上に熱心に取り組み、成果を出すことにコミットする。", // Expanded description - 拡張された説明
    tags: ["tech", "marketing", "transparency", "inbound-marketing", "growth", "employee-centric", "results-focus", "impact", "mission-driven", "metrics", "performance", "accountability", "effectiveness"],
    color: "#FF7A59",
  },
  {
    id: 69, // Was ID 44
    companyName: "HubSpot",
    slogan: "Risk-Taking & Learning",
    slogan_ja: "リスクテイクと学習",
    description: "イノベーションのためには、計算されたリスクを取ることを恐れない姿勢が重要であると考える。失敗は避けられないものであり、それを非難するのではなく、貴重な学習の機会として捉える（ただし、同じ間違いを繰り返さない）。", // Expanded description - 拡張された説明
    tags: ["tech", "marketing", "transparency", "inbound-marketing", "growth", "employee-centric", "risk-taking", "learning", "experimentation", "failure-tolerance", "continuous-improvement", "innovation", "psychological-safety"],
    color: "#FF7A59",
  },
  {
    id: 70, // Was ID 45
    companyName: "HubSpot",
    slogan: "Simplicity",
    slogan_ja: "シンプルさ",
    description: "複雑さを避け、顧客にとって製品やサービスが「買いやすく、使いやすく、愛しやすい」ものであることを目指す。社内のプロセスやコミュニケーションにおいても、明快さと効率性を追求する。", // Expanded description - 拡張された説明
    tags: ["tech", "marketing", "transparency", "inbound-marketing", "growth", "employee-centric", "simplicity", "ease-of-use", "customer-experience", "product-design", "clarity", "efficiency", "user-friendliness"],
    color: "#FF7A59",
  },
  {
    id: 71, // Was ID 46
    companyName: "HubSpot",
    slogan: "Work+Life",
    slogan_ja: "仕事＋生活",
    description: "仕事と私生活を対立するもの（Work vs Life）ではなく、互いに補完し合う統合されたもの（Work + Life）として捉える。仕事が有意義で、楽しく、個人の幸福や成長に貢献するものであるべきだと考える。", // Expanded description - 拡張された説明
    tags: ["tech", "marketing", "transparency", "inbound-marketing", "growth", "employee-centric", "work-life-integration", "meaningful-work", "enjoyment", "wellbeing", "flexibility", "employee-happiness", "sustainability"],
    color: "#FF7A59",
  },
  // Google Specific Values (ID 72-73) - Googleの具体的な価値観
  {
    id: 72, // Was ID 47
    companyName: "Google",
    slogan: "Focus on the user and all else will follow",
    slogan_ja: "ユーザーに焦点を合わせれば、他のものはみな後からついてくる",
    description: "Googleの最も基本的な行動規範であり、すべての意思決定の中心にユーザーの利益を置くという哲学。ユーザーに最高の体験を提供すれば、長期的な成功は自然についてくると信じている。", // Expanded description - 拡張された説明
    tags: ["tech", "search-engine", "cloud-computing", "advertising", "innovation", "transparency", "user-focus", "data-driven", "employee-wellbeing", "openness", "philosophy", "customer-centricity", "core-principle", "long-term-success"],
    color: "#4285F4",
  },
  {
    id: 73, // Was ID 48
    companyName: "Google",
    slogan: "Don't be evil (Evolved)",
    slogan_ja: "Do the right thing", // Empty as per source
    description: "かつてGoogleが非公式なモットーとして掲げていた倫理的な行動規範。現在は公式な行動規範「Do the right thing」に発展的に含まれているが、利益追求よりも倫理的な正しさを優先するという精神は、依然としてGoogleの文化の一部として認識されている。", // Expanded description - 拡張された説明
    tags: ["tech", "search-engine", "cloud-computing", "advertising", "innovation", "transparency", "user-focus", "data-driven", "employee-wellbeing", "openness", "ethics", "code-of-conduct", "historical", "do-the-right-thing", "integrity", "corporate-responsibility"],
    color: "#4285F4",
  },
  // Microsoft Specific Values (ID 74-79) - Microsoftの具体的な価値観
  {
    id: 74, // Was ID 49
    companyName: "Microsoft",
    slogan: "Growth Mindset",
    slogan_ja: "グロースマインドセット",
    description: "能力は固定されたものではなく、努力や学習を通じて伸ばすことができるという信念。挑戦を受け入れ、失敗から学び、他者の成功からもインスピレーションを得る、継続的な学習と成長の姿勢を重視する。", // Expanded description - 拡張された説明
    tags: ["tech", "software", "cloud-computing", "empowerment", "growth-mindset", "collaboration", "diversity-inclusion", "customer-obsession", "accountability", "integrity", "learning", "challenge", "resilience", "continuous-improvement", "potential"],
    color: "#00A4EF",
  },
  {
    id: 75, // Was ID 50
    companyName: "Microsoft",
    slogan: "Customer Obsession",
    slogan_ja: "顧客へのこだわり",
    description: "顧客のニーズや課題を深く理解し、その成功を自社の成功の中心に据える姿勢。顧客の声に耳を傾け、共感し、期待を超える価値を提供することに情熱を注ぐ。", // Expanded description - 拡張された説明
    tags: ["tech", "software", "cloud-computing", "empowerment", "growth-mindset", "collaboration", "diversity-inclusion", "customer-obsession", "accountability", "integrity", "customer-focus", "empathy", "value-creation", "customer-success", "listening"],
    color: "#00A4EF",
  },
  {
    id: 76, // Was ID 51
    companyName: "Microsoft",
    slogan: "Diversity & Inclusion",
    slogan_ja: "多様性とインクルージョン",
    description: "多様なバックグラウンド、経験、視点を持つ人々を積極的に受け入れ、尊重する。すべての従業員が自分らしく、安心して貢献でき、成長できるインクルーシブな環境を構築することにコミットする。", // Expanded description - 拡張された説明
    tags: ["tech", "software", "cloud-computing", "empowerment", "growth-mindset", "collaboration", "diversity-inclusion", "customer-obsession", "accountability", "integrity", "equity", "belonging", "respect", "representation", "psychological-safety"],
    color: "#00A4EF",
  },
  {
    id: 77, // Was ID 52
    companyName: "Microsoft",
    slogan: "One Microsoft",
    slogan_ja: "One Microsoft",
    description: "個々のチームや部門の壁を越えて、会社全体として協力し、知識やリソースを共有し、共通の目標に向かって一丸となる精神。サイロ化を防ぎ、相乗効果を生み出すことを目指す。", // Expanded description - 拡張された説明
    tags: ["tech", "software", "cloud-computing", "empowerment", "growth-mindset", "collaboration", "diversity-inclusion", "customer-obsession", "accountability", "integrity", "teamwork", "synergy", "unity", "knowledge-sharing", "cross-functional"],
    color: "#00A4EF",
  },
  {
    id: 78, // Was ID 53
    companyName: "Microsoft",
    slogan: "Accountability",
    slogan_ja: "説明責任",
    description: "自らの行動、決定、そしてその結果に対して責任を持つこと。約束を果たし、期待に応え、間違いがあればそれを認め、修正する誠実さとオーナーシップを重視する。", // Expanded description - 拡張された説明
    tags: ["tech", "software", "cloud-computing", "empowerment", "growth-mindset", "collaboration", "diversity-inclusion", "customer-obsession", "accountability", "integrity", "ownership", "responsibility", "results", "commitment", "reliability"],
    color: "#00A4EF",
  },
  {
    id: 79, // Was ID 54
    companyName: "Microsoft",
    slogan: "Integrity",
    slogan_ja: "誠実さ",
    description: "常に高い倫理基準に基づき、正直かつ公正に行動すること。信頼をすべての活動の基盤とし、顧客、パートナー、社会に対して透明性を持って責任ある行動をとる。", // Expanded description - 拡張された説明
    tags: ["tech", "software", "cloud-computing", "empowerment", "growth-mindset", "collaboration", "diversity-inclusion", "customer-obsession", "accountability", "integrity", "ethics", "honesty", "trust", "fairness", "transparency", "corporate-responsibility"],
    color: "#00A4EF",
  },
  // Salesforce Specific Values (ID 80-84) - Salesforceの具体的な価値観
  {
    id: 80, // Was ID 55
    companyName: "Salesforce",
    slogan: "Trust",
    slogan_ja: "信頼",
    description: "信頼を最も重要な価値と位置づけ、顧客、従業員、パートナー、コミュニティとのすべての関係において、透明性、セキュリティ、コンプライアンス、プライバシー、信頼性を最優先する。", // Expanded description - 拡張された説明
    tags: ["tech", "crm", "cloud-computing", "customer-success", "innovation", "trust", "equality", "sustainability", "community", "philanthropy", "core-values", "relationships", "integrity", "security", "transparency", "reliability"],
    color: "#00A1E0",
  },
  {
    id: 81, // Was ID 56
    companyName: "Salesforce",
    slogan: "Customer Success",
    slogan_ja: "顧客の成功",
    description: "自社の成功は顧客の成功によって測られるという考え方。顧客の目標達成を支援することに全力を尽くし、単なる製品提供者ではなく、長期的なパートナーとして価値を共創する。", // Expanded description - 拡張された説明
    tags: ["tech", "crm", "cloud-computing", "customer-success", "innovation", "trust", "equality", "sustainability", "community", "philanthropy", "core-values", "customer-focus", "partnership", "value-creation", "long-term-relationship", "support"],
    color: "#00A1E0",
  },
  {
    id: 82, // Was ID 57
    companyName: "Salesforce",
    slogan: "Innovation",
    slogan_ja: "イノベーション",
    description: "テクノロジーの力を信じ、常に新しい技術やアイデアを追求し、業界をリードするソリューションを提供する。顧客の未来のニーズを予測し、継続的な改善と画期的な製品開発を通じて、変革を推進する。", // Expanded description - 拡張された説明
    tags: ["tech", "crm", "cloud-computing", "customer-success", "innovation", "trust", "equality", "sustainability", "community", "philanthropy", "core-values", "technology", "creativity", "leadership", "R&D", "future-focus", "disruption"],
    color: "#00A1E0",
  },
  {
    id: 83, // Was ID 58
    companyName: "Salesforce",
    slogan: "Equality",
    slogan_ja: "平等",
    description: "すべての人々が平等な権利、機会、扱いを受けるべきであるという信念。職場、コミュニティ、社会全体において、多様性を尊重し、インクルージョンを推進し、あらゆる形態の差別と闘うことにコミットする。", // Expanded description - 拡張された説明
    tags: ["tech", "crm", "cloud-computing", "customer-success", "innovation", "trust", "equality", "sustainability", "community", "philanthropy", "core-values", "diversity", "inclusion", "social-justice", "advocacy", "equal-opportunity", "human-rights"],
    color: "#00A1E0",
  },
  {
    id: 84, // Was ID 59
    companyName: "Salesforce",
    slogan: "Sustainability",
    slogan_ja: "持続可能性",
    description: "地球環境と社会に対する責任を認識し、事業活動を通じてポジティブな影響を与えることを目指す。環境負荷の低減、再生可能エネルギーの利用、社会貢献活動（1-1-1モデル）などを通じて、持続可能な未来の実現に貢献する。", // Expanded description - 拡張された説明
    tags: ["tech", "crm", "cloud-computing", "customer-success", "innovation", "trust", "equality", "sustainability", "community", "philanthropy", "core-values", "environment", "social-responsibility", "csr", "future-focus", "climate-action", "1-1-1-model"],
    color: "#00A1E0",
  },
  // Adobe Specific Values (ID 85-88) - Adobeの具体的な価値観
  {
    id: 85, // Was ID 60
    companyName: "Adobe",
    slogan: "Genuine",
    slogan_ja: "Genuine", // Kept English as per source, though Japanese was 誠実
    description: "誠実、正直、オープンであり、信頼できる行動をとることを重視する。自分自身や他者に対して真摯であり、透明性を持ってコミュニケーションを行い、倫理的な原則に基づいて行動する。", // Expanded description - 拡張された説明
    tags: ["tech", "software", "creativity", "design", "digital-marketing", "innovation", "collaboration", "employee-growth", "diversity-inclusion", "integrity", "core-values", "genuine", "honesty", "openness", "trustworthiness", "authenticity", "ethics", "transparency"],
    color: "#FF0000",
  },
  {
    id: 86, // Was ID 61
    companyName: "Adobe",
    slogan: "Exceptional",
    slogan_ja: "Exceptional", // Kept English as per source, though Japanese was 卓越
    description: "常に卓越性を追求し、高い基準を設定し、最高の結果を目指す。製品、サービス、そして従業員のパフォーマンスにおいて、期待を超える品質とインパクトを提供することにコミットする。", // Expanded description - 拡張された説明
    tags: ["tech", "software", "creativity", "design", "digital-marketing", "innovation", "collaboration", "employee-growth", "diversity-inclusion", "integrity", "core-values", "exceptional", "excellence", "high-standards", "results-oriented", "quality", "impact", "performance"],
    color: "#FF0000",
  },
  {
    id: 87, // Was ID 62
    companyName: "Adobe",
    slogan: "Innovative",
    slogan_ja: "Innovative", // Kept English as per source, though Japanese was 革新的
    description: "創造性を奨励し、現状に挑戦し、新しいアイデアやソリューションを生み出すことを重視する。テクノロジーとデザインの力を活用し、デジタル体験の未来を形作り、世界を変えるようなイノベーションを追求する。", // Expanded description - 拡張された説明
    tags: ["tech", "software", "creativity", "design", "digital-marketing", "innovation", "collaboration", "employee-growth", "diversity-inclusion", "integrity", "core-values", "innovative", "creativity", "ideas", "solutions", "problem-solving", "technology", "future-shaping"],
    color: "#FF0000",
  },
  {
    id: 88, // Was ID 63
    companyName: "Adobe",
    slogan: "Involved",
    slogan_ja: "Involved", // Kept English as per source, though Japanese was 貢献
    description: "顧客、コミュニティ、そして互いに対して積極的に関与し、貢献することを重視する。従業員が情熱を持って仕事に取り組み、チームとして協力し、社会全体に対してポジティブな影響を与えることを奨励する。", // Expanded description - 拡張された説明
    tags: ["tech", "software", "creativity", "design", "digital-marketing", "innovation", "collaboration", "employee-growth", "diversity-inclusion", "integrity", "core-values", "involved", "engagement", "contribution", "community", "customer-focus", "teamwork", "social-impact", "passion"],
    color: "#FF0000",
  },
  // Southwest Airlines Specific Values (ID 89-91) - サウスウエスト航空の具体的な価値観
  {
    id: 89, // Was ID 64
    companyName: "サウスウエスト航空",
    slogan: "Warrior Spirit",
    slogan_ja: "Warrior Spirit", // Kept English as per source, though Japanese was 戦士の精神
    description: "目標達成に向けた強い意志、粘り強さ、そして卓越性への欲求。困難に立ち向かい、常にベストを尽くし、期待される以上の成果を出すために努力する姿勢。", // Expanded description - 拡張された説明
    tags: ["airline", "employee-first", "customer-service", "fun-loving attitude", "low-cost", "hospitality", "union", "core-values", "warrior-spirit", "determination", "effort", "goal-oriented", "perseverance", "excellence", "drive", "resilience"],
    color: "#2C4299",
  },
  {
    id: 90, // Was ID 65
    companyName: "サウスウエスト航空",
    slogan: "Servant's Heart",
    slogan_ja: "Servant's Heart", // Kept English as per source, though Japanese was 奉仕の心
    description: "他者（顧客、同僚、コミュニティ）のニーズを優先し、思いやりと敬意を持ってサポートする姿勢。相手の立場に立って考え、温かいおもてなしを提供し、人々のために尽くすことを喜びとする心。", // Expanded description - 拡張された説明
    tags: ["airline", "employee-first", "customer-service", "fun-loving attitude", "low-cost", "hospitality", "union", "core-values", "servant-heart", "service", "care", "support", "empathy", "respect", "other-focus", "hospitality"],
    color: "#2C4299",
  },
  {
    id: 91, // Was ID 66
    companyName: "サウスウエスト航空",
    slogan: "Fun-LUVing Attitude",
    slogan_ja: "Fun-LUVing Attitude", // Kept English as per source, though Japanese was 楽しむ姿勢
    description: "仕事に楽しさ、情熱、そしてポジティブなエネルギーをもたらす姿勢。ユーモアを大切にし、職場を明るくし、深刻になりすぎず、人生と仕事を最大限に楽しむことを奨励する（LUVは同社のティッカーシンボルでもある）。", // Expanded description - 拡張された説明
    tags: ["airline", "employee-first", "customer-service", "fun-loving attitude", "low-cost", "hospitality", "union", "core-values", "fun", "positivity", "energy", "enjoyment", "luv", "passion", "humor", "positive-workplace"],
    color: "#2C4299",
  },
  // Costco Specific Values (ID 92-95) - コストコの具体的な価値観 (Code of Ethics)
  {
    id: 92, // Was ID 67
    companyName: "コストコホールセール",
    slogan: "Obey the law",
    slogan_ja: "法を遵守する",
    description: "事業を展開するすべての国や地域において、適用されるすべての法律、規則、規制を完全に遵守すること。これは倫理的な事業運営の基盤であり、譲れない原則である。", // Expanded description - 拡張された説明
    tags: ["retail", "membership", "low-price", "high-quality", "employee-care", "code-of-ethics", "efficiency", "core-values", "legal-compliance", "ethics", "integrity", "regulation", "governance"],
    color: "#E32A36",
  },
  {
    id: 93, // Was ID 68
    companyName: "コストコホールセール",
    slogan: "Take care of our members",
    slogan_ja: "会員の世話をする",
    description: "会員に対して、可能な限り最低価格で最高品質の商品とサービスを提供することにコミットする。会員の満足度を最優先し、信頼に応え、長期的な価値を提供し続ける。", // Expanded description - 拡張された説明
    tags: ["retail", "membership", "low-price", "high-quality", "employee-care", "code-of-ethics", "efficiency", "core-values", "member-focus", "customer-service", "value", "satisfaction", "quality-assurance", "pricing-strategy"],
    color: "#E32A36",
  },
  {
    id: 94, // Was ID 69
    companyName: "コストコホールセール",
    slogan: "Take care of our employees",
    slogan_ja: "従業員の世話をする",
    description: "従業員に対して、競争力のある賃金と包括的な福利厚生を提供し、安全で健全な職場環境を維持する。キャリア成長の機会を提供し、従業員を尊重し、公正に扱うことにコミットする。", // Expanded description - 拡張された説明
    tags: ["retail", "membership", "low-price", "high-quality", "employee-care", "code-of-ethics", "efficiency", "core-values", "employee-wellbeing", "fair-wages", "benefits", "career-development", "workplace-safety", "respect", "fairness"],
    color: "#E32A36",
  },
  {
    id: 95, // Was ID 70
    companyName: "コストコホールセール",
    slogan: "Respect our suppliers",
    slogan_ja: "サプライヤーを尊重する",
    description: "サプライヤーとの間に、誠実さ、公正さ、敬意に基づいた長期的かつ健全な関係を築く。サプライヤーを重要なパートナーとみなし、共に成長し、会員に価値を提供するために協力する。", // Expanded description - 拡張された説明
    tags: ["retail", "membership", "low-price", "high-quality", "employee-care", "code-of-ethics", "efficiency", "core-values", "supplier-relations", "respect", "fair-trade", "partnership", "integrity", "collaboration", "long-term-relationship"],
    color: "#E32A36",
  },
  // Toyota Specific Values (ID 96-100) - トヨタの具体的な価値観 (TPS Pillars/Values)
  {
    id: 96, // Was ID 71
    companyName: "トヨタ自動車",
    slogan: "Kaizen (Continuous Improvement)",
    slogan_ja: "カイゼン",
    description: "現状に満足せず、常にプロセス、製品、働き方をより良くしようと改善し続ける精神。小さな改善の積み重ねが大きな進歩につながると信じ、全員参加で問題解決と効率化に取り組む。", // Expanded description - 拡張された説明
    tags: ["automotive", "manufacturing", "quality", "kaizen", "continuous-improvement", "long-term-focus", "respect-for-people", "customer-first", "societal-contribution", "lean-manufacturing", "TPS", "core-values", "efficiency", "problem-solving", "employee-involvement", "waste-reduction"],
    color: "#EB0A1E",
  },
  {
    id: 97, // Was ID 72
    companyName: "トヨタ自動車",
    slogan: "Respect for People",
    slogan_ja: "人間性尊重",
    description: "従業員、サプライヤー、顧客、地域社会など、関わるすべての人々を尊重し、信頼関係を築くこと。多様な価値観を認め合い、チームワークを通じて個人の能力と全体の力を最大限に引き出す。", // Expanded description - 拡張された説明
    tags: ["automotive", "manufacturing", "quality", "kaizen", "continuous-improvement", "long-term-focus", "respect-for-people", "customer-first", "societal-contribution", "lean-manufacturing", "TPS", "core-values", "teamwork", "collaboration", "dignity", "trust", "stakeholder-relations", "diversity"],
    color: "#EB0A1E",
  },
  {
    id: 98, // Was ID 73
    companyName: "トヨタ自動車",
    slogan: "Genchi Genbutsu (Go and see)",
    slogan_ja: "現地現物",
    description: "問題や状況を理解するためには、机上の空論ではなく、実際に現場に足を運び、自分の目で見て、現物に触れて事実を確認すること。これにより、本質的な原因を把握し、的確な判断と解決策を見出す。", // Expanded description - 拡張された説明
    tags: ["automotive", "manufacturing", "quality", "kaizen", "continuous-improvement", "long-term-focus", "respect-for-people", "customer-first", "societal-contribution", "lean-manufacturing", "TPS", "core-values", "genchi-genbutsu", "fact-based", "problem-solving", "observation", "root-cause-analysis", "decision-making"],
    color: "#EB0A1E",
  },
  {
    id: 99, // Was ID 74
    companyName: "トヨタ自動車",
    slogan: "Challenge",
    slogan_ja: "チャレンジ",
    description: "現状維持を良しとせず、常に高い目標を設定し、それを達成するために勇気と創造性を持って挑戦し続ける精神。失敗を恐れずに新しいことに取り組み、限界を突破しようとする意欲。", // Expanded description - 拡張された説明
    tags: ["automotive", "manufacturing", "quality", "kaizen", "continuous-improvement", "long-term-focus", "respect-for-people", "customer-first", "societal-contribution", "lean-manufacturing", "TPS", "core-values", "challenge", "ambition", "innovation", "perseverance", "courage", "creativity", "goal-setting"],
    color: "#EB0A1E",
  },
  {
    id: 100, // Was ID 75
    companyName: "トヨタ自動車",
    slogan: "Teamwork",
    slogan_ja: "チームワーク",
    description: "個人の能力を結集し、共通の目標に向かって協力し合うこと。互いに信頼し、助け合い、知識や経験を共有することで、個人だけでは達成できない大きな成果を生み出す。", // Expanded description - 拡張された説明
    tags: ["automotive", "manufacturing", "quality", "kaizen", "continuous-improvement", "long-term-focus", "respect-for-people", "customer-first", "societal-contribution", "lean-manufacturing", "TPS", "core-values", "teamwork", "collaboration", "synergy", "shared-goals", "mutual-trust", "knowledge-sharing"],
    color: "#EB0A1E",
  },
  // Sony Specific Values (ID 101-104) - ソニーの具体的な価値観 (Sony's Purpose & Values)
  {
    id: 101, // Was ID 76
    companyName: "ソニー",
    slogan: "Dreams & Curiosity",
    slogan_ja: "夢と好奇心",
    description: "未来への夢を描き、未知の世界を探求する好奇心を原動力として、新しい価値創造に挑戦する精神。既成概念にとらわれず、自由な発想でイノベーションを生み出すことを奨励する。", // Expanded description - 拡張された説明
    tags: ["electronics", "entertainment", "gaming", "music", "movies", "technology", "innovation", "creativity", "kando", "diversity", "R&D", "core-values", "dreams", "curiosity", "exploration", "imagination", "pioneering-spirit", "value-creation"],
    color: "#000000",
  },
  {
    id: 102, // Was ID 77
    companyName: "ソニー",
    slogan: "Diversity",
    slogan_ja: "多様性",
    description: "性別、人種、国籍、信条、障がいの有無などに関わらず、多様なバックグラウンドや価値観を持つ人材を受け入れ、尊重すること。異なる視点の融合が、新たなアイデアやイノベーションを生み出す源泉となると考える。", // Expanded description - 拡張された説明
    tags: ["electronics", "entertainment", "gaming", "music", "movies", "technology", "innovation", "creativity", "kando", "diversity", "R&D", "core-values", "inclusion", "perspective", "respect", "global", "equity", "collaboration"],
    color: "#000000",
  },
  {
    id: 103, // Was ID 78
    companyName: "ソニー",
    slogan: "Integrity & Sincerity",
    slogan_ja: "高潔さと誠実さ",
    description: "倫理的で公正な行動規範に基づき、すべての事業活動において誠実であること。社会やステークホルダーからの信頼を得て維持するために、透明性を持って責任ある行動をとる。", // Expanded description - 拡張された説明
    tags: ["electronics", "entertainment", "gaming", "music", "movies", "technology", "innovation", "creativity", "kando", "diversity", "R&D", "core-values", "integrity", "sincerity", "ethics", "responsibility", "trustworthiness", "fairness", "transparency", "compliance"],
    color: "#000000",
  },
  {
    id: 104, // Was ID 79
    companyName: "ソニー",
    slogan: "Sustainability",
    slogan_ja: "持続可能性",
    description: "事業活動を通じて、地球環境の保全とより良い社会の実現に貢献すること。長期的な視点を持ち、環境負荷の低減、人権の尊重、サプライチェーン管理など、持続可能な成長を目指す。", // Expanded description - 拡張された説明
    tags: ["electronics", "entertainment", "gaming", "music", "movies", "technology", "innovation", "creativity", "kando", "diversity", "R&D", "core-values", "sustainability", "csr", "environment", "social-impact", "long-term-vision", "human-rights", "supply-chain-responsibility", "stakeholder-engagement"],
    color: "#000000",
  },
  // Nintendo Specific Value (ID 105) - 任天堂の具体的な価値観
  {
    id: 105, // Was ID 80
    companyName: "任天堂",
    slogan: "Originality / Uniqueness",
    slogan_ja: "独創",
    description: "他社の模倣や追随をせず、独自のアイデアとアプローチによって、これまでにない「面白い体験」を創造するという任天堂の根幹をなす精神。リスクを恐れず、誰も考えつかなかったような新しい娯楽の形を追求する。", // Expanded description - 拡張された説明
    tags: ["gaming", "entertainment", "consumer-electronics", "creativity", "innovation", "fun", "originality", "intellectual-property", "user-experience", "family-friendly", "quality", "long-term-focus", "core-value", "uniqueness", "differentiation", "pioneering", "risk-taking", "entertainment-philosophy"],
    color: "#E60012",
  }
];

// Example usage (optional, to verify the changes)
// 使用例（任意、変更を確認するため）
// cultureCodes.forEach(code => {
//   if (code.id >= 22) {
//     console.log(`ID: ${code.id}, Company: ${code.companyName}, Description: ${code.description}`);
//   }
// });

// Get all unique tags from the combined culture codes
// 統合されたカルチャーコードからすべてのユニークなタグを取得します
const allTags = Array.from(new Set(cultureCodes.flatMap((code) => code.tags))).sort();

// Group tags by category based on the combined list
// Note: Categorization can be subjective and adjusted as needed.
// 統合されたリストに基づいてタグをカテゴリ別にグループ化します
// 注：カテゴリ分類は主観的なものであり、必要に応じて調整できます。
const tagCategories = {
  industry: [
    "advertising",
    "airline",
    "animation",
    "apparel",
    "automotive", // Added from Toyota
    "cloud-computing",
    "conglomerate",
    "consumer-electronics",
    "crm",
    "digital-marketing",
    "e-commerce",
    "electronics", // Added from Sony
    "entertainment",
    "fashion", // Added from Fast Retailing
    "food", // Added from Muji
    "food-beverage",
    "gaming", // Added from Sony, Nintendo
    "hardware",
    "hospitality",
    "household-goods", // Added from Muji
    "imaging", // Added from Sony
    "lifestyle", // Added from Muji
    "manufacturing", // Added from Toyota
    "marketing",
    "membership",
    "movies", // Added from Sony
    "music", // Added from Sony
    "retail",
    "search-engine",
    "semiconductor", // Added from Sony
    "social-media",
    "software",
    "sports",
    "startup",
    "tech",
    "technology",
    "travel",
  ],
  values: [
    "accessibility",
    "accountability",
    "activism",
    "anti-brand", // Added from Muji
    "authenticity",
    "autonomy",
    "belonging",
    "candor",
    "code-of-ethics",
    "company-values",
    "continuous-improvement", // Added from Toyota
    "cooperative",
    "core-values",
    "corporate-responsibility",
    "craftsmanship",
    "creativity",
    "customer-centric", // Added from Fast Retailing
    "customer-first", // Added from Toyota
    "decision-making",
    "diversity", // Added from Sony
    "eco-friendly", // Added from Muji
    "employee-care",
    "employee-first",
    "employee-freedom",
    "empowerment",
    "environment",
    "environmental-protection",
    "equality",
    "equity",
    "excellence",
    "family-friendly", // Added from Nintendo
    "frugality",
    "fun",
    "fun-loving attitude",
    "global-standards", // Added from Fast Retailing
    "happiness",
    "high-performance",
    "high-quality",
    "high-standards",
    "honesty",
    "humble",
    "integrity",
    "intellectual-property", // Added from Nintendo
    "just-do-it",
    "kaizen", // Added from Toyota
    "kando", // Added from Sony
    "lean-manufacturing", // Added from Toyota
    "LifeWear", // Added from Fast Retailing
    "low-cost",
    "low-price",
    "minimalism", // Added from Muji
    "mission-driven",
    "mobility", // Added from Toyota
    "natural", // Added from Muji
    "no-bullshit",
    "openness",
    "originality", // Added from Nintendo
    "ownership",
    "perseverance",
    "philanthropy",
    "play-as-a-team",
    "privacy",
    "psychological-safety",
    "purpose-driven",
    "quality",
    "R&D", // Added from Sony
    "remarkable",
    "respect-for-people", // Added from Toyota
    "responsibility",
    "science",
    "simplicity",
    "societal-contribution", // Added from Toyota
    "spa-model", // Added from Fast Retailing
    "stakeholder-focus",
    "sustainability",
    "talent-density",
    "TPS", // Added from Toyota
    "transparency",
    "trust",
    "universality", // Added from Muji
    "weirdness",
  ],
  focus: [
    "adaptability",
    "bias-for-action",
    "co-creation",
    "collaboration",
    "community",
    "competition",
    "corporate-culture",
    "culture-code",
    "customer-obsession",
    "customer-service",
    "customer-success",
    "data-driven",
    "design",
    "digital-experience",
    "diversity-inclusion",
    "efficiency",
    "employee-benefits",
    "employee-centric",
    "employee-empowerment",
    "employee-growth",
    "employee-wellbeing",
    "empathy",
    "execution", // Added from Fast Retailing
    "global", // Added from Fast Retailing
    "goal-achievement",
    "growth",
    "growth-mindset",
    "human-connection",
    "inbound-marketing",
    "inclusion",
    "innovation",
    "inspiration",
    "local-experience",
    "long-term-focus", // Added from Toyota, Nintendo
    "long-term-thinking",
    "mindfulness",
    "open-communication",
    "open-salaries",
    "operational-excellence",
    "outdoor",
    "performance",
    "productivity",
    "project-management",
    "remote-work",
    "shared-economy",
    "supply-chain", // Added from Toyota
    "teamwork",
    "third-place",
    "union",
    "user-experience", // Added from Nintendo
    "user-focus",
    "work-life-balance",
    "wow-experience",
  ],
};

// --- Helper Function to Shuffle Array (Fisher-Yates Algorithm) ---
// 配列をシャッフルするヘルパー関数 (Fisher-Yatesアルゴリズム)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]; // 元の配列を変更しないようにコピーを作成
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 要素を入れ替え
  }
  return shuffled;
}


interface CultureCodeCardProps {
  cultureCode: CultureCode
}

const CultureCodeCard: React.FC<CultureCodeCardProps> = ({ cultureCode }) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Color indicator bar */}
      <div className="h-2 w-full" style={{ backgroundColor: cultureCode.color }}></div>

      <div className="flex flex-1 flex-col p-5">
        {/* Company Name */}
        <h2 className="mb-2 text-xl font-semibold text-gray-800">{cultureCode.companyName}</h2>

        {/* Slogans */}
        <div className="mb-3">
          {/* Japanese Slogan (Prominent) */}
          <p className="text-lg font-bold text-gray-900">{cultureCode.slogan_ja}</p>
          {/* English Slogan (Subtle) */}
          <p className="text-xs text-gray-500">{cultureCode.slogan}</p>
        </div>

        {/* Description */}
        <p className="mb-4 flex-grow text-sm text-gray-600">{cultureCode.description}</p>

        {/* Tags */}
        <div className="mt-auto flex flex-wrap gap-2">
          {cultureCode.tags.slice(0, 5).map((tag) => ( // Show up to 5 tags
            <BadgeComponent key={tag} variant="outline" className="border-purple-200 bg-purple-50 text-purple-700">
              #{tag}
            </BadgeComponent>
          ))}
          {cultureCode.tags.length > 5 && (
             <BadgeComponent variant="outline" className="border-gray-200 bg-gray-50 text-gray-500">
              + {cultureCode.tags.length - 5} more
            </BadgeComponent>
          )}
        </div>
      </div>
    </div>
  )
}

// --- Main List Component ---
export default function CultureCodeList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  // State to hold the shuffled culture codes
  // シャッフルされたカルチャーコードを保持するState
  const [shuffledCodes, setShuffledCodes] = useState<CultureCode[]>([])

  // Shuffle the culture codes once on component mount
  // コンポーネントのマウント時にカルチャーコードを一度だけシャッフルする
  useEffect(() => {
    setShuffledCodes(shuffleArray(cultureCodes));
  }, []); // Empty dependency array ensures this runs only once

  // Filter culture codes based on search term (company, slogans, description) and selected tags
  // ** Use shuffledCodes as the source **
  // 検索語 (会社名、スローガン、説明) と選択されたタグに基づいてカルチャーコードをフィルタリングする
  // ** ソースとして shuffledCodes を使用する **
  const filteredCodes = shuffledCodes.filter((code) => {
    const lowerSearchTerm = searchTerm.toLowerCase()
    const matchesSearch =
      code.companyName.toLowerCase().includes(lowerSearchTerm) ||
      code.slogan.toLowerCase().includes(lowerSearchTerm) || // Search English slogan
      code.slogan_ja.toLowerCase().includes(lowerSearchTerm) || // Search Japanese slogan
      code.description.toLowerCase().includes(lowerSearchTerm)

    const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => code.tags.includes(tag)) // Changed to 'every' for stricter filtering

    return matchesSearch && matchesTags
  })

  // Function to toggle a tag selection
  // タグ選択を切り替える関数
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-6 lg:p-8">
      {/* Search and filter section */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <InputComponent // Use the determined Input component
            type="text"
            placeholder="会社名、スローガン、説明で検索..."
            className="border-0 bg-gray-50 pl-10 text-base shadow-none ring-offset-0 focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:ring-offset-0 md:text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Toggle and Clear */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-50 hover:text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "フィルターを隠す" : "フィルターを表示"}
          </button>

          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="rounded-md px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              フィルターをクリア ({selectedTags.length})
            </button>
          )}
        </div>

        {/* Filter Options Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: "1rem" }} // Add margin when shown
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t pt-4" // Removed mt-4 here, added conditionally via animate
            >
              {Object.entries(tagCategories).map(([category, tags]) => (
                <div key={category} className="mb-4">
                  <h3 className="mb-2 text-sm font-semibold capitalize text-gray-700">{category}:</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <BadgeComponent // Use the determined Badge component
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer rounded-full px-3 py-1 text-xs transition-all ${
                          selectedTags.includes(tag)
                            ? "border-purple-600 bg-purple-600 text-white hover:bg-purple-700"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        #{tag}
                      </BadgeComponent>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results count - Use shuffledCodes.length for the total count */}
      {/* 結果件数 - 総数には shuffledCodes.length を使用 */}
      <div className="text-sm text-gray-600">
        {shuffledCodes.length} 件中 {filteredCodes.length} 件のカルチャーコードを表示中
      </div>

      {/* Culture codes grid - Map over filteredCodes */}
      {/* カルチャーコードグリッド - filteredCodes をマップする */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredCodes.map((code, index) => (
            <motion.div
              key={code.id} // Keep using id as the key for stability
              layout // Add layout animation for smooth reordering
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }} // Stagger animation slightly
            >
              <CultureCodeCard cultureCode={code} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filteredCodes.length === 0 && (searchTerm || selectedTags.length > 0) && ( // Show if filtering resulted in empty list
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 rounded-lg border border-dashed border-gray-300 p-12 text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mb-1 text-lg font-medium text-gray-900">カルチャーコードが見つかりません</h3>
          <p className="text-gray-500">検索語句やフィルター条件を変更してみてください。</p>
        </motion.div>
      )}
    </div>
  )
}