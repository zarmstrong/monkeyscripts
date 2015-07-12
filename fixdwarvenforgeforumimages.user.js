// ==UserScript==
// @name         Fix Dwarven Forge Forum Images
// @namespace    http://www.zacharyarmstrong.com/
// @version      0.2
// @description  This script fixes images that were broken due to the forum upgrade on dwarven forge forums. 
// @author       Zach Armstrong
// @include        http://www.dwarvenforge.com/forum/*
// @include        http://dwarvenforge.com/forum/*
// @grant        none
// ==/UserScript==


function replace_url(elem, attr) {
    var elems = document.getElementsByTagName(elem);
    for (var i = 0; i < elems.length; i++){
        elems[i][attr] = elems[i][attr].replace('http://192.169.214.133/forum/files/', '/forum/files/');
        elems[i][attr] = unescape(elems[i][attr]);
    }
}

function remove_badimages(elem,attr)
 {
    var elems = document.getElementsByTagName(elem);
    for (var i = 0; i < elems.length; i++){
        var testres = (/http:\/\/(www\.|)dwarvenforge\.com\/forum\/viewtopic\.php\?f\=.*/g).test(elems[i][attr]);
        if (testres === true)
            elems[i].parentNode.removeChild(elems[i]);
    }
}
    
console.log("Fix Dwarven Forge Forum Images launched");
replace_url('a', 'href');
replace_url('img', 'src');
remove_badimages('img', 'src');
