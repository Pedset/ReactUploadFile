const fs = require('fs');
const Model = {};

Model.changeText = async (file, result) => {

    let wordBefore = "foo";
    let wordAfter = "bar";
    
    try { 
        var data = fs.readFileSync(file.path, 'utf8');
        let text = data.toString();

        deleteStoredFile(file.path);

        if (text!=""){
            // get the highest count for a word and also container that holds all the words used in that text
            let highestCountObj =  countMostCommonWord(text);
            // get the most common word/words used 
            let mostCommonWords = getMostCommonWords(highestCountObj.allWords, highestCountObj.highestCount);
            // change word/words in that text
            let finalText = appendBeforeAfter(wordBefore, mostCommonWords, wordAfter, text);
            let responseObj = constructResponseObj(file, finalText);
            result(null, responseObj);
        }
        else result(null, constructResponseObj(file, ""));
         
    } catch(e) {
        result(Error, JSON.parse(JSON.stringify(e, Object.getOwnPropertyNames(e))));
    }
}

function constructResponseObj (file, text){
    finalObj = {InfoMessage: "File \"" + file.originalname + "\" has been uploaded", Text: text};
    return finalObj;
}

//Deletes a file from the storage
function deleteStoredFile (filePath){
    //delete the file after reading it.
    fs.unlink(filePath, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
});
}

//count the most common word/words used in the text
function countMostCommonWord (text) {
    
    let wordByWord = text.match(/[a-zA-Z0-9]+/g);
    let wordContainer = new Map();
    let counter = 1;

    wordByWord.forEach( word =>{
        //If it doesnt exist in the container add it with a repeated time 1
        if (wordContainer.get(word.toLowerCase()) == undefined){
            wordContainer.set(word.toLowerCase(), 1);
        }else{
            if (counter < wordContainer.get(word.toLowerCase())+1){
                counter = wordContainer.get(word.toLowerCase())+1;
            }
            wordContainer.set(word.toLowerCase(), wordContainer.get(word.toLowerCase())+1);
        }
    });
    return {
        allWords: wordContainer, 
        highestCount: counter
    };
}

//This function appends a before/after string to a specific word/words throughout the text
function appendBeforeAfter (before, words, after, text){
    let finalText;
    words.forEach(word =>{
        const regex = new RegExp ("(?<!\\w)("+word+")(?!\\w)", "gi");
        finalText = text.replace(regex, before+"$1"+after)
        text = finalText;
    });
    return finalText;
}

//This function returns a Key in a Map based on seachValue(Value)
function getMostCommonWords(map, searchValue) {
    let words = [];
    for (let [key, value] of map.entries()) {
        if (value === searchValue)
        words.push(key);
    }
    return words
}

module.exports = Model;