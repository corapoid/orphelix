# Orphelix Customization Guide

This guide explains how to customize your Orphelix experience by hiding/showing menu items and customizing the dashboard.

## Hiding Menu Items

Orphelix allows you to customize the sidebar navigation by pinning or unpinning menu items. This feature helps you focus on the resources that matter most to you and declutter the interface.

### How to Hide/Show Menu Items

1. **Enable Edit Mode**
   - Look for the edit icon (pencil icon) at the bottom of the sidebar
   - Click on it to enable edit mode
   - The sidebar will show pin icons next to each menu item
   - Menu items will have a dashed border to indicate you're in edit mode

2. **Pin/Unpin Items**
   - When in edit mode, you'll see pin icons (📌) next to each menu item
   - Click the pin icon to toggle between pinned and unpinned states:
     - **Solid pin** = Item is pinned (visible)
     - **Outline pin** = Item is unpinned (hidden)

3. **Exit Edit Mode**
   - Click the checkmark icon at the bottom of the sidebar
   - Your changes will be automatically saved

### What Happens When You Unpin Items?

Unpinning a menu item has the following effects:

1. **Sidebar Navigation**
   - The item is moved to a "More..." section in the sidebar
   - You can still access it, but it won't clutter your main navigation

2. **Dashboard**
   - Resource cards for unpinned items are **automatically hidden** from the dashboard
   - This keeps your dashboard focused on the resources you care about
   - The dashboard maintains the same order as the sidebar menu

3. **Critical Alerts**
   - Alerts related to unpinned resources are **automatically filtered out**
   - This prevents unnecessary notifications about resources you're not monitoring
   - Example: If you unpin "Pods", you won't see alerts about failed pods

### Default State

By default, all menu items are pinned (visible). Your customization preferences are saved in your browser's local storage and will persist across sessions.

### Example Use Cases

**Focus on Core Workloads:**
- Pin: Deployments, Pods, Services
- Unpin: Jobs, CronJobs, HPA, Events
- Result: Dashboard and alerts show only deployment, pod, and service information

**Storage Administrator:**
- Pin: Persistent Volumes, ConfigMaps, Secrets
- Unpin: Network resources, Jobs
- Result: Dashboard focused on storage and configuration resources

**Network Specialist:**
- Pin: Services, Ingress, Pods, Nodes
- Unpin: Storage resources, Jobs
- Result: Dashboard shows network-related resources and alerts

## Dashboard Customization

The dashboard automatically adapts to your sidebar preferences:

### Resource Cards Order

Resource cards on the dashboard follow the same order as menu items in the sidebar:

**Workloads Section:**
1. Deployments
2. StatefulSets
3. DaemonSets
4. Pods
5. Jobs
6. CronJobs

**Network Section:**
1. Services
2. Ingress

**Config & Storage Section:**
1. ConfigMaps
2. Secrets
3. Persistent Volumes

### Dynamic Sections

If you unpin all items in a section, that entire section will be hidden from the dashboard. For example:

- Unpin all Workload items → Workloads section disappears from dashboard
- Unpin all Network items → Network section disappears from dashboard

## Tips and Best Practices

1. **Start with a Clean Slate**
   - Consider unpinning everything first
   - Then pin only the resources you actively monitor
   - This creates a focused, minimal interface

2. **Team-Specific Views**
   - Different team members can customize their own views
   - Developers might focus on Deployments, Pods, and Services
   - Platform engineers might focus on Nodes, HPA, and PVs

3. **Temporary Focus**
   - Unpin most items when troubleshooting a specific issue
   - Pin only related resources to reduce noise
   - Re-pin items when you're done

4. **Mobile/Small Screens**
   - Consider unpinning more items on mobile devices
   - This makes navigation faster on smaller screens
   - Collapse the sidebar for maximum space

## Resetting Customization

To reset your customization to default settings:

1. Open your browser's developer console (F12)
2. Go to the "Application" or "Storage" tab
3. Find "Local Storage" for your Orphelix domain
4. Delete the key named `orphelix-sidebar-pins`
5. Refresh the page

All items will be pinned again by default.

## Persistence and Sync

- **Saved Locally**: Your preferences are saved in your browser's local storage
- **Per Browser**: Each browser/device has its own saved preferences
- **No Cloud Sync**: Preferences are not synced across devices
- **Automatic Save**: Changes are saved immediately when you exit edit mode

## Troubleshooting

**Q: I can't see the edit button**
- Make sure the sidebar is expanded (not collapsed)
- The edit button is at the very bottom of the sidebar

**Q: My changes don't persist**
- Check if your browser allows local storage
- Try in an incognito window to rule out extensions

**Q: I accidentally hid everything**
- Follow the "Resetting Customization" steps above
- Or pin items back one by one using the "More..." section

**Q: Hidden items still show alerts**
- This might be a caching issue
- Refresh the page to clear the cache
- If the issue persists, reset your customization

## Related Documentation

- [Dashboard Overview](./COMPONENTS.md#dashboard)
- [Sidebar Navigation](./COMPONENTS.md#sidebar)
- [Critical Alerts](./COMPONENTS.md#critical-alerts)
