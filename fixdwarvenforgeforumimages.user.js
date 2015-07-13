// ==UserScript==
// @name         Fix Dwarven Forge Forum Images
// @namespace    http://www.zacharyarmstrong.com/
// @version      0.5b
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

function fix_imagedownloads(elem,attr)
{
    var elems = document.getElementsByTagName(elem);
    for (var i = 0; i < elems.length; i++){
        var testres = (/http:\/\/(www\.|)dwarvenforge\.com\/forum\/download\/file\.php\?id\=.*/g).test(elems[i][attr]);
        if (testres === true)
        {
            if (imageExists(elems[i][attr]) === false)
            {
                var imagename = elems[i].alt;
                var newfilename = "".concat('/forum/files/',imagename);
                elems[i][attr] = newfilename;
            }
        }            
    }
}

function fix_mapmaker_links(elem,attr)
{
    var elems = document.getElementsByTagName(elem);
    for (var i = 0; i < elems.length; i++){
        var testres = (/http:\/\/(www\.|)dwarvenforge\.com\/mapmaker\/.*/g).test(elems[i][attr]);
        if (testres === true)
        {       
            elems[i][attr]  = elems[i][attr].replace(/.*dwarvenforge.com\/mapmaker\/(.*)/, 'http://mapmaker.dwarvenforge.com/mapmaker/$1')
            elems[i][attr] = unescape(elems[i][attr]);
        }            
    }
}

function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}

console.log("Fix Dwarven Forge Forum Images launched");
replace_url('a', 'href');
replace_url('img', 'src');
remove_badimages('img', 'src');
fix_imagedownloads('img', 'src');
fix_mapmaker_links('a','href');
