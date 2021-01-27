var fs = require('fs');
var path = require('path')
var join = path.join
function getJsonFiles(jsonPath){
    let jsonFiles = [];
    function findJsonFile(path){
        let files = fs.readdirSync(path);
        files.forEach(function (item, index) {
            let fPath = join(path,item);
            let stat = fs.statSync(fPath);
            if(stat.isDirectory() === true) {
                findJsonFile(fPath);
            }
            if (stat.isFile() === true) { 
              jsonFiles.push(fPath);
            }
        });
    }
    findJsonFile(jsonPath);
    return jsonFiles
}
let resolvePath = path.resolve(__dirname,"../three/examples/jsm/")
let jsonFileList = getJsonFiles(resolvePath)
let threeExamples = []
jsonFileList.forEach((filePath, i) => {
    let fileName = filePath.split("\\")
    fileName = fileName[fileName.length-1].split(".")
    if(fileName[1]!="d"){
        myThreeExamples.push({
            test: require.resolve(filePath),
            use: `imports-loader?THREE=three`
        })
        myThreeExamples.push({
            test: require.resolve(filePath),
            use: `exports-loader?THREE.${fileName[0]}`
        })
    }
    
})
module.exports = threeExamples
