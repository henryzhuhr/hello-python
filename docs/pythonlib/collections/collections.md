

# collections
## all

[collections](https://docs.python.org/3/library/collections.html)

```
'''This module implements specialized container datatypes providing
alternatives to Python's general purpose built-in containers, dict,
list, set, and tuple.

* namedtuple   factory function for creating tuple subclasses with named fields
* deque        list-like container with fast appends and pops on either end
* ChainMap     dict-like class for creating a single view of multiple mappings
* Counter      dict subclass for counting hashable objects
* OrderedDict  dict subclass that remembers the order entries were added
* defaultdict  dict subclass that calls a factory function to supply missing values
* UserDict     wrapper around dictionary objects for easier dict subclassing
* UserList     wrapper around list objects for easier list subclassing
* UserString   wrapper around string objects for easier string subclassing

'''
```

## deque

**双端队列**，[官方文档](https://docs.python.org/3/library/collections.html#collections.deque)介绍
> list-like container with fast appends and pops on either end
> 一个类似列表的容器，能够在两端快速增删的容器

```python
import collections

dq=collections.deque()

dq.append(0)
dq.append(0)
print(dq)

dq.appendleft(1)
dq.append(2)
print(dq)

```