---
outline: deep
---

# Pytest

[pytest](https://docs.pytest.org/)

[文档](https://docs.pytest.org/en/latest/getting-started.html#getstarted)

## pytest


安装 
```sh
pip3 install -U pytest
```

## 测试文件
### 单文件测试

创建 `test_sample.py` 文件，测试函数以 `test_` 开头，pytest会自动找到全部测试函数，并且
```py
# content of test_sample.py
def inc(x):
    return x + 1


def test_answer():
    assert inc(3) == 5
```

运行 `python3 test_sample.py`
::: details 点击查看测试结果
```sh
$ python3 test_sample.py
============================= test session starts ==============================
platform darwin -- Python 3.8.12, pytest-7.0.1, pluggy-1.0.0
rootdir: /home/hipy/project
collected 1 item

test_sample.py F                                                         [100%]

=================================== FAILURES ===================================
_________________________________ test_answer __________________________________

    def test_answer():
>       assert inc(3) == 5
E       assert 4 == 5
E        +  where 4 = inc(3)

test_sample.py:7: AssertionError
=========================== short test summary info ============================
FAILED test_sample.py::test_answer - assert 4 == 5
============================== 1 failed in 0.01s ===============================
```
:::
会给出测试的详情，

### 多文件测试
`pytest` 会测试当前目录及子目录下全部 `test_*.py` 和 `*_test.py` 文件，遵循[约定的测试目录规则](https://docs.pytest.org/en/latest/explanation/goodpractices.html#test-discovery)


## 测试
### 在一个类内对多个测试进行分组

`pytest` 会测试 `.py` 文件中以 `Test*` 开头的类，并且测试类中以 `test_` 开头的函数
```py
# content of test_class.py
class TestClass:
    def test_one(self):
        x = "this"
        assert "h" in x

    def test_two(self):
        x = "hello"
        assert hasattr(x, "check")
```
::: details 点击查看测试结果
```sh
============================= test session starts ==============================
platform darwin -- Python 3.8.12, pytest-7.0.1, pluggy-1.0.0
rootdir: /Users/henryzhu/project/Hello-Python/src/3rdparty/_pytest
collected 2 items

test_class.py .F                                                         [100%]

=================================== FAILURES ===================================
______________________________ TestClass.test_two ______________________________

self = <test_class.TestClass object at 0x101606880>

    def test_two(self):
        x = "hello"
>       assert hasattr(x, "check")
E       AssertionError: assert False
E        +  where False = hasattr('hello', 'check')

test_class.py:9: AssertionError
=========================== short test summary info ============================
FAILED test_class.py::TestClass::test_two - AssertionError: assert False
========================= 1 failed, 1 passed in 0.01s ==========================
```
:::
`test_one` 通过了测试，而 `test_two` 没有通过测试并且给出了报错信息

在类中对测试进行分组的时候，需要注意一个特殊的情况，每一个测试都有唯一的类实例，这是为了使得测试之间是隔离的，例如
```py
# content of test_class_demo.py
class TestClassDemoInstance:
    value = 0

    def test_one(self):
        self.value = 1
        assert self.value == 1

    def test_two(self):
        assert self.value == 1
```
这时候会发现 test_two 测试报错
::: details 点击查看测试结果
```sh
============================= test session starts ==============================
platform darwin -- Python 3.8.12, pytest-7.0.1, pluggy-1.0.0
rootdir: /Users/henryzhu/project/Hello-Python/src/3rdparty/_pytest
collected 2 items

test_class_demo.py .F                                                    [100%]

=================================== FAILURES ===================================
________________________ TestClassDemoInstance.test_two ________________________

self = <test_class_demo.TestClassDemoInstance object at 0x1017fa850>

    def test_two(self):
>       assert self.value == 1
E       assert 0 == 1
E        +  where 0 = <test_class_demo.TestClassDemoInstance object at 0x1017fa850>.value

test_class_demo.py:11: AssertionError
=========================== short test summary info ============================
FAILED test_class_demo.py::TestClassDemoInstance::test_two - assert 0 == 1
========================= 1 failed, 1 passed in 0.01s ==========================
```
:::

在 pytest 中，类内的分组测试是相互隔离的，而在类级别添加的属性是类属性，在测试之间是共享的。可以理解为如下情况
```py
# test one
test_one_instance = TestClassDemoInstance()
test_one_instance.test_one()

# test two
test_two_instance = TestClassDemoInstance()
test_two_instance.test_two()
```

## 命令行参数

### -q/--quiet

The `-q/--quiet` flag keeps the output brief in this and following examples.