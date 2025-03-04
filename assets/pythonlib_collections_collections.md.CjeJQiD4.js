import{_ as s,c as a,o as n,a5 as i}from"./chunks/framework.1u5io5po.js";const u=JSON.parse('{"title":"collections","description":"","frontmatter":{},"headers":[],"relativePath":"pythonlib/collections/collections.md","filePath":"pythonlib/collections/collections.md","lastUpdated":1725035561000}'),e={name:"pythonlib/collections/collections.md"},l=i(`<h1 id="collections" tabindex="-1">collections <a class="header-anchor" href="#collections" aria-label="Permalink to &quot;collections&quot;">​</a></h1><h2 id="all" tabindex="-1">all <a class="header-anchor" href="#all" aria-label="Permalink to &quot;all&quot;">​</a></h2><p><a href="https://docs.python.org/3/library/collections.html" target="_blank" rel="noreferrer">collections</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&#39;&#39;&#39;This module implements specialized container datatypes providing</span></span>
<span class="line"><span>alternatives to Python&#39;s general purpose built-in containers, dict,</span></span>
<span class="line"><span>list, set, and tuple.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>* namedtuple   factory function for creating tuple subclasses with named fields</span></span>
<span class="line"><span>* deque        list-like container with fast appends and pops on either end</span></span>
<span class="line"><span>* ChainMap     dict-like class for creating a single view of multiple mappings</span></span>
<span class="line"><span>* Counter      dict subclass for counting hashable objects</span></span>
<span class="line"><span>* OrderedDict  dict subclass that remembers the order entries were added</span></span>
<span class="line"><span>* defaultdict  dict subclass that calls a factory function to supply missing values</span></span>
<span class="line"><span>* UserDict     wrapper around dictionary objects for easier dict subclassing</span></span>
<span class="line"><span>* UserList     wrapper around list objects for easier list subclassing</span></span>
<span class="line"><span>* UserString   wrapper around string objects for easier string subclassing</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span></code></pre></div><h2 id="deque" tabindex="-1">deque <a class="header-anchor" href="#deque" aria-label="Permalink to &quot;deque&quot;">​</a></h2><p><strong>双端队列</strong>，<a href="https://docs.python.org/3/library/collections.html#collections.deque" target="_blank" rel="noreferrer">官方文档</a>介绍</p><blockquote><p>list-like container with fast appends and pops on either end 一个类似列表的容器，能够在两端快速增删的容器</p></blockquote><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> collections</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dq</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">collections.deque()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dq.append(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dq.append(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(dq)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dq.appendleft(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dq.append(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(dq)</span></span></code></pre></div>`,8),t=[l];function p(c,o,r,h,d,k){return n(),a("div",null,t)}const E=s(e,[["render",p]]);export{u as __pageData,E as default};
