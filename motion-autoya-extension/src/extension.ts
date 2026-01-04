import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// Animation Library Tree Provider
class AnimationTreeProvider implements vscode.TreeDataProvider<AnimationItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<AnimationItem | undefined | null | void> = new vscode.EventEmitter<AnimationItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<AnimationItem | undefined | null | void> = this._onDidChangeTreeData.event;

    private animations: any = {};
    private categories: Set<string> = new Set();

    constructor(private workspaceRoot: string) {
        this.loadAnimations();
    }

    refresh(): void {
        this.loadAnimations();
        this._onDidChangeTreeData.fire();
    }

    private loadAnimations() {
        const config = vscode.workspace.getConfiguration('motionAutoya');
        const libraryPath = config.get<string>('libraryPath') || 'animation-presets.json';
        const fullPath = path.join(this.workspaceRoot, libraryPath);

        if (fs.existsSync(fullPath)) {
            try {
                const content = fs.readFileSync(fullPath, 'utf-8');
                this.animations = JSON.parse(content);
                
                // Extract categories
                this.categories.clear();
                Object.keys(this.animations).forEach(key => {
                    const category = key.split('.')[0];
                    this.categories.add(category);
                });

                vscode.window.showInformationMessage(`✅ Loaded ${Object.keys(this.animations).length} animations from Motion Autoya library`);
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to load animation library: ${error}`);
            }
        } else {
            vscode.window.showWarningMessage(`Animation library not found at: ${fullPath}`);
        }
    }

    getTreeItem(element: AnimationItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: AnimationItem): Thenable<AnimationItem[]> {
        if (!element) {
            // Root level - show categories
            const items: AnimationItem[] = [];
            this.categories.forEach(category => {
                const count = Object.keys(this.animations).filter(k => k.startsWith(category + '.')).length;
                items.push(new AnimationItem(
                    `${category} (${count})`,
                    category,
                    vscode.TreeItemCollapsibleState.Collapsed,
                    'category'
                ));
            });
            return Promise.resolve(items.sort((a, b) => a.label.localeCompare(b.label)));
        } else if (element.type === 'category') {
            // Show animations in this category
            const items: AnimationItem[] = [];
            Object.entries(this.animations).forEach(([key, value]: [string, any]) => {
                if (key.startsWith(element.category + '.')) {
                    const name = key.substring(element.category.length + 1);
                    const duration = value.duration || 'N/A';
                    const description = `${duration}ms`;
                    
                    items.push(new AnimationItem(
                        name,
                        element.category,
                        vscode.TreeItemCollapsibleState.None,
                        'animation',
                        key,
                        description,
                        value
                    ));
                }
            });
            return Promise.resolve(items.sort((a, b) => a.label.localeCompare(b.label)));
        }
        return Promise.resolve([]);
    }
}

class AnimationItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly category: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly type: 'category' | 'animation',
        public readonly animationKey?: string,
        public readonly description?: string,
        public readonly animationData?: any
    ) {
        super(label, collapsibleState);

        this.tooltip = type === 'animation' 
            ? `${this.label}\nDuration: ${description}\nKey: ${animationKey}`
            : `${this.label} animations`;

        this.contextValue = type;

        if (type === 'animation') {
            this.iconPath = new vscode.ThemeIcon('symbol-event');
            this.command = {
                command: 'motionAutoya.previewAnimation',
                title: 'Preview Animation',
                arguments: [this]
            };
        } else {
            this.iconPath = new vscode.ThemeIcon('folder');
        }
    }
}

// Preview Panel
class AnimationPreviewPanel {
    public static currentPanel: AnimationPreviewPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionUri: vscode.Uri, animation: AnimationItem) {
        const column = vscode.ViewColumn.Two;

        if (AnimationPreviewPanel.currentPanel) {
            AnimationPreviewPanel.currentPanel._panel.reveal(column);
            AnimationPreviewPanel.currentPanel.updateContent(animation);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'motionAutoyaPreview',
            'Animation Preview',
            column,
            {
                enableScripts: true,
                localResourceRoots: [extensionUri]
            }
        );

        AnimationPreviewPanel.currentPanel = new AnimationPreviewPanel(panel, extensionUri);
        AnimationPreviewPanel.currentPanel.updateContent(animation);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;

        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    public updateContent(animation: AnimationItem) {
        this._panel.title = `Preview: ${animation.label}`;
        this._panel.webview.html = this.getWebviewContent(animation);
    }

    private getWebviewContent(animation: AnimationItem): string {
        const data = animation.animationData || {};
        const duration = data.duration || 1000;
        const easing = data.easing || 'ease-out';
        const delay = data.delay || 0;

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animation Preview</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        .header {
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--vscode-panel-border);
        }
        .header h1 {
            margin: 0 0 10px 0;
            font-size: 24px;
            font-weight: 600;
        }
        .header .subtitle {
            color: var(--vscode-descriptionForeground);
            font-size: 14px;
        }
        .preview-area {
            background: var(--vscode-editor-background);
            border: 1px solid var(--vscode-panel-border);
            border-radius: 8px;
            padding: 40px;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            position: relative;
            overflow: hidden;
        }
        .animation-box {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        .animation-box.fadeIn {
            animation: fadeIn ${duration}ms ${easing} ${delay}ms infinite;
        }
        .animation-box.scaleIn {
            animation: scaleIn ${duration}ms ${easing} ${delay}ms infinite;
        }
        .animation-box.slideUp {
            animation: slideUp ${duration}ms ${easing} ${delay}ms infinite;
        }
        .animation-box.bounceIn {
            animation: bounceIn ${duration}ms ${easing} ${delay}ms infinite;
        }
        .animation-box.rotate {
            animation: rotate ${duration}ms ${easing} ${delay}ms infinite;
        }
        @keyframes fadeIn {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
        }
        @keyframes scaleIn {
            0%, 100% { transform: scale(0); }
            50% { transform: scale(1); }
        }
        @keyframes slideUp {
            0%, 100% { transform: translateY(100px); opacity: 0; }
            50% { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounceIn {
            0%, 100% { transform: scale(0); }
            50% { transform: scale(1.2); }
            65% { transform: scale(0.9); }
            80% { transform: scale(1.05); }
        }
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .controls {
            text-align: center;
            margin-bottom: 30px;
        }
        .btn {
            background: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin: 0 5px;
        }
        .btn:hover {
            background: var(--vscode-button-hoverBackground);
        }
        .properties {
            background: var(--vscode-editor-background);
            border: 1px solid var(--vscode-panel-border);
            border-radius: 8px;
            padding: 20px;
        }
        .properties h2 {
            margin: 0 0 15px 0;
            font-size: 18px;
            font-weight: 600;
        }
        .property {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid var(--vscode-panel-border);
        }
        .property:last-child {
            border-bottom: none;
        }
        .property-name {
            font-weight: 500;
            color: var(--vscode-descriptionForeground);
        }
        .property-value {
            font-family: 'Courier New', monospace;
            color: var(--vscode-textLink-foreground);
        }
        .json-code {
            background: var(--vscode-textCodeBlock-background);
            border: 1px solid var(--vscode-panel-border);
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
            overflow-x: auto;
        }
        .json-code pre {
            margin: 0;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${animation.label}</h1>
            <div class="subtitle">${animation.animationKey}</div>
        </div>

        <div class="preview-area">
            <div class="animation-box ${animation.category}" id="animationBox"></div>
        </div>

        <div class="controls">
            <button class="btn" onclick="replay()">▶️ Replay</button>
            <button class="btn" onclick="copyJSON()">📋 Copy JSON</button>
        </div>

        <div class="properties">
            <h2>Animation Properties</h2>
            <div class="property">
                <span class="property-name">Duration</span>
                <span class="property-value">${duration}ms</span>
            </div>
            <div class="property">
                <span class="property-name">Easing</span>
                <span class="property-value">${easing}</span>
            </div>
            <div class="property">
                <span class="property-name">Delay</span>
                <span class="property-value">${delay}ms</span>
            </div>
            <div class="property">
                <span class="property-name">Category</span>
                <span class="property-value">${animation.category}</span>
            </div>
        </div>

        <div class="json-code">
            <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();

        function replay() {
            const box = document.getElementById('animationBox');
            box.style.animation = 'none';
            setTimeout(() => {
                box.style.animation = '';
            }, 10);
        }

        function copyJSON() {
            const json = ${JSON.stringify(JSON.stringify(data, null, 2))};
            navigator.clipboard.writeText(json).then(() => {
                vscode.postMessage({ command: 'copied' });
            });
        }
    </script>
</body>
</html>`;
    }

    public dispose() {
        AnimationPreviewPanel.currentPanel = undefined;

        this._panel.dispose();

        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
}

// JSON Validator
class AnimationJSONValidator {
    private diagnosticCollection: vscode.DiagnosticCollection;

    constructor() {
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection('motionAutoya');
    }

    public async validateDocument(document: vscode.TextDocument): Promise<void> {
        if (!document.fileName.includes('animation') && 
            !document.fileName.includes('motion') && 
            !document.fileName.includes('preset')) {
            return;
        }

        const diagnostics: vscode.Diagnostic[] = [];

        try {
            const content = document.getText();
            const json = JSON.parse(content);

            // Validate animation properties
            this.validateAnimationProperties(json, diagnostics, document);

        } catch (error: any) {
            const diagnostic = new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 0),
                `Invalid JSON: ${error.message}`,
                vscode.DiagnosticSeverity.Error
            );
            diagnostics.push(diagnostic);
        }

        this.diagnosticCollection.set(document.uri, diagnostics);
    }

    private validateAnimationProperties(json: any, diagnostics: vscode.Diagnostic[], document: vscode.TextDocument) {
        Object.entries(json).forEach(([key, value]: [string, any]) => {
            if (typeof value === 'object' && value !== null) {
                // Check for required properties
                if (value.duration !== undefined && (typeof value.duration !== 'number' || value.duration < 0)) {
                    const line = this.findLineNumber(document, key);
                    diagnostics.push(new vscode.Diagnostic(
                        new vscode.Range(line, 0, line, 100),
                        `Duration must be a positive number`,
                        vscode.DiagnosticSeverity.Warning
                    ));
                }

                // Check easing values
                const validEasings = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 
                                     'spring', 'bounce', 'elastic'];
                if (value.easing && typeof value.easing === 'string' && 
                    !validEasings.includes(value.easing) && 
                    !value.easing.startsWith('cubic-bezier')) {
                    const line = this.findLineNumber(document, key);
                    diagnostics.push(new vscode.Diagnostic(
                        new vscode.Range(line, 0, line, 100),
                        `Invalid easing function: ${value.easing}`,
                        vscode.DiagnosticSeverity.Information
                    ));
                }

                // Check for recommended properties
                if (!value.duration) {
                    const line = this.findLineNumber(document, key);
                    diagnostics.push(new vscode.Diagnostic(
                        new vscode.Range(line, 0, line, 100),
                        `Consider adding a 'duration' property`,
                        vscode.DiagnosticSeverity.Hint
                    ));
                }
            }
        });
    }

    private findLineNumber(document: vscode.TextDocument, searchText: string): number {
        const text = document.getText();
        const index = text.indexOf(`"${searchText}"`);
        if (index === -1) return 0;

        const lines = text.substring(0, index).split('\n');
        return lines.length - 1;
    }

    public dispose() {
        this.diagnosticCollection.dispose();
    }
}

// Autocomplete Provider
class AnimationCompletionProvider implements vscode.CompletionItemProvider {
    constructor(private animations: any) {}

    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
    ): vscode.CompletionItem[] {
        const items: vscode.CompletionItem[] = [];

        // Provide animation property suggestions
        const propertyCompletions = [
            { label: 'duration', detail: 'Animation duration in milliseconds', insertText: '"duration": 300' },
            { label: 'easing', detail: 'Easing function', insertText: '"easing": "ease-out"' },
            { label: 'delay', detail: 'Animation delay in milliseconds', insertText: '"delay": 0' },
            { label: 'spring', detail: 'Spring physics configuration', insertText: '"spring": {\n  "stiffness": 380,\n  "damping": 30\n}' },
            { label: 'type', detail: 'Animation type', insertText: '"type": "spring"' },
            { label: 'opacity', detail: 'Opacity animation', insertText: '"opacity": [0, 1]' },
            { label: 'scale', detail: 'Scale animation', insertText: '"scale": [0, 1]' },
            { label: 'x', detail: 'X-axis translation', insertText: '"x": [0, 100]' },
            { label: 'y', detail: 'Y-axis translation', insertText: '"y": [0, 100]' },
            { label: 'rotate', detail: 'Rotation animation', insertText: '"rotate": [0, 360]' }
        ];

        propertyCompletions.forEach(prop => {
            const item = new vscode.CompletionItem(prop.label, vscode.CompletionItemKind.Property);
            item.detail = prop.detail;
            item.insertText = new vscode.SnippetString(prop.insertText);
            items.push(item);
        });

        return items;
    }
}

// Extension activation
export function activate(context: vscode.ExtensionContext) {
    console.log('Motion Autoya extension is now active!');

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folder found. Please open a folder.');
        return;
    }

    const workspaceRoot = workspaceFolders[0].uri.fsPath;

    // Initialize providers
    const treeProvider = new AnimationTreeProvider(workspaceRoot);
    const validator = new AnimationJSONValidator();

    // Register tree view
    const treeView = vscode.window.createTreeView('motionAutoyaExplorer', {
        treeDataProvider: treeProvider,
        showCollapseAll: true
    });

    // Register commands
    context.subscriptions.push(
        vscode.commands.registerCommand('motionAutoya.refreshLibrary', () => {
            treeProvider.refresh();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('motionAutoya.previewAnimation', (item: AnimationItem) => {
            AnimationPreviewPanel.createOrShow(context.extensionUri, item);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('motionAutoya.insertCode', async (item: AnimationItem) => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage('No active editor');
                return;
            }

            const code = `// ${item.label}\nconst animation = ${JSON.stringify(item.animationData, null, 2)};`;
            editor.edit(editBuilder => {
                editBuilder.insert(editor.selection.active, code);
            });

            vscode.window.showInformationMessage(`✅ Inserted ${item.label} animation`);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('motionAutoya.copyJSON', (item: AnimationItem) => {
            const json = JSON.stringify(item.animationData, null, 2);
            vscode.env.clipboard.writeText(json);
            vscode.window.showInformationMessage(`📋 Copied ${item.label} to clipboard`);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('motionAutoya.searchAnimations', async () => {
            const searchTerm = await vscode.window.showInputBox({
                prompt: 'Search animations',
                placeHolder: 'Type animation name or category...'
            });

            if (searchTerm) {
                vscode.window.showInformationMessage(`🔍 Searching for: ${searchTerm}`);
                // Filter logic would be implemented in tree provider
            }
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('motionAutoya.validateJSON', () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                validator.validateDocument(editor.document);
                vscode.window.showInformationMessage('✅ JSON validation complete');
            }
        })
    );

    // Auto-validate on save
    context.subscriptions.push(
        vscode.workspace.onDidSaveTextDocument(document => {
            const config = vscode.workspace.getConfiguration('motionAutoya');
            if (config.get<boolean>('autoValidate')) {
                validator.validateDocument(document);
            }
        })
    );

    // Auto-validate on open
    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(document => {
            validator.validateDocument(document);
        })
    );

    // Register completion provider
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            { pattern: '**/*{animation,motion,preset}*.json' },
            new AnimationCompletionProvider({}),
            '"', ':'
        )
    );

    // Validate currently open documents
    vscode.workspace.textDocuments.forEach(document => {
        validator.validateDocument(document);
    });

    context.subscriptions.push(treeView);
    context.subscriptions.push(validator);

    vscode.window.showInformationMessage('🎨 Motion Autoya extension loaded!');
}

export function deactivate() {}



