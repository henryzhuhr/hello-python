import asyncio
import time


async def fetch_data(url):
    print(f"Fetching data from {url}")
    await asyncio.sleep(1)  # 模拟网络延迟，确保是也是异步的
    print(f"Data fetched from {url}")


async def main():
    urls = [
        "https://example.com",
        "https://httpbin.org",
        "https://jsonplaceholder.typicode.com",
    ]
    tasks = [fetch_data(url) for url in urls]
    await asyncio.gather(*tasks)


time_start = time.time()
asyncio.run(main())
time_end = time.time()
print(f"Time taken: {time_end - time_start:.2f} seconds")
