use hmac::{Hmac, Mac};
use jwt::{SignWithKey, VerifyWithKey};
use sha2::Sha256;
use std::collections::BTreeMap;
use chrono::{Utc, Duration};
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    sub: String,
    exp: i64,
    iat: i64,
}

pub fn create_token(user_id: &str) -> Result<String, String> {
    println!("Creating Token");
    
    // Create signing key
    let key: Hmac<Sha256> = Hmac::new_from_slice(b"your-secret-key")
        .map_err(|e| format!("Key error: {}", e))?;
    
    // Create claims
    let mut claims = BTreeMap::new();
    let exp = Utc::now() + Duration::hours(24);
    let exp_str = exp.timestamp().to_string();
    let iat_str = Utc::now().timestamp().to_string();
    
    claims.insert("sub", user_id);
    claims.insert("exp", &exp_str);
    claims.insert("iat", &iat_str);
    
    // Sign and create token
    let token = claims.sign_with_key(&key)
        .map_err(|e| format!("Token signing error: {}", e))?;
    
    println!("Token created");
    Ok(token)
}

pub fn verify_token(token: &str) -> Result<BTreeMap<String, String>, String> {
    println!("Verifying Token");
    
    let key: Hmac<Sha256> = Hmac::new_from_slice(b"your-secret-key")
        .map_err(|e| format!("Key error: {}", e))?;
    
    let claims = token.verify_with_key(&key)
        .map_err(|e| format!("Token verification error: {}", e))?;
    
    println!("Token verified");
    Ok(claims)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_token_creation_and_verification() {
        let user_id = "test_user";
        let token = create_token(user_id).unwrap();
        let claims = verify_token(&token).unwrap();
        
        assert_eq!(claims.get("sub").unwrap(), user_id);
    }
} 