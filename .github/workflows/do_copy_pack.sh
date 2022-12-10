#!/bin/bash

set -e

cp ./pack/hexo-asset-image/index.js ./node_modules/hexo-asset-image/index.js

cp ./pack/hexo-generator-restful/lib/generator.js ./node_modules/hexo-generator-restful/lib/generator.js

echo 'Copy Pack js ok!!!'
