---
outline: deep
---


# 异步编程


同步和异步：
- **同步**：同步编程是一种线性执行模型，代码按顺序执行。每个任务必须等待前一个任务完成后才能开始，任务之间是阻塞的。
- **异步**：异步编程是一种非阻塞执行模型，允许任务在等待某些操作完成时释放控制权，让其他任务继续执行。通过事件循环调度任务，使用回调、`await` 或通知机制来处理任务结果。

并发和并行：
- **并发**：通过事件循环调度多个任务交替执行，适合处理 I/O 密集型任务。
- **并行**：通过多线程或多进程实现多个任务真正同时运行，适合处理 CPU 密集型任务。


## 异步和协程函数

::: code-group
```python [example/pythonlib/_async_0.py]
import asyncio

async def hello(): 
    return "Hello, World!"

async def main():
    text = await hello() 
    print(text) # Hello, World!

asyncio.run(main())
```
:::

使用 `async def` 定义的函数被称为**协程函数 (coroutine function)** ，调用协程函数时，它不会立即执行，而是返回一个**协程对象 (coroutine object)**，例如：

```python
coroutine = hello()
print(coroutine)        # <coroutine object hello at 0x101519590>>
print(type(coroutine))  # <class 'coroutine'>
```

`await` 关键字用于**挂起（暂停）当前协程的执行**，等待另一个协程执行完成后再继续执行当前协程。因此 `await` 后面通常跟一个协程对象。上面的例子也可以写成：

```python
async def main():
    coroutine = hello()
    text = await coroutine
    print(text) # Hello, World!
```

在上述例子中，`await hello()` 会等待 `hello()` 协程函数执行完成，才会继续执行 `print(text)` 语句。

需要注意，`await` 关键字只能在协程函数中使用，否则会报错。
```python
def hello():
    await asyncio.sleep(1)
hello() # SyntaxError: 'await' outside async function
```

上述定义的 `main()` 函数是一个协程函数，我们可以使用 `asyncio.run()` 函数来运行它。

`asyncio.run()` 是 Python 3.7 后引入的特性，用于运行一个协程函数，它会创建一个新的事件循环，并运行传入的协程函数，然后关闭事件循环。

`asynco.run()` 适用于运行顶层协程（即整个异步程序的入口点），通常只在程序的最外层调用一次。注意，`asyncio.run()` 会创建一个新的事件循环并运行传入的协程函数，因此不能在事件循环已经运行的情况下再次调用，否则会抛出 `RuntimeError`。 
```python
asyncio.run(main())  # 正常运行
asyncio.run(main())  # RuntimeError: Cannot run the event loop while another loop is running
```


## 协程的挂起

前面有提到，`await` 关键字用于挂起当前协程的执行。什么是挂起呢？挂起是指当前协程暂停执行，将控制权交还给事件循环，由事件循环调度其他任务。当挂起的协程完成其等待的操作后，事件循环会恢复该协程的执行。 


用下面一个例子来说明挂起的概念：

::: code-group
```python [example/pythonlib/_async_network.py]
import asyncio
async def fetch_data(url):
    print(f"Fetching data from {url}")
    await asyncio.sleep(1)  # 模拟网络延迟
    print(f"Data fetched from {url}")

async def main():
    urls = ["https://example.com", "https://httpbin.org", "https://jsonplaceholder.typicode.com"]
    tasks = [fetch_data(url) for url in urls]
    await asyncio.gather(*tasks) # 并发执行所有任务，并等待它们全部完成

asyncio.run(main()) # 运行时长 1s
# 打印输出：
# Fetching data from https://example.com
# Fetching data from https://httpbin.org
# Fetching data from https://jsonplaceholder.typicode.com
# Data fetched from https://example.com
# Data fetched from https://httpbin.org
# Data fetched from https://jsonplaceholder.typicode.com
```

代码中可以看到，`fetch_data()` 协程函数中使用了 `await asyncio.sleep(1)` 语句，模拟了网络请求的延迟：
- 当执行到 `await asyncio.sleep(1)` 时，`fetch_data()` 协程函数会挂起，模拟网络请求的延迟。在此期间，**控制权交还给事件循环，事件循环会调度其他任务执行，从而实现并发**。 因此会先输出 `Fetching data from https://example.com`，然后事件循环会调度第二个任务、然后是第三个。
- 等待模拟的网络请求延迟结束后，`fetch_data()` 协程函数会恢复执行，依次输出 `Data fetched from *`

<!-- 这个例子中，需要注意的是，这里只消耗了1秒的时间，但是 -->


## 事件循环

在前面的部分，我们使用了 `asyncio.run()` 函数来运行协程函数，它会自动创建一个新的事件循环。在某些情况下，我们可能需要手动创建事件循环，例如在一个已经存在事件循环的应用中运行协程函数。

`asyncio` 中提供了`new_event_loop()` 创建一个新的事件循环，`set_event_loop()` 设置当前线程的事件循环，例如：

```python
import asyncio

async def hello():
    print("Hello")
    await asyncio.sleep(1)
    print("World")

# 手动创建事件循环
loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)

# 运行协程
try:
    loop.run_until_complete(hello())
finally:
    loop.close()  # 关闭事件循环
```


`asyncio` 提供了两种方式来创建事件循环：

|              | 自动创建事件循环             | 手动创建事件循环                         |
| ------------ | ---------------------------- | ---------------------------------------- |
| 方法         | `asyncio.run()`              | `asyncio.new_event_loop()`               |
| 作用         | 启动事件循环并运行顶层协程   | 嵌套异步代码、多线程环境、自定义事件循环 |
| 使用场景     | 程序的最外层入口点           | 需要手动创建、运行和关闭事件循环         |
| 事件循环管理 | 自动创建、运行和关闭事件循环 | 提供更高的灵活性，适合复杂场景           |
| 调用次数     | 只能调用一次                 | 可以多次调用，创建多个事件循环           |
| 灵活性       | 简化代码，适合简单场景       | 提供更高的灵活性，适合复杂场景           |
| 是否支持嵌套 | 不支持嵌套调用               | 支持嵌套事件循环                         |


## 并发任务

#### 创建任务对象

Python 3.7 引入了 [`create_task()`](https://docs.python.org/zh-cn/3.7/library/asyncio-task.html#asyncio.create_task) 函数，用于创建一个任务对象（将协程函数包装成一个任务对象），然后通过 `await` 关键字执行任务对象，使其能够在事件循环中并发执行。

::: code-group 
```python [example/pythonlib/_async_task.py]
import asyncio

async def task1_func():
    await asyncio.sleep(1)
    print("Task 1 completed")

async def task2_func():
    await asyncio.sleep(1)
    print("Task 2 completed")

async def main():
    task1 = asyncio.create_task(task1_func()) # type: <Task pending name='Task-2' coro=<hello() running at /path/to/file.py:2>>
    task2 = asyncio.create_task(task2_func())
    # 等待所有任务完成
    await task1
    await task2

asyncio.run(main())
```
:::

#### 并发执行收集结果

`asyncio` 提供了 [`gather()`](https://docs.python.org/zh-cn/3.7/library/asyncio-task.html#asyncio.gather) 函数，用于并发执行多个协程函数，并收集结果。

::: code-group
```python [example/pythonlib/_async_1.py]
import asyncio

async def task1(): return "Result 1"
async def task2(): return "Result 2"

async def main():
    results = await asyncio.gather(task1(), task2())
    print(results)

asyncio.run(main())
```
:::

`gather()` 函数接收多个协程函数作为参数，返回一个包含所有协程函数结果的列表，列表中的元素顺序与传入的协程函数顺序一致，这样就可以方便地收集多个协程函数的结果。


## 异步迭代器和异步上下文管理器

Python 3.6 引入了异步迭代器和异步上下文管理器，用于支持异步编程。


### 异步迭代器

异步迭代器是一种特殊的迭代器，支持在异步环境中使用 `async for` 进行遍历。
要实现一个异步迭代器，必须定义两个方法：
- `__aiter__()`: 返回异步迭代器对象本身。这是异步迭代器协议的一部分，告诉 Python 如何获取迭代器。
- `__anext__()`: 返回下一个值，或者抛出 `StopAsyncIteration` 异常以终止迭代。

::: code-group

```python [example/pythonlib/_async_iterator.py]
import asyncio

class AsyncIterator:
    def __init__(self, n: int):
        self.i = 0  # 迭代器的起始值
        self.n = n  # 迭代器的最大值

    def __aiter__(self):
        return self

    async def __anext__(self):
        if self.i < self.n:
            i = self.i
            self.i += 1
            return i
        raise StopAsyncIteration
```
:::

异步迭代器 `AsyncIterator` 需要使用 `async for` `进行遍历，每次迭代时，会调用 `__anext__()` 方法，返回下一个值，直到抛出 `StopAsyncIteration` 异常。例如：

```python
async def main():
    async for i in AsyncIterator(3):
        print(i)

asyncio.run(main())
```

异步迭代器通常用于处理 I/O 密集型任务，例如：

- 从网络流中逐块读取数据。
- 处理实时数据流（如 WebSocket 或 Kafka 消息）。
- 并发地生成或消费大量数据。
例如，以下是一个模拟从网络流中读取数据的异步迭代器示例：

```python
import asyncio

class NetworkStream:
    def __init__(self, data):
        self.data = data
        self.index = 0

    def __aiter__(self):
        return self

    async def __anext__(self):
        await asyncio.sleep(1)  # 模拟网络延迟
        if self.index < len(self.data):
            result = self.data[self.index]
            self.index += 1
            return result
        raise StopAsyncIteration


async def main():
    async for chunk in NetworkStream(["chunk1", "chunk2", "chunk3"]):
        print(f"Received: {chunk}")

asyncio.run(main())
```

虽然使用了异步迭代器和 `async for`，但并没有真正利用异步的优势来提高效率 。这是因为代码中的异步迭代器并没有包含任何实际的异步操作（如 I/O 操作或并发任务），因此它的行为与普通的同步迭代器几乎完全相同。

<!-- 异步迭代器本身并不能直接加快程序的运行速度，但它可以通过 并发 和 非阻塞操作 来提高程序的整体效率。具体来说，异步迭代器的核心优势在于能够在等待某些耗时操作（如 I/O 操作）完成时释放控制权给事件循环，从而允许其他任务继续执行。 -->

原因如下：
- `__anext__()` 方法是一个异步函数，但它内部没有任何耗时的异步操作（如 `await asyncio.sleep()` 或网络请求）。
- 异步函数本身并不会自动提高效率，它只是提供了一种机制，允许在等待某些操作完成时释放控制权给事件循环。
- 因此，这段代码的行为实际上是顺序执行的，每次调用 `__anext__()` 都会立即返回结果，而没有并发或非阻塞的优势。

```python
async def main():
    optimizer = NetworkStream([f"chunk{i}" for i in range(10)])

    # 并发处理所有数据
    tasks = [optimizer.__anext__() for _ in range(len(optimizer.data))]
    results = await asyncio.gather(*tasks)

    for result in results:
        print(f"Received: {result}")
```


### 异步上下文管理器

```python
# python example/pythonlib/_async_context_manager.py
import asyncio

async def test():
    print('Execution started')
    await asyncio.sleep(1)
    print('Execution completed')
    return 'Result'

class AsyncContextManager:
    async def __aenter__(self):
        print('Enter')
        return 'Value'

    async def __aexit__(self, exc_type, exc, tb):
        print('Exit')
        
async def main():
    async with AsyncContextManager() as acm:
        print(acm)
        result = await test()
        print(result)
        
asyncio.run(main())
```

异步上下文管理器是一个实现了 `__aenter__()` 和 `__aexit__()` 方法的类，用于在 `async with` 语句中管理资源。`__aenter__()` 方法返回一个值，可以在 `as` 关键字后面的变量中获取到。