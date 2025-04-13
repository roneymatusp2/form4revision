@echo off
echo Pushing Form 4 Revision changes to GitHub...

echo First, make sure you've created a new repository for Form 4 Revision on GitHub
echo and set it as your remote with:
echo git remote add origin https://github.com/yourusername/Form4EOYrevision.git

git add .
git commit -m "Initial commit for Form 4 EOY Revision"
git push -u origin main

echo Done! Now you can deploy on Netlify.
