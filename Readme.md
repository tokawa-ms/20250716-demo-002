# 🤖 マルチエージェントチャットシステム

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Azure OpenAI](https://img.shields.io/badge/Azure_OpenAI-412991?style=flat&logo=microsoft&logoColor=white)](https://azure.microsoft.com/services/cognitive-services/openai-service/)

> **Azure OpenAI** を使用したマルチエージェントチャットシステム - ロボットアニメ風指令室で3つのエージェントが多角的な分析を提供

## 🎯 システム概要

このシステムは Azure OpenAI を活用したマルチエージェントチャットシステムです。3つの異なる性格・視点を持つエージェントがユーザーの質問に対して多角的な分析を行い、最終的にオーガナイザーが統合的な判断を提供します。

### 🚀 **[🎮 マルチエージェント指令室を起動する](src/index.html)**

### ✨ 主な特徴

- 🤖 **3つの独特なエージェント** - 感情的女性、論理的科学者、心配する母親
- 🎯 **統合分析システム** - オーガナイザーによる多数決ベースの最終判断
- 🎨 **ロボットアニメ風UI** - サイバーパンクテイストの指令室デザイン
- ⚡ **リアルタイム処理** - 並行処理による高速レスポンス
- 📱 **完全レスポンシブ** - あらゆるデバイスに対応
- 🔒 **セキュア設定** - ローカル環境でのAPI設定管理

## 🎭 エージェント紹介

| エージェント | 役割 | 視点 | 特徴 |
|-------------|------|------|------|
| 💕 **カスパー** | 恋に溺れる感情的女性 | ロマンチック・感情重視 | 恋愛経験や感情を重視した判断 |
| 🔬 **メルキオール** | 論理的女性科学者 | 科学的根拠・データ重視 | 統計や研究結果に基づく客観的判断 |
| 👩‍👦 **バルタザール** | 心配する母親 | 息子の安全・幸せ重視 | 子供の健康と将来を最優先した保護的判断 |
| 🎯 **オーガナイザー** | 統合分析システム | 多数決ベース | 全エージェントの意見を統合し最終判断 |

## 🛠️ 技術スタック

### フロントエンド

| 技術                                     | バージョン | 用途                         |
| ---------------------------------------- | ---------- | ---------------------------- |
| HTML5                                    | Latest     | セマンティックなマークアップ |
| CSS3                                     | Latest     | スタイリング                 |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x (CDN)  | ユーティリティファースト CSS |
| JavaScript                               | ES6+       | インタラクティブな機能       |

### API・バックエンド

| 技術                                     | バージョン | 用途                         |
| ---------------------------------------- | ---------- | ---------------------------- |
| [Azure OpenAI](https://azure.microsoft.com/services/cognitive-services/openai-service/) | API v2024-02-15-preview | エージェント AI システム |
| Chat Completions API | Latest | 自然言語処理・応答生成 |

### 開発ツール

- **GitHub Copilot** - AI ペアプログラミング
- **GitHub Coding Agent** - 自動コード生成
- **Visual Studio Code** - 推奨 IDE

## 📁 プロジェクト構造

```
📦 20250716-demo-002/
├── 📄 README.md                    # プロジェクト概要
├── 📄 .github/
│   └── 📄 copilot-instructions.md  # Copilot 設定
├── 📁 src/                         # アプリケーションソース
│   ├── 📄 index.html              # マルチエージェント指令室
│   ├── 📁 css/                    # スタイルシート
│   │   └── 📄 styles.css          # ロボットアニメ風カスタムCSS
│   └── 📁 js/                     # JavaScript
│       └── 📄 script.js           # エージェントシステムロジック
└── 📁 docs/                       # ドキュメント
    ├── 📄 specification.md        # システム仕様書
    └── 📄 implementation.md       # 実装ガイド
```

## 🚀 クイックスタート

### 前提条件

- 📌 モダンな Web ブラウザ (Chrome 90+, Firefox 88+, Safari 14+)
- 📌 Azure OpenAI リソース（デプロイ済みモデル）
- 📌 有効な Azure OpenAI API キー

### 使用方法

#### 🎮 指令室システムの起動

1. **[🚀 マルチエージェント指令室を開く](src/index.html)**

2. **Azure OpenAI 設定**
   ```
   エンドポイント URL: https://your-resource.openai.azure.com/
   API キー: [Azure ポータルから取得したキー]
   デプロイメント名: gpt-4o (または使用するモデル名)
   ```

3. **質問の実行**
   - 質問テキストエリアに質問を入力
   - 「エージェント分析開始」ボタンをクリック
   - 各エージェントの分析結果を確認

#### 💡 質問例

```
「残業を月100時間することについてどう思いますか？」
「リモートワークを導入すべきでしょうか？」
「副業を始めることについてどう考えますか？」
「転職を検討していますが、どう思いますか？」
```

### 🎯 分析結果の見方

1. **各エージェントの意見**: 3つの異なる視点からの賛成・反対とその理由
2. **オーガナイザーの統合分析**: 多数決に基づく最終的な判断と要約
3. **文字数制限**: エージェント（1000文字）、オーガナイザー（3000文字）
4. **リアルタイム状態**: 各エージェントの処理状況をリアルタイム表示

## 🎨 UI/UX 設計

### ロボットアニメ風指令室デザイン

- **🌃 ダークテーマ**: サイバーパンクな世界観
- **✨ グロー効果**: 各パネルと要素の光る境界線
- **🎯 カラーコーディング**: エージェント別の専用カラー
- **📱 レスポンシブ**: モバイル・タブレット・デスクトップ完全対応

### エージェント専用カラー

- 💕 **カスパー**: ピンク (#EC4899) - 感情的・ロマンチック
- 🔬 **メルキオール**: サイバーブルー (#00F5FF) - 科学的・論理的  
- 👩‍👦 **バルタザール**: サイバーグリーン (#39FF14) - 保護的・母性的
- 🎯 **オーガナイザー**: サイバーパープル (#8A2BE2) - 統合・判断

## 📊 システム仕様

### 文字数制限
- **各エージェント**: 最大 1,000文字
- **オーガナイザー**: 最大 3,000文字
- **リアルタイム文字数カウント表示**

### Azure OpenAI 設定
- **APIバージョン**: 2024-02-15-preview
- **推奨モデル**: GPT-4o, GPT-4, GPT-3.5-turbo
- **パラメータ**: temperature=0.7, top_p=0.9

### セキュリティ
- ⚠️ **API キーはローカル保存**: 本番環境では適切な暗号化を推奨
- 🔒 **HTTPS環境推奨**: セキュアな通信のため
- 🛡️ **エラーハンドリング**: API エラー・ネットワークエラー対応

## 📚 ドキュメント

- 📖 **[システム仕様書](docs/specification.md)** - 詳細な機能仕様とAPI設計
- 🔧 **[実装ガイド](docs/implementation.md)** - 技術的実装詳細とトラブルシューティング

## 🐛 トラブルシューティング

### よくある問題

#### ❌ API接続エラー
```
解決方法:
1. エンドポイントURLの形式確認（末尾スラッシュ必須）
2. APIキーの有効性確認
3. デプロイメント名のスペルチェック
4. Azure OpenAIクォータの確認
```

#### ❌ 回答が表示されない
```
解決方法:
1. ブラウザ開発者ツールでエラーログ確認
2. ネットワーク接続確認
3. JavaScriptが有効か確認
4. 対応ブラウザの使用確認
```

#### ❌ UI表示問題
```
解決方法:
1. ブラウザキャッシュのクリア
2. Tailwind CSS CDNの読み込み確認
3. CSSファイルのパス確認
```

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Request を作成

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 🆘 サポートとリソース

- 📖 **Azure OpenAI ドキュメント**: [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/)
- 🎓 **API リファレンス**: [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- 💬 **GitHub Discussions**: [プロジェクトディスカッション](https://github.com/tokawa-ms/20250716-demo-002/discussions)
- 🐛 **Issue 報告**: [Issues](https://github.com/tokawa-ms/20250716-demo-002/issues)

## 📊 プロジェクト統計

![GitHub stars](https://img.shields.io/github/stars/tokawa-ms/20250716-demo-002?style=social)
![GitHub forks](https://img.shields.io/github/forks/tokawa-ms/20250716-demo-002?style=social)
![GitHub issues](https://img.shields.io/github/issues/tokawa-ms/20250716-demo-002)

---

<div align="center">
  <strong>🤖 マルチエージェント指令室で多角的な意思決定を！ 🚀</strong><br>
  Made with ❤️ using Azure OpenAI and GitHub Copilot
</div>
