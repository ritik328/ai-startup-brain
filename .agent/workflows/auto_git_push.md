---
description: Automatically push changes to GitHub after file modifications or stable implementation steps.
---

1. Check if the current directory is a git repository.
2. If not, initialize git and add remote (skip if already done).
3. Add all changes: `git add .`
4. Commit changes with a timestamped message: `git commit -m "Auto-save: <timestamp> - <brief description>"`
5. Push to remote: `git push origin main`

// turbo
6. Verify push status.
