### 异步上下文管理器
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
