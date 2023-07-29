## build

**webpack.config.js**

  ```js
  // watch
  const build = require('build.react/build/option.watch')
  const utils = require('build.react/build/utils')

  module.exports = utils.getAutoPort(8080).then(port => {
    return build({}, (envConfig) => {
      return {}
    })
  })

  // build
  const build = require('build.react/build/option.build')

  module.exports = build({}, (envConfig) => {
    return {}
  })
  ```

**babel.config.js**

  ```js
  module.exports = {
    extends: '../../build/react/babel.config.js'
  }
  ```

**.eslintrc**

  ```json
  {
    "extends": "../../build/react/.eslintrc"
  }
  ```

**tsconfig.json**

  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "noEmit": true,
      "types": [
        "build.react/lib/typings.d.ts"
      ]
    },
    "extends": "../../build/react/tsconfig.json"
  }
  ```

## eslint

  - js

    - 字符串必须使用单引号
    - 文件末尾使用换行符
    - 使用2个空格缩进
    - 禁用debugger
    - 不使用var
    - 禁用alert confirm prompt
    - 不能对var声明的变量使用delete操作符
    - 不使用分号
    - 禁用不规则的空白
    - 函数调用时，函数名与()之间不能有空格
    - 行末不使用空格

  - jsx
    - 属性中必须使用双引号
    - 省略属性值为true的赋值
    - 多行属性，右括号另起一行
    - 大括号内首尾不使用空格
    - 属性赋值不使用空格

## 其他
