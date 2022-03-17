npm run build
cp dist/notus-angular/* ../deploy-front-asvida-subscription
cp package.json ../deploy-front-asvida-subscription
cd ../deploy-front-asvida-subscription
git add *
dateDeploy=$(date)
git commit -m "Deploy $dateDeploy"
git push