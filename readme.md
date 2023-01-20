# Mochi 后台

## 图片接口

图片来源于 https://imgapi.cn/wiki.html

json 格式返回数据包含的图片都有宽高, 没有宽高的将被过滤。

```js
{
  // 图片种类, 默认 random
  category: 'random' || 'landscape' || 'cartoon' || 'beauty' || 'cos' || 'bing',
  // 返回的格式,  默认 json
  format: 'json' || 'image', 'zsy',
  // 终端,  默认 pc, cos、bing 种类没有此字段, random 时此字段无效, 会随机分配
  terminal: 'pc' || 'mobile',
  // 图片数量, 默认为 1, 最大值为 20, bing 最大值为 7, 且当 > 1 时, format 不能为 image,
  count: 1,

}
```
