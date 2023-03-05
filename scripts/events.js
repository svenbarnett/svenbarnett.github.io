var exec = require('child_process').exec;
// new 后自动打开编辑器
hexo.on('new', function (data) {
  console.log('code ' + data.path);
  exec('code ' + data.path);
});
