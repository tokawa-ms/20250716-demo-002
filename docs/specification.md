# マルチエージェントチャットシステム 仕様書

## 概要

Azure OpenAI を使用したマルチエージェントチャットシステムです。3つの異なる性格のエージェントがユーザーの質問に対して異なる視点から意見を述べ、最終的にオーガナイザーが統合分析を行います。

## エージェント仕様

### 1. カスパー（感情的女性）
- **役割**: 恋に溺れる感情的な女性の思考を模倣
- **視点**: ロマンチック、感情重視
- **回答制限**: 1000文字以内
- **UI色**: ピンク (#EC4899)

### 2. メルキオール（論理的女性科学者）
- **役割**: 女性科学者としての論理的思考を模倣
- **視点**: 科学的根拠、データ重視
- **回答制限**: 1000文字以内
- **UI色**: シアンブルー (#00F5FF)

### 3. バルタザール（心配する母親）
- **役割**: 息子を案ずる母親の思考を模倣
- **視点**: 子供の安全、健康、将来を重視
- **回答制限**: 1000文字以内
- **UI色**: サイバーグリーン (#39FF14)

### 4. オーガナイザー（統合分析システム）
- **役割**: 3エージェントの意見を統合し最終判断
- **機能**: 多数決に基づく意見の要約
- **回答制限**: 3000文字以内
- **UI色**: サイバーパープル (#8A2BE2)

## 技術仕様

### フロントエンド
- **HTML5**: UTF-8エンコーディング、セマンティックマークアップ
- **CSS3**: Tailwind CSS (CDN) + カスタムCSS
- **JavaScript**: ES6、非同期処理対応

### API連携
- **Azure OpenAI**: Chat Completions API
- **APIバージョン**: 2024-02-15-preview
- **モデル**: ユーザー指定のデプロイメント
- **パラメータ**:
  - temperature: 0.7
  - top_p: 0.9
  - max_tokens: 動的設定（日本語対応）

### UI設計
- **テーマ**: ロボットアニメ指令室風
- **レスポンシブ**: モバイル、タブレット、デスクトップ対応
- **エフェクト**: グロー効果、アニメーション
- **カラーパレット**: 
  - 背景: ダークブルー (#0A0A0F)
  - パネル: ダークグレー (#1A1A2E)
  - アクセント: 各エージェント専用色

## 機能仕様

### 1. 設定機能
- Azure OpenAI エンドポイント URL 設定
- API キー設定
- デプロイメント名設定
- ローカルストレージによる設定保存

### 2. 質問処理機能
- 質問入力検証
- 並行エージェント処理
- リアルタイム状態表示
- エラーハンドリング

### 3. 回答表示機能
- 吹き出し形式での回答表示
- 文字数カウント表示
- 制限超過時の警告表示
- マークダウン形式の一部対応

### 4. 状態管理機能
- エージェント別状態インジケーター
- ローディング状態表示
- エラー状態表示
- 処理完了状態表示

## セキュリティ仕様

### APIキー管理
- UI入力によるAPIキー設定
- ローカルストレージでの保存
- プレーンテキスト警告表示

### エラーハンドリング
- ネットワークエラー対応
- API エラー対応
- 設定エラー対応
- フォールバック処理

## パフォーマンス仕様

### API呼び出し最適化
- 並行処理によるレスポンス時間短縮
- トークン数最適化
- エラー時のリトライ機能

### UI最適化
- CSS アニメーション最適化
- レスポンシブデザイン対応
- ブラウザ互換性確保

## 動作環境

### 対応ブラウザ
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 必要な設定
- Azure OpenAI リソース
- デプロイ済みモデル
- 有効なAPIキー

## 使用方法

1. **設定**
   - Azure OpenAI のエンドポイント URL を入力
   - API キーを入力
   - デプロイメント名を入力
   - 「設定を保存」ボタンをクリック

2. **質問**
   - 質問テキストエリアに質問を入力
   - 「エージェント分析開始」ボタンをクリック

3. **結果確認**
   - 各エージェントの回答を確認
   - オーガナイザーの統合分析結果を確認

## 制限事項

### 文字数制限
- 各エージェント: 1000文字
- オーガナイザー: 3000文字

### API制限
- Azure OpenAI の利用制限に依存
- レート制限の考慮が必要

### セキュリティ制限
- APIキーはローカル保存のみ
- HTTPS環境での使用推奨