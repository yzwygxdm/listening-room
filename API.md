# 可选的批改 API

网页默认不连接服务。使用者在设置中填写完整 HTTP/HTTPS URL 后，网页会对该地址发送 JSON POST 请求。部署在 HTTPS 网站时应使用 HTTPS 服务。该地址只存储在浏览器里。

前端没有模型 API key 输入框，不发送厂商的 Authorization 头。模型 key 由独立服务在后台配置。当前仓库不包含该服务。

## 请求

Content-Type: application/json

```json
{
  "topic": "A small writing ritual",
  "expressions": ["start small"],
  "original": "I want to start small with one sentence a day.",
  "expanded": "I will write after breakfast.",
  "followup": "When would you write?"
}
```

## 成功响应

HTTP 200，Content-Type: application/json。返回以下字符串字段：

```json
{
  "grammar": "语法正确。",
  "naturalness": "表达自然。可以补充你为什么选择早餐后写作。",
  "rewrite": "I want to start small by writing one sentence after breakfast each day.",
  "rewriteZh": "我想从小处开始，每天早餐后写一句话。"
}
```

示例反馈只是接口示例，不会被网页当作实际批改结果。非成功 HTTP 状态可返回 `{"error":"面向使用者的错误信息"}`；网页不会保存失败请求的反馈。

## 跨域访问

如果服务和网页的域名不同，服务需要允许网页来源的 CORS，处理 OPTIONS 预检，并允许 POST 与 Content-Type 请求头。当前网页请求不携带跨域登录 cookie。

部署服务时自行配置访问控制及用量限制；本仓库只提供调用入口，不提供公开的免费模型服务。厂商原始接口通常使用不同的认证与消息格式，不能直接作为这个批改地址。
