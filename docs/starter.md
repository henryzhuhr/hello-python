---
outline: deep
---

# Python

## VSCode 中配置 Python 开发环境

### 插件安装

#### 基本的 Python 插件

下面几个插件是 Python 开发必备的插件：
- [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
- [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance)
- [Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

安装上述插件后，可以在 VSCode 的设置（全局的 `settings.json` 文件）中添加如下配置
```json
{
    "python.analysis.autoImportCompletions": true, // -- 自动导入补全 import
}
```

#### 静态代码检查 Pylint

在 VSCode 中搜索安装 [Pylint](https://marketplace.visualstudio.com/items?itemName=ms-python.pylint)，启用 Pylint 对 Python 代码进行静态检查。

安装完成后，可以在 VSCode 的设置（全局的 `settings.json` 文件）中添加如下配置
```json
{
    "pylint.enabled": true, // -- 启用 Pylint 
    "pylint.importStrategy": "useBundled",
    "pylint.args": [
        // "--disable=invalid-name,", // 建议开启检查
        "--disable=missing-module-docstring",
        "--disable=W0612,W0631,W0703,W0621,W0613,W0611,W1308,C0411,C0111,C0103,C0301,C0304,C0305,E1101,R0913,R0914,R0915,R0903",
    ],
}
```

- `"pylint.enabled": true` 表示启用 Pylint，实际上安装 Pylint 插件后默认是启用的。但是如果需要禁用 Pylint，可以设置为 `false`。、
- `"pylint.importStrategy": "useBundled"` 表示使用 Pylint 插件自带的 import 排序规则。
- `"pylint.args"` 表示 Pylint 的参数，可以参考 [Pylint Standard Checkers](https://pylint.pycqa.org/en/latest/user_guide/configuration/all-options.html) 进行配置，这里提供的是一些常用的禁用规则：
  - [`--disable`](https://pylint.pycqa.org/en/latest/user_guide/configuration/all-options.html#disable) 表示禁用指定的检查器，多个检查器之间用逗号分隔。例如禁用 `invalid-name` 是禁用变量名不符合规范的检查、`missing-module-docstring` 是禁用模块缺少文档字符串的检查。
  - `--disable=W0612,...` 则是禁用指定的警告，多个警告之间用逗号分隔。警告可以参考 [Pylint Messages](https://pylint.pycqa.org/en/latest/user_guide/messages/index.html)。
  

#### 导入包排序 isort

在 VSCode 中搜索安装 [isort](https://marketplace.visualstudio.com/items?itemName=ms-python.isort)，启用 isort 对 Python 代码进行 import 排序。

安装完成后，可以在 VSCode 的设置（全局的 `settings.json` 文件）中添加如下配置
```json
{
    "python.sortImports.args": [
        "--profile", "black",
    ],
}
```

- `"python.sortImports.args"` 表示 isort 的参数，可以参考 [isort Command Line Usage](https://pycqa.github.io/isort/docs/configuration/profiles.html) 进行配置，这里提供的是使用 `black` 风格的 import 排序规则。也可以使用 `pycharm`、`google`、`django` 等风格。

isort 也提供了一些 [Action Comments](https://pycqa.github.io/isort/docs/configuration/action_comments.html#isort-off)，可以通过注释的方式来控制 import 排序。

例如，可以使用 `# isort: off` 和 `# isort: on` 来标记不想被 isort 排序的代码块。
```python
# isort: off
import sys
import os
# isort: on
```

其他的 Action Comments 还有：
- `isort: skip_file`
- `isort: skip`
- `isort: split`


#### 类型检查 Mypy Type Checker

在 VSCode 中搜索安装 [Mypy](https://marketplace.visualstudio.com/items?itemName=ms-python.mypy-type-checker)，启用 Mypy 对 Python 代码进行类型检查。

安装完成后，可以在 VSCode 的设置（全局的 `settings.json` 文件）中添加如下配置
```json
{
    "mypy-type-checker.importStrategy": "useBundled",
    "mypy-type-checker.args": [
        "--follow-imports=skip",
        "--show-column-numbers=True",
        "--warn_return_any=True",
        "--warn-unreachable=True",
    ],
}
```

- `"mypy-type-checker.importStrategy": "useBundled"` 表示使用 Mypy 插件自带的 import 排序规则。
- `"mypy-type-checker.args"` 表示 Mypy 的参数，可以参考 [Mypy Command Line Options](https://mypy.readthedocs.io/en/stable/command_line.html) 进行配置，这里提供的是一些常用的参数：
  - [`--follow-imports`](https://mypy.readthedocs.io/en/stable/command_line.html#cmdoption-mypy-follow-imports) 表示控制 Mypy 如何处理导入。`skip` 表示跳过导入，`normal` 表示正常导入，`silent` 表示静默导入。
  - [`--show-column-numbers`](https://mypy.readthedocs.io/en/stable/command_line.html#cmdoption-mypy-show-column-numbers) 表示显示错误的列号。
  - [`--warn-return-any`](https://mypy.readthedocs.io/en/stable/command_line.html#cmdoption-mypy-warn-return-any) 表示警告返回值类型为 `Any`。
  - [`--warn-unreachable`](https://mypy.readthedocs.io/en/stable/command_line.html#cmdoption-mypy-warn-unreachable) 表示警告不可达的代码。


#### 代码格式化工具 Black

在 VSCode 中搜索安装 [Black Formatter](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter)，启用 Black 对 Python 代码进行格式化。

安装完成后，可以在 VSCode 的设置（全局的 `settings.json` 文件）中添加如下配置
```json
{
    "python.formatting.provider": "black",
    "python.formatting.blackArgs": [
        "--line-length", "88",
        "--skip-string-normalization",
    ],
}
```

- `"python.formatting.provider": "black"` 表示使用 Black 作为 Python 代码格式化工具。
- `"python.formatting.blackArgs"` 表示 Black 的参数，可以参考 [Black Command Line Usage](https://black.readthedocs.io/en/stable/usage_and_configuration/the_basics.html#command-line-options)。
  - [`--line-length`]([line](https://black.readthedocs.io/en/stable/usage_and_configuration/the_basics.html#l-line-length) 表示设置行宽，默认是 `88`。
  - [`--skip-string-normalization`](https://black.readthedocs.io/en/stable/usage_and_configuration/the_basics.html#s-skip-string-normalization) 表示跳过字符串规范化，由于 Black 会**默认将单引号字符串转换为双引号字符串**，可以使用该参数跳过这个规范化。

如果有部分代码不想被 Black 格式化，可以在代码中使用 `# fmt: skip`、 `# fmt: off` 和 `# fmt: on` 标记 [Ignoring sections](https://black.readthedocs.io/en/stable/usage_and_configuration/the_basics.html#ignoring-sections)
- `# fmt: skip` 表示跳过当前行的格式化。
- `# fmt: off` 和 `# fmt: on` 表示跳过这两个标记之间的代码块的格式化。

```python
# fmt: off
def foo():
    print("This is a long string that should not be wrapped.")
# fmt: on

print("This is a long string that should be wrapped.") # fmt: skip
```

可以使用混合注释，例如结合 pylint 和 Black 的注释
```python
# fmt: skip # pylint # noqa
```
或者逗号分隔的列表
```python
# fmt: skip; pylint; noqa
```


#### Ruff


[text](https://zhuanlan.zhihu.com/p/679246519)