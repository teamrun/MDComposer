## Implementation

`live edit`的时候. 貌似最好实现一套`raw -> processed markdown html`的机制, 当然最后导出的时候还是从store中导出raw的内容.

为什么要自己实现`raw -> processed markdown html`呢~?  这样可以更好的保持对`.tc-line`中内容展现的控制. 控制好之后, dom结构应该是这样的: 

    <div class="tc-line heading-2">some header</div>
    <div class="tc-line p">some paragrapha</div>
    <div class="tc-line quote">quote someone's words</div>
    <Ineo />

这样就可以通过对`.tc-line`进行样式扩展(当然怎么实现把class赋给render的node还得去实现), 去展示不同的文本级别. 同时方便后续的操作:

* 点击进入编辑状态
* 上下键跨越Ineo和`.tc-line`
* 等等

而如果直接用现有的markdown直接去makeHtml然后dangerouslySetInnerHtml的话, 就会形成这样的情形: 

    <div class="tc-line"><h2>some header</h2></div>
    <div class="tc-line"><p>some paragrapha</p></div>
    <div class="tc-line"><blockquote><p>quote someone's words</p></blockquote></div>
    <Ineo />

这样就不好控制了... 
 