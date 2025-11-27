-- Orphelix Local Database Schema
-- SQLite database for persisting user settings and application state

-- User settings and preferences
CREATE TABLE IF NOT EXISTS user_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1), -- Singleton table, only one row
  mode TEXT NOT NULL DEFAULT 'demo', -- 'demo' or 'real'
  selected_context TEXT,
  selected_namespace TEXT DEFAULT '',
  cluster_connected INTEGER NOT NULL DEFAULT 0, -- boolean
  connection_error TEXT,
  realtime_enabled INTEGER NOT NULL DEFAULT 0, -- boolean
  auto_refresh_enabled INTEGER NOT NULL DEFAULT 0, -- boolean
  auto_refresh_interval INTEGER NOT NULL DEFAULT 30, -- seconds
  has_completed_welcome INTEGER NOT NULL DEFAULT 0, -- boolean
  theme_mode TEXT NOT NULL DEFAULT 'system', -- 'light', 'dark', 'system'
  visual_preset TEXT NOT NULL DEFAULT 'liquidGlass', -- 'liquidGlass', 'glass', 'classic'
  compact_mode INTEGER NOT NULL DEFAULT 0, -- boolean
  notifications_enabled INTEGER NOT NULL DEFAULT 0, -- boolean - desktop notifications
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- GitHub integration settings
CREATE TABLE IF NOT EXISTS github_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1), -- Singleton table
  selected_repo_owner TEXT,
  selected_repo_name TEXT,
  selected_branch TEXT DEFAULT 'main',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Pending GitHub Pull Requests
CREATE TABLE IF NOT EXISTS github_pending_prs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deployment_name TEXT NOT NULL,
  namespace TEXT NOT NULL,
  pr_number INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(deployment_name, namespace)
);

-- GitHub edit basket (pending file edits)
CREATE TABLE IF NOT EXISTS github_edit_basket (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  file_path TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  original_content TEXT NOT NULL,
  sha TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cluster aliases (friendly names for contexts)
CREATE TABLE IF NOT EXISTS cluster_aliases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  context_name TEXT NOT NULL UNIQUE,
  alias TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Critical issues settings (which resources to monitor)
CREATE TABLE IF NOT EXISTS critical_issues_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resource_type TEXT NOT NULL UNIQUE, -- 'pods', 'nodes', 'deployments', 'pv'
  enabled INTEGER NOT NULL DEFAULT 1, -- boolean
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sidebar pins (navigation items visibility)
CREATE TABLE IF NOT EXISTS sidebar_pins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT NOT NULL UNIQUE,
  pinned INTEGER NOT NULL DEFAULT 1, -- boolean
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Initialize default values
INSERT OR IGNORE INTO user_settings (id) VALUES (1);
INSERT OR IGNORE INTO github_settings (id) VALUES (1);

-- Initialize default critical issues settings
INSERT OR IGNORE INTO critical_issues_settings (resource_type, enabled) VALUES
  ('pods', 1),
  ('nodes', 1),
  ('deployments', 1),
  ('pv', 1);

-- Initialize default sidebar pins
INSERT OR IGNORE INTO sidebar_pins (path, pinned) VALUES
  ('/', 1),
  ('/repo-browser', 1),
  ('/deployments', 1),
  ('/statefulsets', 1),
  ('/daemonsets', 1),
  ('/pods', 1),
  ('/jobs', 1),
  ('/cronjobs', 1),
  ('/services', 1),
  ('/ingress', 1),
  ('/configmaps', 1),
  ('/secrets', 1),
  ('/namespaces', 1),
  ('/nodes', 1),
  ('/hpa', 1),
  ('/events', 1),
  ('/labels', 1),
  ('/topology', 1),
  ('/pv', 1),
  ('/settings', 1);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_github_pending_prs_lookup ON github_pending_prs(deployment_name, namespace);
CREATE INDEX IF NOT EXISTS idx_cluster_aliases_context ON cluster_aliases(context_name);
CREATE INDEX IF NOT EXISTS idx_sidebar_pins_path ON sidebar_pins(path);
