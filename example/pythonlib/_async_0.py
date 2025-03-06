import asyncio


async def hello():
    return "Hello, World!"


async def main1():
    text = await hello()
    print(text)


async def main2():
    coroutine = hello()
    text = await coroutine
    print(text)


asyncio.run(main1())
asyncio.run(main2())