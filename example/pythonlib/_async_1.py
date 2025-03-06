import asyncio
from time import sleep


async def hello1():
    sleep(1)  # 阻塞函数
    print("run 2")
    return "Hello, World!"


async def main1():
    await hello1()
    print("run 1")


asyncio.run(main1())

"""
"""


async def hello2():
    await asyncio.sleep(1)  # 非阻塞函数
    print("run 2")
    return "Hello, World!"


async def main2():
    await hello2()
    print("run 1")


asyncio.run(main2())

