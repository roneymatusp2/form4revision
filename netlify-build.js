// This script ensures CI=false is set cross-platform and handles peer dependency issues
process.env.CI = 'false';

try {
  console.log('Building React application with legacy peer deps...');
  require('child_process').execSync('react-scripts build --legacy-peer-deps', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed with error:', error.message);
  console.log('Attempting fallback build method...');
  try {
    require('child_process').execSync('npx react-scripts build --legacy-peer-deps', { stdio: 'inherit' });
    console.log('Fallback build completed successfully!');
  } catch (fallbackError) {
    console.error('All build attempts failed. Please check dependencies and TypeScript version compatibility.');
    process.exit(1);
  }
}