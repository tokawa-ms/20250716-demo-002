/**
 * マルチエージェントチャットシステム
 * Azure OpenAI を使用した3エージェント + オーガナイザーシステム
 */

class MultiAgentChatSystem {
    constructor() {
        this.settings = {
            endpoint: '',
            apiKey: '',
            deployment: ''
        };
        this.agents = {
            casper: {
                name: 'カスパー',
                role: '恋に溺れる感情的な女性',
                prompt: 'あなたは恋に溺れる感情的な女性「カスパー」です。質問に対して感情的で恋愛感情に満ちた視点から賛成か反対かとその理由を述べてください。恋愛経験や感情を重視し、ロマンチックな観点から物事を判断します。回答は1000文字以内でお願いします。',
                maxLength: 1000
            },
            melchior: {
                name: 'メルキオール',
                role: '論理的女性科学者',
                prompt: 'あなたは論理的思考を重視する女性科学者「メルキオール」です。質問に対して科学的根拠や論理的分析に基づいて賛成か反対かとその理由を述べてください。データ、統計、研究結果を重視し、客観的な視点から判断します。回答は1000文字以内でお願いします。',
                maxLength: 1000
            },
            balthazar: {
                name: 'バルタザール',
                role: '心配する母親',
                prompt: 'あなたは息子を案ずる心配性の母親「バルタザール」です。質問に対して母親として息子の安全や幸せを最優先に考え、賛成か反対かとその理由を述べてください。子供の健康、安全、将来を最も重視し、保護的な観点から判断します。回答は1000文字以内でお願いします。',
                maxLength: 1000
            }
        };
        this.organizerPrompt = 'あなたはオーガナイザーです。3人のエージェント（カスパー、メルキオール、バルタザール）の意見を分析し、多数決に基づいて最終的な結論を導き出してください。各エージェントの意見を要約し、賛成・反対の数を数え、最終的な判断とその理由を明確に示してください。回答は3000文字以内でお願いします。';
        this.initializeEventListeners();
        this.loadSettings();
    }

    /**
     * イベントリスナーの初期化
     */
    initializeEventListeners() {
        // 設定保存ボタン
        document.getElementById('saveSettings').addEventListener('click', () => {
            this.saveSettings();
        });

        // 質問送信ボタン
        document.getElementById('submitQuestion').addEventListener('click', () => {
            this.submitQuestion();
        });

        // リアルタイム設定検証
        ['endpoint', 'apiKey', 'deployment'].forEach(id => {
            document.getElementById(id).addEventListener('input', () => {
                this.validateSettings();
            });
        });

        // 質問入力フィールドの監視
        document.getElementById('question').addEventListener('input', () => {
            this.validateQuestion();
        });
    }

    /**
     * 設定の保存
     */
    saveSettings() {
        const endpoint = document.getElementById('endpoint').value.trim();
        const apiKey = document.getElementById('apiKey').value.trim();
        const deployment = document.getElementById('deployment').value.trim();

        if (!endpoint || !apiKey || !deployment) {
            this.showStatus('settingsStatus', '❌ すべての項目を入力してください', 'text-red-400');
            return;
        }

        this.settings = { endpoint, apiKey, deployment };
        localStorage.setItem('multiAgentSettings', JSON.stringify(this.settings));
        this.showStatus('settingsStatus', '✅ 設定が保存されました', 'text-cyber-green');
        this.validateSettings();
    }

    /**
     * 設定の読み込み
     */
    loadSettings() {
        const saved = localStorage.getItem('multiAgentSettings');
        if (saved) {
            this.settings = JSON.parse(saved);
            document.getElementById('endpoint').value = this.settings.endpoint;
            document.getElementById('apiKey').value = this.settings.apiKey;
            document.getElementById('deployment').value = this.settings.deployment;
            this.validateSettings();
        }
    }

    /**
     * 設定の検証
     */
    validateSettings() {
        const endpoint = document.getElementById('endpoint').value.trim();
        const apiKey = document.getElementById('apiKey').value.trim();
        const deployment = document.getElementById('deployment').value.trim();

        const isValid = endpoint && apiKey && deployment;
        this.validateQuestion();
        return isValid;
    }

    /**
     * 質問の検証
     */
    validateQuestion() {
        const question = document.getElementById('question').value.trim();
        const settingsValid = this.validateSettings();
        const submitButton = document.getElementById('submitQuestion');
        
        const isValid = question && settingsValid;
        submitButton.disabled = !isValid;
        
        if (isValid) {
            submitButton.classList.remove('disabled:bg-gray-600', 'disabled:cursor-not-allowed');
        } else {
            submitButton.classList.add('disabled:bg-gray-600', 'disabled:cursor-not-allowed');
        }
    }

    /**
     * 質問の送信
     */
    async submitQuestion() {
        const question = document.getElementById('question').value.trim();
        if (!question) return;

        // UIの初期化
        this.resetUI();
        this.showLoading(true);
        
        // 各エージェントの分析を並行実行
        const agentPromises = Object.keys(this.agents).map(agentId => 
            this.queryAgent(agentId, question)
        );

        try {
            // すべてのエージェントの回答を待機
            const responses = await Promise.all(agentPromises);
            
            // オーガナイザーによる統合分析
            await this.runOrganizer(question, responses);
            
        } catch (error) {
            console.error('エラーが発生しました:', error);
            this.showStatus('loadingStatus', '❌ エラーが発生しました: ' + error.message, 'text-red-400');
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * 個別エージェントへのクエリ
     */
    async queryAgent(agentId, question) {
        const agent = this.agents[agentId];
        
        // 状態表示を「思考中」に更新
        this.updateAgentStatus(agentId, 'thinking');
        
        try {
            const fullPrompt = `${agent.prompt}\n\n質問: ${question}\n\n回答:`;
            const response = await this.callAzureOpenAI(fullPrompt, agent.maxLength);
            
            // 回答を表示
            this.displayAgentResponse(agentId, response);
            this.updateAgentStatus(agentId, 'complete');
            
            return {
                agent: agent.name,
                response: response
            };
            
        } catch (error) {
            this.updateAgentStatus(agentId, 'error');
            this.displayAgentResponse(agentId, `❌ エラー: ${error.message}`);
            throw error;
        }
    }

    /**
     * オーガナイザーによる統合分析
     */
    async runOrganizer(question, agentResponses) {
        this.updateAgentStatus('organizer', 'thinking');
        
        try {
            const responseSummary = agentResponses.map(r => 
                `【${r.agent}】\n${r.response}`
            ).join('\n\n');
            
            const organizerPrompt = `${this.organizerPrompt}\n\n元の質問: ${question}\n\n各エージェントの回答:\n${responseSummary}\n\n統合分析結果:`;
            
            const organizerResponse = await this.callAzureOpenAI(organizerPrompt, 3000);
            this.displayOrganizerResponse(organizerResponse);
            this.updateAgentStatus('organizer', 'complete');
            
        } catch (error) {
            this.updateAgentStatus('organizer', 'error');
            this.displayOrganizerResponse(`❌ 統合分析でエラーが発生しました: ${error.message}`);
            throw error;
        }
    }

    /**
     * Azure OpenAI API 呼び出し
     */
    async callAzureOpenAI(prompt, maxTokens) {
        const response = await fetch(`${this.settings.endpoint}/openai/deployments/${this.settings.deployment}/chat/completions?api-version=2024-02-15-preview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': this.settings.apiKey
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: Math.floor(maxTokens / 2), // 日本語の場合のトークン調整
                temperature: 0.7,
                top_p: 0.9
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`API呼び出しエラー (${response.status}): ${errorData}`);
        }

        const data = await response.json();
        
        if (!data.choices || data.choices.length === 0) {
            throw new Error('APIからの応答が不正です');
        }

        return data.choices[0].message.content.trim();
    }

    /**
     * エージェントの回答表示
     */
    displayAgentResponse(agentId, response) {
        const responseElement = document.getElementById(`${agentId}Response`);
        const countElement = document.getElementById(`${agentId}Count`);
        
        responseElement.innerHTML = this.formatResponse(response);
        countElement.textContent = response.length;
        
        // 文字数制限の警告表示
        const maxLength = this.agents[agentId].maxLength;
        if (response.length > maxLength) {
            countElement.classList.add('text-red-400');
            countElement.textContent += ` (制限: ${maxLength})`;
        } else {
            countElement.classList.remove('text-red-400');
        }
    }

    /**
     * オーガナイザーの回答表示
     */
    displayOrganizerResponse(response) {
        const responseElement = document.getElementById('organizerResponse');
        const countElement = document.getElementById('organizerCount');
        
        responseElement.innerHTML = this.formatResponse(response);
        countElement.textContent = response.length;
        
        // 文字数制限の警告表示
        if (response.length > 3000) {
            countElement.classList.add('text-red-400');
            countElement.textContent += ' (制限: 3000)';
        } else {
            countElement.classList.remove('text-red-400');
        }
    }

    /**
     * 回答テキストのフォーマット
     */
    formatResponse(response) {
        return response
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyber-blue">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="text-cyber-green">$1</em>');
    }

    /**
     * エージェント状態の更新
     */
    updateAgentStatus(agentId, status) {
        const statusElement = document.getElementById(`status${agentId.charAt(0).toUpperCase() + agentId.slice(1)}`);
        
        // すべてのステータスクラスを削除
        statusElement.classList.remove('status-waiting', 'status-thinking', 'status-complete', 'status-error');
        
        // 新しいステータスクラスを追加
        statusElement.classList.add(`status-${status}`);
    }

    /**
     * UIのリセット
     */
    resetUI() {
        // エージェントの回答をクリア
        Object.keys(this.agents).forEach(agentId => {
            document.getElementById(`${agentId}Response`).innerHTML = '<p class="text-gray-400 italic">分析中...</p>';
            document.getElementById(`${agentId}Count`).textContent = '0';
            this.updateAgentStatus(agentId, 'waiting');
        });
        
        // オーガナイザーの回答をクリア
        document.getElementById('organizerResponse').innerHTML = '<p class="text-gray-400 italic">全エージェントの分析完了後に統合結果を表示します...</p>';
        document.getElementById('organizerCount').textContent = '0';
        this.updateAgentStatus('organizer', 'waiting');
    }

    /**
     * ローディング状態の表示/非表示
     */
    showLoading(show) {
        const loadingElement = document.getElementById('loadingStatus');
        const submitButton = document.getElementById('submitQuestion');
        
        if (show) {
            loadingElement.classList.remove('hidden');
            submitButton.disabled = true;
            submitButton.textContent = '🤖 分析実行中...';
        } else {
            loadingElement.classList.add('hidden');
            submitButton.disabled = false;
            submitButton.textContent = '🚀 エージェント分析開始';
            this.validateQuestion(); // 再検証
        }
    }

    /**
     * ステータスメッセージの表示
     */
    showStatus(elementId, message, className) {
        const element = document.getElementById(elementId);
        element.textContent = message;
        element.className = className;
        
        // 3秒後に自動で消去
        setTimeout(() => {
            element.textContent = '';
            element.className = '';
        }, 3000);
    }
}

// システムの初期化
document.addEventListener('DOMContentLoaded', () => {
    new MultiAgentChatSystem();
    
    // 初期化完了のメッセージ
    console.log('🤖 マルチエージェントチャットシステムが初期化されました');
    console.log('📋 使用方法:');
    console.log('1. Azure OpenAI の設定を入力してください');
    console.log('2. 質問を入力してください');
    console.log('3. エージェント分析開始ボタンをクリックしてください');
});

// エラーハンドリング
window.addEventListener('error', (event) => {
    console.error('システムエラー:', event.error);
    const loadingElement = document.getElementById('loadingStatus');
    if (loadingElement) {
        loadingElement.innerHTML = '<span class="text-red-400">❌ システムエラーが発生しました</span>';
        loadingElement.classList.remove('hidden');
    }
});

// 未処理の Promise エラーのキャッチ
window.addEventListener('unhandledrejection', (event) => {
    console.error('未処理のPromiseエラー:', event.reason);
    event.preventDefault();
});