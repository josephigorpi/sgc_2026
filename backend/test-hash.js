import bcrypt from 'bcryptjs';

const testPassword = 'UntSgc2026!';
const hashFromSeeder = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

console.log('Testing password:', testPassword);
console.log('Hash from seeder:', hashFromSeeder);

bcrypt.compare(testPassword, hashFromSeeder, (err, result) => {
  if (err) {
    console.error('Error comparing:', err);
  } else {
    console.log('Password matches seeder hash:', result);
  }
});

// Generate new hash
bcrypt.hash(testPassword, 10, (err, newHash) => {
  if (err) {
    console.error('Error hashing:', err);
  } else {
    console.log('New hash:', newHash);
  }
});
