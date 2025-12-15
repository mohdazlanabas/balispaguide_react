# File Organization

All markdown documentation files have been moved to the `references/` folder to keep the project root clean.

## Project Root Structure

```
new_balispaguide/
├── backend/              # Backend application code
├── frontend/             # Frontend React application
├── references/           # All documentation (*.md files)
├── .claude/              # Claude Code configuration
├── docker-compose.yml    # PostgreSQL setup
├── deploy.sh             # Deployment script
├── package.json          # Root package configuration
└── README.md             # Main project README (only .md in root)
```

## Documentation Location

All documentation has been moved to `/references/` folder:

### Moved Files:
- `AGENTS.md` → `references/agents.md`
- `DEPLOYMENT.md` → `references/deployment.md`
- `plan.md` → `references/plan.md`
- `QUICK_START.md` → `references/quick_start.md`
- `SETUP_COMPLETE.md` → `references/setup_complete.md`
- `docs/DEV_GUIDE.md` → `references/dev_guide.md`

### Existing Files in references/:
- `deploy_digitalcoean.md` - DigitalOcean deployment guide
- `deploy_gcp.md` - Google Cloud Platform guide  
- `email_deploy.md` - Email configuration guide
- `git-workflow-reference.md` - Git workflow guide
- `README.md` - Documentation index (NEW)

## Benefits

✅ **Clean Root**: Only essential files in project root  
✅ **Organized**: All docs in one location  
✅ **Easy to Find**: References folder is clearly named  
✅ **Consistent Naming**: All docs use lowercase with underscores  

## Finding Documentation

1. **Quick Start**: `references/quick_start.md`
2. **Development**: `references/dev_guide.md`
3. **Planning**: `references/plan.md`
4. **Deployment**: `references/deployment.md`
5. **All Docs**: `references/README.md` (index)

---

**Last Updated**: December 15, 2025
