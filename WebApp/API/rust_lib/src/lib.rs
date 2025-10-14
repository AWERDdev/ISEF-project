pub mod modules;

// Re-export commonly used functions
pub use modules::auth::{create_token, verify_token};
pub use modules::password::{hash_password, verify_password, validate_password, PasswordError};
pub use modules::security::{RateLimiter, delay_on_failure, text_captcha};

// WASM bindings
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn create_token_wasm(user_id: &str) -> Result<String, JsValue> {
    create_token(user_id).map_err(|e| JsValue::from_str(&e))
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn validate_password_wasm(password: &str) -> Result<(), JsValue> {
    validate_password(password).map_err(|e| JsValue::from_str(&e))
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn verify_token_wasm(token: &str) -> Result<JsValue, JsValue> {
    verify_token(token)
        .map(|claims| serde_json::to_string(&claims).unwrap())
        .map(|json| JsValue::from_str(&json))
        .map_err(|e| JsValue::from_str(&e))
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn hash_password_wasm(password: &str) -> Result<String, JsValue> {
    hash_password(password)
        .map_err(|e| JsValue::from_str(&format!("{:?}", e)))
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn verify_password_wasm(password: &str, hash: &str) -> Result<bool, JsValue> {
    verify_password(password, hash)
        .map_err(|e| JsValue::from_str(&format!("{:?}", e)))
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn text_captcha_wasm() -> Result<bool, JsValue> {
    Ok(text_captcha())
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn rate_limiter_wasm(user: &str) -> Result<bool, JsValue> {
    Ok(RateLimiter::new(10, 60).is_allowed(user))
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn delay_on_failure_wasm(failed_attempts: u32) -> Result<(), JsValue> {
    Ok(delay_on_failure(failed_attempts))
}