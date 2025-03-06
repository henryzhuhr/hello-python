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


async def main2():
    optimizer = NetworkStream([f"chunk{i}" for i in range(10)])

    # 并发处理所有数据
    tasks = [optimizer.__anext__() for _ in range(len(optimizer.data))]
    results = await asyncio.gather(*tasks)

    for result in results:
        print(f"Received: {result}")


# asyncio.run(main())
asyncio.run(main2())
