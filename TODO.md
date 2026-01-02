# ShooraMail Dashboard Fixes

## Issues to Fix
- [ ] Sidebar options for categories (work, personal, promotions) and special folders (starred, important) not fetching emails correctly
- [ ] Email body rendering broken - checks HTMLInputElement instead of detecting HTML content
- [ ] Categories hardcoded to 'personal' instead of being assigned properly

## Implementation Steps
- [ ] Fix fetchMessages to use /api/inbox-fetch for inbox/all/starred/important/categories and filter client-side
- [ ] Use /api/folder-fetch for specific folders like Sent/Trash/etc.
- [ ] Assign categories randomly during message mapping for demo purposes
- [ ] Fix email body rendering to detect HTML properly
