use rust_lib::{create_token, verify_token, hash_password, verify_password, validate_password};

fn main() {
    // Example password validation and hashing
    let password = "TestPassword123!";
    match validate_password(password) {
        Ok(()) => println!("Password is valid!"),
        Err(e) => println!("Password validation error: {}", e),
    }

    match hash_password(password) {
        Ok(hashed) => {
            println!("Password hashed: {}", hashed);
            
            // Verify the password
            match verify_password(password, &hashed) {
                Ok(true) => println!("Password verified successfully!"),
                Ok(false) => println!("Password verification failed!"),
                Err(e) => println!("Password verification error: {:?}", e),
            }
        },
        Err(e) => println!("Password hashing error: {:?}", e),
    }

    // Example token creation and verification
    match create_token("user123") {
        Ok(token) => {
            println!("Token created: {}", token);
            
            // Verify the token
            match verify_token(&token) {
                Ok(claims) => println!("Token verified! Claims: {:?}", claims),
                Err(e) => println!("Token verification error: {}", e),
            }
        },
        Err(e) => println!("Token creation error: {}", e),
    }
} 