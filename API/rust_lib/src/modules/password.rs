use argon2::{
    password_hash::{
        rand_core::OsRng,
        PasswordHash, PasswordHasher, PasswordVerifier, SaltString
    },
    Argon2
};

#[derive(Debug)]
pub enum PasswordError {
    HashingError(String),
    VerificationError(String),
}

pub fn hash_password(password: &str) -> Result<String, PasswordError> {
    // Generate a random salt
    let salt = SaltString::generate(&mut OsRng);
    
    // Create Argon2 instance with custom parameters
    let argon2 = Argon2::default();
    
    // Hash the password
    argon2.hash_password(password.as_bytes(), &salt)
        .map(|hash| hash.to_string())
        .map_err(|e| PasswordError::HashingError(e.to_string()))
}

pub fn verify_password(password: &str, hash: &str) -> Result<bool, PasswordError> {
    // Parse the hash string
    let parsed_hash = PasswordHash::new(hash)
        .map_err(|e| PasswordError::VerificationError(e.to_string()))?;
    
    // Verify password
    Ok(Argon2::default()
        .verify_password(password.as_bytes(), &parsed_hash)
        .is_ok())
}

pub fn validate_password(password: &str) -> Result<(), String> {
    // Check length
    if password.len() < 8 {
        return Err("Password must be at least 8 characters".to_string());
    }
    
    // Check complexity
    let has_uppercase = password.chars().any(|c| c.is_uppercase());
    let has_lowercase = password.chars().any(|c| c.is_lowercase());
    let has_digit = password.chars().any(|c| c.is_digit(10));
    let has_special = password.chars().any(|c| !c.is_alphanumeric());
    
    if !has_uppercase || !has_lowercase || !has_digit || !has_special {
        return Err("Password must contain uppercase, lowercase, number, and special character".to_string());
    }
    
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_password_hash_and_verify() {
        let password = "TestPassword123!";
        let hash = hash_password(password).unwrap();
        assert!(verify_password(password, &hash).unwrap());
        assert!(!verify_password("wrong_password", &hash).unwrap());
    }

    #[test]
    fn test_password_validation() {
        assert!(validate_password("TestPassword123!").is_ok());
        assert!(validate_password("short").is_err());
        assert!(validate_password("nocapital123!").is_err());
        assert!(validate_password("NOCAPS123!").is_err());
        assert!(validate_password("NoSpecial123").is_err());
        assert!(validate_password("NoNumbers!").is_err());
    }
} 