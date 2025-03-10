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


async def main():
    async for i in AsyncIterator(3):
        print(i)


asyncio.run(main())


class NetworkStream:
    def __init__(self, data):
        self.data = data
        self.index = 0

    def __aiter__(self):
        return self

    async def __anext__(self):
        await asyncio.sleep(0.1)  # 模拟网络延迟
        if self.index < len(self.data):
            result = self.data[self.index]
            self.index += 1
            return result
        raise StopAsyncIteration


async def main_1():
    async for chunk in NetworkStream(["chunk1", "chunk2", "chunk3"]):
        print(f"Received: {chunk}")


asyncio.run(main_1())


async def mock_network_stream(data):
    await asyncio.sleep(1)  # 模拟网络延迟
    return data
