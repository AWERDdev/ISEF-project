use std::collections::HashMap;
use std::time::{Duration, Instant};

pub struct RateLimiter {
    attempts: HashMap<String, (u32, Instant)>,
    max_attempts: u32,
    window: Duration,
}

impl RateLimiter {
    pub fn new(max_attempts: u32, window_secs: u64) -> Self {
        Self {
            attempts: HashMap::new(),
            max_attempts,
            window: Duration::from_secs(window_secs),
        }
    }

    pub fn is_allowed(&mut self, user: &str) -> bool {
        let now = Instant::now();
        let entry = self.attempts.entry(user.to_string()).or_insert((0, now));
        if now.duration_since(entry.1) > self.window {
            *entry = (1, now);
            true
        } else if entry.0 < self.max_attempts {
            entry.0 += 1;
            true
        } else {
            false
        }
    }
}

use std::thread::sleep;

pub fn delay_on_failure(failed_attempts: u32) {
    if failed_attempts > 0 {
        let delay = 2u64.pow(failed_attempts.min(5)); // Exponential backoff, max 32s
        println!("Delaying for {} seconds...", delay);
        sleep(Duration::from_secs(delay));
    }
}

use rand::Rng;
use std::io::{self, Write};

pub fn text_captcha() -> bool {
    let a = rand::thread_rng().gen_range(1..10);
    let b = rand::thread_rng().gen_range(1..10);
    print!("What is {} + {}? ", a, b);
    io::stdout().flush().unwrap();
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    input.trim() == (a + b).to_string()
}