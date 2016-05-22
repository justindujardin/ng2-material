echo "Updating source files in dist"
grunt copy:npm
echo "Removing ng2-material from node_modules"
rm -rf ./node_modules/ng2-material
echo "OK, installing fresh copy"
npm i
echo "DONE"
