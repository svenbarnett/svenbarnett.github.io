'use strict';

var cheerio = require('cheerio');

function getPosition(str, m, i) {
  return str.split(m, i).join(m).length;
}

hexo.extend.filter.register('after_post_render', function(data){   
    var config = hexo.config;
    if(config.post_asset_folder){
        var link = data.permalink.replace(config.url,'');
        var pageimageroot = link
        console.info(link)
        var beginPos = getPosition(link, '/', 3) + 1;
        var appendLink = '';
        // In hexo 3.1.1, the permalink of "about" page is like ".../about/index.html".
        // if not with index.html endpos = link.lastIndexOf('.') + 1 support hexo-abbrlink
        if(/.*\/index\.html$/.test(link)) {
        // when permalink is end with index.html, for example 2019/02/20/xxtitle/index.html
        // image in xxtitle/ will go to xxtitle/index/
        appendLink = 'index/';
        var endPos = link.lastIndexOf('/');
        }
        else {
        var endPos = link.lastIndexOf('.');
        }
        link = link.substring(beginPos, endPos) + '/' + appendLink;

        var toprocess = ['excerpt', 'more', 'content'];
        for(var i = 0; i < toprocess.length; i++){
        var key = toprocess[i];

            var $ = cheerio.load(data[key], {
                ignoreWhitespace: false,
                xmlMode: false,
                lowerCaseTags: false,
                decodeEntities: false
            });

            $('video').each(function(){
                if ($(this).attr('src')){
                    var src = $(this).attr('src').replace('\\', '/');
                    var srcArray = src.split('/').filter(function(elem){
                        return elem != '' && elem != '.';
                    });
                    if(srcArray.length > 1)
                    srcArray.shift();
                    src = srcArray.join('/');                     
                    $(this).attr('src',  pageimageroot + src);
                    console.info && console.info("update video link as:-->"+ pageimageroot + src);
                }
            });
            data[key] = $.html();        
        }
    }
});
