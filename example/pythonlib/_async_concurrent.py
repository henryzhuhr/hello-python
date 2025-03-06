# 并发执行
import asyncio
import time


async def task1(i: int):
    print(f'Task {i} started')
    await asyncio.sleep(1)
    print(f'Task {i} completed')


if __name__ == '__main__':

    start_time = time.time()  # 程序启动时间
    loop = asyncio.get_event_loop()  # 获取本机事件循环

    tasks = [loop.create_task(task1(i)) for i in range(4)]  # 生成4个任务

    loop.run_until_complete(asyncio.wait(tasks))  # run_until_complete()直到所有循环  循环结束
    loop.close()  # 事件循环关闭
    print(f"use time: {time.time() - start_time}")
