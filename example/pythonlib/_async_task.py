import asyncio


async def task1_func():
    await asyncio.sleep(1)
    print("Task 1 completed")


async def task2_func():
    await asyncio.sleep(1)
    print("Task 2 completed")


async def main():
    task1 = asyncio.create_task(task1_func())
    task2 = asyncio.create_task(task2_func())
    # 等待所有任务完成
    await task1
    await task2


asyncio.run(main())
