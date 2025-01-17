# logging

## Logging facility for Python

## Usage

```python
import logging


def get_logger():
    # 创建一个 logger 对象
    logger = logging.getLogger(__name__)

    # 设置最低的日志级别
    logger.setLevel(logging.INFO)

    # 创建控制台处理器并设置其日志级别
    ch = logging.StreamHandler()
    ch.setLevel(logging.INFO)

    # 定义日志格式，并包含文件名、行号等信息
    formatter = logging.Formatter(
        "[%(asctime)s]"  # 时间
        "[%(name)s]"  # logger 名称
        "[%(levelname)s]"  # 日志级别
        "[%(filename)s:%(lineno)d]"  # 文件名和行号
        "[%(funcName)s()]"  # 函数名
        "[%(message)s]"  # 日志信息
    )

    # 将格式化器添加到处理器
    ch.setFormatter(formatter)

    # 将处理器添加到 logger
    logger.addHandler(ch)
    return logger


def main():
    logger = get_logger()
    try:
        1 / 0
    except ZeroDivisionError as e:
        logger.error(f"An error occurred: {e}")


if __name__ == "__main__":
    main()
```


日志格式化字符串中的各个字段含义如下：
| 字段        | 含义               |输出示例             |
| ----------- | ------------------ |-------------------- |
| `asctime`   | 日志时间           | `2021-08-01 12:00:00` |
| `name`      | 日志记录器名称     | `__main__`          |
| `levelname` | 日志级别           | `ERROR`             |
| `filename`  | 日志记录所在文件名 | `logging.py`        |
| `lineno`    | 日志记录所在行号   | `10`                |
| `funcName`  | 日志记录所在函数名 | `main()`            |
| `message`   | 日志消息内容       | `error...` |
