
// 首页文字封面图生成url 辅助函数
hexo.extend.helper.register('url_for_img', function(post_url, img_url){
  return post_url.replace('.html', '/') + img_url
});