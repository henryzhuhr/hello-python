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
