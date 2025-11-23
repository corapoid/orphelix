// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::{Command, Child};
use std::sync::Mutex;

struct AppState {
    server: Mutex<Option<Child>>,
}

fn start_nextjs_server() -> Result<Child, std::io::Error> {
    #[cfg(target_os = "macos")]
    let child = Command::new("node")
        .arg("server.js")
        .current_dir("../")
        .spawn()?;
    
    #[cfg(target_os = "linux")]
    let child = Command::new("node")
        .arg("server.js")
        .current_dir("../")
        .spawn()?;
    
    #[cfg(target_os = "windows")]
    let child = Command::new("node.exe")
        .arg("server.js")
        .current_dir("../")
        .spawn()?;
    
    Ok(child)
}

fn main() {
    // Start Next.js server in production
    #[cfg(not(debug_assertions))]
    let server = start_nextjs_server().ok();
    
    #[cfg(debug_assertions)]
    let server = None;
    
    let app_state = AppState {
        server: Mutex::new(server),
    };

    tauri::Builder::default()
        .manage(app_state)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
