#!/bin/zsh
set -eu
TASK_PROJECT_DIR="$(cd -- "$(dirname -- "$0")" && pwd)"
TASK_NODE_BIN="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
if [[ ! -x "$TASK_NODE_BIN" ]]; then
  TASK_NODE_BIN="$(command -v node || true)"
fi
if [[ -z "$TASK_NODE_BIN" ]]; then
  print "未找到 Node.js，请让 Codex 帮你配置运行环境。"
  exit 1
fi
cd "$TASK_PROJECT_DIR"
if [[ ! -f node_modules/vite/bin/vite.js ]]; then
  print "项目依赖尚未安装，请让 Codex 帮你安装后再打开。"
  exit 1
fi
print "复习室地址：http://127.0.0.1:5178/"
print "保留此窗口即可使用；关闭后可再次双击启动。"
exec "$TASK_NODE_BIN" node_modules/vite/bin/vite.js
